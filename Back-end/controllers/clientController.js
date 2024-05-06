const Sequelize = require('sequelize');
const { Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validateUser, validateUpdatedUser } = require("../middlewares/validationSchema");
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT')
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
            const duplicates = await Client.findOne({
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
                const error = appError.create("Client Already Exists", 400, httpStatusCode.ERROR)
                return next(error)
            }

            await Client.destroy({
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
            const newClient = (await Client.create({
                fname: req.body.fname,
                lname: req.body.lname,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                phone: req.body.phone,
                verificationCode: false
            }))
            if (newClient) {
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Client is Registered Successfully" });
            } else {
                const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL);
                return next(error);
            }
        }
    ),
    sendVerification: asyncWrapper(
        async (req, res, next) => {
            const client = await Client.findOne({
                raw: true, where: {
                    email: req.body.email
                }
            })
            if (client) {
                if (client.verified === 0) {
                    const verificationCode = generateVerificationCode();
                    await Client.update({ verificationCode: verificationCode }, {
                        where: {
                            clientID: client.clientID
                        }
                    })
                    try {
                        await sendVerificationCode(client.email, verificationCode);
                        return res.status(201).json({ status: httpStatusCode.SUCCESS, message: `Email Sent to ${client.email} successfully` });
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
            const client = await Client.findOne({
                raw: true, where: {
                    email: req.body.email
                }
            })
            if (client) {
                if (client.verificationCode === req.body.verificationCode) {
                    await Client.update(
                        {
                            verified: true,
                            verificationCode: null
                        },{
                            where: {
                                clientID: client.clientID
                            }   
                        })
                    return res.status(201).json({ status: httpStatusCode.SUCCESS, message: `Email ${req.body.email} Verified Successfully!` })
                }
                const error = appError.create("Invalid verification code", 400, httpStatusCode.ERROR)
                return next(error)
            }
            const error = appError.create(`There Are No Available Clients with Email ${req.body.email}`, 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    login: asyncWrapper(
        async (req, res, next) => {
            const client = await Client.findOne({
                raw: true, where: {
                    username: req.body.username
                }
            })
            if (client) {
                const enteredPassword = req.body.password;
                bcrypt.compare(enteredPassword, client.password, async (err, result) => {
                    if (result) {
                        if (client.verified === 0) {
                            const error = appError.create(client.email, 400, httpStatusCode.UNVERIFIED)
                            return next(error)
                        }
                        delete client.verificationCode;
                        delete client.password
                        const token = await generateJWT(client, process.env.ACCESS_TOKEN_PERIOD)
                        return res.status(200).json({ status: httpStatusCode.SUCCESS, data: { token } })
                    }
                    const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
                    return next(error)
                });

            } else {
                const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
                return next(error)
            }

        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            const clients = await Client.findAll()
            if (clients.length != 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: clients })
            }
            const error = appError.create("There Are No Available Clients", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    updatePhoto: asyncWrapper(
        async (req, res, next) => {
            let updatedClient = await Client.findOne({
                raw: true, where: {
                    clientID: req.params.ID
                }
            })
            if (updatedClient) {
                if(updatedClient.imgName){
                    await deleteFromCloud(('clients/'+updatedClient.imgName))
                }
                await uploadToCloud(req, 'clients') 
                await Client.update(req.body, {
                    where: {
                        clientID: req.params.ID
                    }
                })
               
                updatedClient = await Client.findOne({
                    raw: true, where: {
                        clientID: req.params.ID
                    }
                });
                delete updatedClient.password;
                const token = await generateJWT(updatedClient, process.env.ACCESS_TOKEN_PERIOD);
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Updated Successfully", data: { token } });
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    forgotPassword: asyncWrapper(
        async (req, res, next) => {
            const client = await Client.findOne({
                raw: true, where: {
                    email: req.body.email
                }
            })
            if (client) {
                const tokenData = {
                    clientID: client.clientID,
                    email: client.email,
                    role: client.role
                }
                try {
                    const token = await generateJWT(tokenData, process.env.RESET_TOKEN_PERIOD)
                    await sendResetLink(client.email, token);
                    return res.status(201).json({ status: httpStatusCode.SUCCESS, message: `An Email has been Sent to ${client.email}` });
                } catch (err) {
                    console.log(err)
                    const error = appError.create("Error sending Resetting Email", 500, httpStatusCode.FAIL);
                    return next(error);
                }
            }
            const error = appError.create(`There Are No Available Clients with Email ${req.body.email}`, 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    updatePassword: asyncWrapper(
        async (req, res, next) => {
            let updatedClient = await Client.findOne({
                raw: true, where: {
                    clientID: req.params.ID
                }
            })
            if (updatedClient) {
                if (req.body.reset === true) {
                    const hashedPassword = await bcrypt.hash(req.body.newPassword, Number(process.env.SALT_ROUND))
                    await Client.update({ password: hashedPassword }, {
                        where: {
                            clientID: req.params.ID
                        }
                    })
                    return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Password is Updated Successfully!" })
                } else if (req.body.reset === false) {
                    const oldPassword = req.body.oldPassword;
                    bcrypt.compare(oldPassword, updatedClient.password, async (err, result) => {
                        if (result) {
                            const hashedPassword = await bcrypt.hash(req.body.newPassword, Number(process.env.SALT_ROUND))
                            await Client.update({ password: hashedPassword }, {
                                where: {
                                    clientID: req.params.ID
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
                const error = appError.create(errors, 400, httpStatusCode.ERROR)
                return next(error)
            }
            let updatedClient = await Client.findOne({
                where: {
                    clientID: req.params.ID
                }
            });
            if (updatedClient) {
                await Client.update(req.body, {
                    raw: true, where: {
                        clientID: req.params.ID
                    }
                })
                updatedClient = await Client.findOne({
                    raw: true, where: {
                        clientID: req.params.ID
                    }
                });
                delete updatedClient.password;
                const token = await generateJWT(updatedClient, process.env.ACCESS_TOKEN_PERIOD);
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Updated Successfully", data: { token } });
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedClient = await Client.findOne({
                where: {
                    clientID: req.params.ID
                }
            });
            if (deletedClient) {
                await Client.destroy({
                    where: {
                        clientID: req.params.ID
                    }
                })
                if (deletedClient.imgName) {
                    await deleteFromCloud(('clients/'+deletedClient.imgName))
                }
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Deleted Successfully" });
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
}