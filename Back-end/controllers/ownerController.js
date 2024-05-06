const Sequelize = require('sequelize');
const { Owner } = require('../models/modelIndex');
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validateUser , validateUpdatedUser} = require("../middlewares/validationSchema");
const bcrypt = require("bcrypt")
const generateJWT = require("../utils/generateJWT");
const generateVerificationCode = require("../utils/generateVerificationCode");
const { sendVerificationCode, sendResetLink } = require("../utils/sendEmail");
const {uploadToCloud, deleteFromCloud} = require('../utils/cloudinary');


module.exports = {
    register: asyncWrapper(
        async (req, res, next) => {
            let errors = validateUser(req);
            if (errors.length != 0) {
                const error = appError.create(errors, 400, httpStatusCode.ERROR)
                return next(error)
            }
            const duplicates = await Owner.findOne({
                raw: true, where: {
                    [Sequelize.Op.or]: [
                        { username: req.body.username },
                        { email: req.body.email }
                    ],
                    [Sequelize.Op.and]: [
                        { verified: true }
                    ]
                }
            })
            if (duplicates) {
                const error = appError.create("Owner Already Exists", 400, httpStatusCode.ERROR)
                return next(error)
            }
            
            await Owner.destroy({
                where: {
                    [Sequelize.Op.or]: [
                        { username: req.body.username },
                        { email: req.body.email }
                    ],
                    [Sequelize.Op.and]: [
                        { verified: false }
                    ]
                }
            })

            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
            const newOwner = await Owner.create({
                fname: req.body.fname,
                lname: req.body.lname,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                profilePic: req.body.profilePic,
                phone: req.body.phone,
                verificationCode: false
            })
            if (newOwner) {
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Owner is Registered Successfully" });
            } else {
                const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL);
                return next(error);
            }
        }
    ),
    sendVerification: asyncWrapper(
        async (req, res, next) => {
            const owner = await Owner.findOne({
                raw: true, where: {
                    email: req.body.email
                }
            })
            if (owner) {
                if (owner.verified === 0) {
                    const verificationCode = generateVerificationCode();
                    await Owner.update({ verificationCode: verificationCode }, {
                        where: {
                            ownerID: owner.ownerID
                        }
                    })
                    try {
                        await sendVerificationCode(owner.email, verificationCode);
                        return res.status(201).json({ status: httpStatusCode.SUCCESS, message: `Email Sent to ${owner.email} successfully` });
                    } catch (err) {
                        const error = appError.create("Error sending verification code", 500, httpStatusCode.FAIL);
                        return next(error);
                    }
                } else {
                    const error = appError.create("This Email Associated with another account", 400, httpStatusCode.ERROR)
                    return next(error)
                }
            } else {
                const error = appError.create(`Invalid Email ${req.body.email}`, 404, httpStatusCode.ERROR)
                return next(error)
            }
        }
    ),
    verifyEmail: asyncWrapper(
        async (req, res, next) => {
            const owner = await Owner.findOne({
                raw: true, where: {
                    email: req.body.email
                }
            })
            if (owner) {
                if (owner.verificationCode === req.body.verificationCode) {
                    await Owner.update({verified: true}, {
                    where: {
                        ownerID: owner.ownerID
                    }
                    })
                    return res.status(201).json({ status: httpStatusCode.SUCCESS, message: `Email ${req.body.email} Verified Successfully!` })
                }
                const error = appError.create("Invalid verification code", 400, httpStatusCode.ERROR)
                return next(error)
            }
            const error = appError.create(`There Are No Available Owners with Email ${req.body.email}`, 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    login: asyncWrapper(
        async (req, res, next) => {
            const owner = await Owner.findOne({
                raw: true, where: {
                    username: req.body.username
                }
            })
            if (owner) {
                const enteredPassword = req.body.password;
                bcrypt.compare(enteredPassword, owner.password, async (err, result) => {
                    if (result) {
                        if (owner.verified === 0) {
                            const error = appError.create(owner.email, 400, httpStatusCode.UNVERIFIED)
                            return next(error)
                        }
                        delete owner.verificationCode;
                        delete owner.password
                        const token = await generateJWT(owner, process.env.ACCESS_TOKEN_PERIOD)
                        return res.status(200).json({ status: httpStatusCode.SUCCESS, data: { token } })
                    }
                });
                
            } else {
                const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
                return next(error)
            }
            
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            const owners = await Owner.findAll()
            if (owners.length != 0) {
                return res.json({ status: httpStatusCode.SUCCESS, data: owners })
            }
            const error = appError.create("There Are NO Available Owners", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    updatePhoto: asyncWrapper(
        async (req, res, next) => {
            let updatedOwner = await Owner.findOne({
                raw: true, where: {
                    ownerID: req.params.ID
                }
            })
            if (updatedOwner) {
                if(updatedOwner.imgName){
                    await deleteFromCloud(('owners/'+updatedOwner.imgName))
                }
                await uploadToCloud(req, 'owners') 
                await Owner.update(req.body, {
                where: {
                    ownerID: req.params.ID
                }
                })
                
                updatedOwner = await Owner.findOne({
                    raw: true, where: {
                        ownerID: req.params.ID
                    }
                });
                delete updatedOwner.password;
                const token = await generateJWT(updatedOwner, process.env.ACCESS_TOKEN_PERIOD);
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Owner Updated Successfully", data: { token } });
            }
            const error = appError.create("Owner Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    forgotPassword: asyncWrapper(
        async (req, res, next) => {
            const owner = await Owner.findOne({
                raw: true, where: {
                    email: req.body.email
                }
            })
            if (owner) {
                const tokenData = {
                    ownerID: owner.ownerID,
                    email: owner.email,
                    role: owner.role
                }
                try {
                    const token = await generateJWT(tokenData, process.env.RESET_TOKEN_PERIOD);
                    await sendResetLink(owner.email, token);
                    return res.status(201).json({ status: httpStatusCode.SUCCESS, message: `An Email has been Sent to ${owner.email}` });
                } catch (err) {
                    const error = appError.create("Error sending Resetting Email", 500, httpStatusCode.FAIL);
                    return next(error);
                }
            }
            const error = appError.create(`There Are No Available Owners with Email ${owner.email}`, 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    updatePassword: asyncWrapper(
        async (req, res, next) => {
            let updatedOwner = await Owner.findOne({
                raw: true, where: {
                    ownerID: req.params.ID
                }
            })
            if (updatedOwner) {
                if (req.body.reset === true) {
                    const hashedPassword = await bcrypt.hash(req.body.newPassword, Number(process.env.SALT_ROUND))
                    await Owner.update({ password: hashedPassword }, {
                        where: {
                            ownerID: req.params.ID
                        }
                    })
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Password is Updated Successfully!" })
                } else if (req.body.reset === false) {
                    const oldPassword = req.body.oldPassword;
                    bcrypt.compare(oldPassword, updatedOwner.password, async (err, result) => {
                        if (result) {
                            const hashedPassword = await bcrypt.hash(req.body.newPassword, Number(process.env.SALT_ROUND))
                            await Owner.update({ password: hashedPassword }, {
                                where: {
                                    ownerID: req.params.ID
                                }
                            })
                            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Password is Updated Successfully!" });
                        } else {
                            const error = appError.create("Old Password is Incorrect ", 404, httpStatusCode.ERROR);
                            return next(error);
                        }
                    });
                }
            } else {
                const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
                return next(error)
            }
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            let errors = validateUpdatedUser(req);
            if (errors.length != 0) {
                console.log(errors)
                const error = appError.create(errors, 400, httpStatusCode.ERROR)
                return next(error)
            }
            let updatedOwner = await Owner.findOne({
                where: {
                    ownerID: req.params.ID
                }
            })
            if (updatedOwner) {
                await Owner.update(req.body, {
                where: {
                    ownerID: req.params.ID
                }
                })
                updatedOwner = await Owner.findOne({
                    raw: true, where: {
                        ownerID: req.params.ID
                    }
                });
                delete updatedOwner.password;
                const token = await generateJWT(updatedOwner, process.env.ACCESS_TOKEN_PERIOD);
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Owner Updated Successfully", data: { token } })
            }
            const error = appError.create("Owner Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedOwner = await Owner.findOne({
                where: {
                    ownerID: req.params.ID
                }
            });
            if (deletedOwner) {
                await Owner.destroy({
                    where: {
                        ownerID: req.params.ID
                    }
                })
                if (deletedOwner.imgName) {
                    await deleteFromCloud(('owners/'+deletedOwner.imgName))
                }
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Owner Deleted Successfully" })     
            }
            const error = appError.create("Owner Not Found", 404, httpStatusCode.ERROR)
            return next(error);
        }
    )
} 