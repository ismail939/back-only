const Sequelize = require('sequelize');
const { Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validateUser , validateUpdatedUser} = require("../middlewares/validationSchema");
const bcrypt = require('bcrypt')
const generateJWT = require('../utils/generateJWT')

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
                    ]
                }
            })
            if (duplicates) {
                const error = appError.create("Client Already Exists", 400, httpStatusCode.ERROR)
                return next(error)
            }
            
            const password = req.body.password;
            const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND))
            const newClient = (await Client.create({
                fname: req.body.fname,
                lname: req.body.lname,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                profilePic: req.body.profilePic,
                phone: req.body.phone
            }))
            if (newClient) {
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Client is Created Successfully" })
            }
            const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL)
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
                        delete client.password
                        const token = await generateJWT(client)
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
            const updatedClient = await Client.findOne({
                where: {
                    clientID: req.params.ID
                }
            })
            if (updatedClient) {
                await Client.update(req.body, {
                    where: {
                        clientID: req.params.ID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Updated Successfully" })
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            let errors = validateUpdatedUser(req);
            console.log(errors)
            if (errors.length != 0) {
                console.log(errors)
                const error = appError.create(errors, 400, httpStatusCode.ERROR)
                return next(error)
            }
            const updatedClient = await Client.findOne({
                where: {
                    clientID: req.params.ID
                }
            });
            if (updatedClient) {
                await Client.update(req.body, {
                    where: {
                        clientID: req.params.ID
                    }
                });
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Updated Successfully" });
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
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Client Deleted Successfully" });
            }
            const error = appError.create("Client Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
}