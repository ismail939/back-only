const Sequelize = require('sequelize');
const { Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validateUser, validateUpdatedUser } = require("../middlewares/validationSchema");
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT')
const generateVerificationCode = require("../utils/generateVerificationCode");
const { sendVerificationCode } = require("../utils/sendEmail");
const fs = require('fs')

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
            const verificationCode = generateVerificationCode();
            const newClient = (await Client.create({
                fname: req.body.fname,
                lname: req.body.lname,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                profilePic: req.body.profilePic,
                phone: req.body.phone,
                verificationCode: verificationCode
            }))
            if (newClient) {
                try {
                    await sendVerificationCode(req.body.email, verificationCode);
                    return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Client is Registered Successfully" });
                } catch (err) {
                    const error = appError.create("Error sending verification code", 500, httpStatusCode.FAIL);
                    return next(error);
                }
            } else {
                const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL);
                return next(error);
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
                    await Client.update({verified: true}, {
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
                        if (client.verified === false) {
                            const error = appError.create("Not Verified", 400, httpStatusCode.ERROR)
                            return next(error)
                        }
                        delete client.verificationCode;
                        delete client.password
                        const token = await generateJWT(client)
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
            if (req.body.imageName == undefined) {
                const error = appError.create("There is NO Images Provided", 400, httpStatusCode.ERROR);
                return next(error);
            }
            req.body.profilePic = req.body.imageName;
            delete req.body.imageName;
            let updatedClient = await Client.findOne({
                raw: true, where: {
                    clientID: req.params.ID
                }
            })
            if (updatedClient) {
                await Client.update(req.body, {
                    where: {
                        clientID: req.params.ID
                    }
                })
                if (updatedClient.profilePic) {
                    const filePath = `./public/images/clients/${updatedClient.profilePic}`;
                    fs.unlink(filePath, () => { })
                }
                updatedClient = await Client.findOne({
                    raw: true, where: {
                        clientID: req.params.ID
                    }
                });
                delete updatedClient.password;
                const token = await generateJWT(updatedClient);
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Updated Successfully", data: { token } });
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR);
            return next(error);
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
                const oldPassword = req.body.oldPassword; 
                bcrypt.compare(oldPassword, updatedClient.password, async (err, result) => {
                    if (result) {
                        const hashedPassword = await bcrypt.hash(req.body.newPassword, Number(process.env.SALT_ROUND))
                        await Client.update(
                            { password: hashedPassword }, {
                            where: {
                                clientID: req.params.ID
                            }
                        }
                        )
                        return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Password is Updated Successfully!" });
                    }
                    else {
                        const error = appError.create("Old Password is Incorrect ", 404, httpStatusCode.ERROR);
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
                const token = await generateJWT(updatedClient);
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
                if (deletedClient.profilePic) {
                    const filePath = `./public/images/clients/${deletedClient.profilePic}`;
                    fs.unlink(filePath, () => { })
                }
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Deleted Successfully" });
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
}