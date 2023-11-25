const { Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validationResult } = require("express-validator");


module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const clients = await Client.findAll()
            if (clients.length === 0) {
                const error = appError.create("Clients not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: clients }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const client = await Client.findOne({
                raw: true, where: {
                    username: req.body.data.username,
                    password: req.body.data.password
                }
            })
            if (client) {
                return res.json({ status: httpStatusCode.SUCCESS, data: client })
            }
            return res.status(404).json({ status: httpStatusCode.ERROR, message: "Username or password are incorrect"})

        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                errors = errors.array()
                let errorsList = []
                for (let i = 0; i < errors.length; i++) {
                    errorsList.push(errors[i].msg)
                }
                return res.status(400).json({ status: httpStatusCode.ERROR, errors: errorsList });
            }
            const client = await Client.create(req.body.data)
            if(client){
                return res.json({ status: httpStatusCode.SUCCESS, message: "Client is created successfully" })
            }
            return res.json({ status: httpStatusCode.ERROR , message: "There is something wrong with the inputs"})
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedClient = await Client.findAll({
                where: {
                    username: req.params.username
                }
            });
            if (updatedClient.length === 0) {
                const error = appError.create("Client not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Client.update(req.body, {
                where: {
                    username: req.params.username
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedClient = await Client.findAll({
                where: {
                    username: req.params.username
                }
            });
            if (deletedClient.length === 0) {
                const error = appError.create("Client not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Client.destroy({
                where: {
                    username: req.params.username
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
}