const Sequelize = require('sequelize');
const { Owner } = require('../models/modelIndex');
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validateUser , validateUpdatedUser} = require("../middlewares/validationSchema");
const bcrypt = require("bcrypt")
const generateJWT = require("../utils/generateJWT");
const fs = require('fs')

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
                    ]
                }
            })
            if (duplicates) {
                const error = appError.create("Owner Already Exists", 400, httpStatusCode.ERROR)
                return next(error)
            }
            
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
            const newOwner = await Owner.create({
                fname: req.body.fname,
                lname: req.body.lname,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                profilePic: req.body.profilePic,
                phone: req.body.phone
            })
            if (newOwner) {
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Owner is Created Successfully" })
            }
            const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL)
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
                        delete owner.password
                        const token = await generateJWT(owner)
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
            if(req.body.imageName==undefined){
                const error = appError.create("There is NO Images Provided", 400, httpStatusCode.ERROR);
                return next(error);
            }
            req.body.profilePic = req.body.imageName;
            delete req.body.imageName;
            const updatedOwner = await Owner.findOne({
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
            if (updatedOwner.profilePic) {
                const filePath = `./public/images/owners/${updatedOwner.profilePic}`;
                fs.unlink(filePath, ()=>{})
            }
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Owner Updated Successfully" })
            }
            const error = appError.create("Owner Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    updatePassword: asyncWrapper(
        async (req, res, next) => {
            const owner = await Owner.findOne({
                raw: true, where: {
                    ownerID: req.params.ID
                }
            })
            if (owner) {
                const oldPassword = req.body.oldPassword; 
                bcrypt.compare(oldPassword, owner.password, async (err, result) => {
                    if (result) {
                        const hashedPassword = await bcrypt.hash(req.body.newPassword, Number(process.env.SALT_ROUND))
                        await Owner.update(
                            { password: hashedPassword }, {
                            where: {
                                ownerID: req.params.ID
                            }
                        }
                        )
                        return res.status(200).json({status:httpStatusCode.SUCCESS, message: "Password is updated successfully!"})
                    }
                    else {
                        const error = appError.create("Old password is incorrect ", 404, httpStatusCode.ERROR);
                        return next(error);
                    }
                });

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
            const updatedOwner = await Owner.findOne({
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
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Owner Updated Successfully" })
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
                if (deletedOwner.profilePic) {
                    const filePath = `./public/images/owners/${deletedOwner.profilePic}`;
                    fs.unlink(filePath, ()=>{})
                }
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Owner Deleted Successfully" })     
            }
            const error = appError.create("Owner Not Found", 404, httpStatusCode.ERROR)
            return next(error);
        }
    )
} 