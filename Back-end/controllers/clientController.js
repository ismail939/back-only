const { Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


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
            const client = await Client.findAll({
                where: {
                    username: req.params.username
                }
            })
            if (client.length === 0) {
                const error = appError.create("Client not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: client }) 
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const newClient = await Client.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newClient });
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