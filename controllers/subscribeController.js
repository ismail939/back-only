
const { Subscribe } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const subscribes = await Subscribe.findAll()
            if (subscribes.length === 0) {
                const error = appError.create("Subscribes not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: subscribes }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const subscribe = await Subscribe.findAll({
                where: {
                    clientID: req.params.clientID,
                    cwSpaceID: req.params.cwSpaceID
                }
            })
            if (subscribe.length === 0) {
                const error = appError.create("Subscribe not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: subscribe }) 
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const newSubscribe = await Subscribe.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newSubscribe });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedSubscribe = await Subscribe.findAll({
                where: {
                    clientID: req.params.clientID,
                    cwSpaceID: req.params.cwSpaceID
                }
            });
            if (updatedSubscribe.length === 0) {
                const error = appError.create("Subscribe not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Subscribe.update(req.body, {
                where: {
                    clientID: req.params.clientID,
                    cwSpaceID: req.params.cwSpaceID
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedSubscribe = await Subscribe.findAll({
                where: {
                    clientID: req.params.clientID,
                    cwSpaceID: req.params.cwSpaceID
                }
            });
            if (deletedSubscribe.length === 0) {
                const error = appError.create("Subscribe not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Subscribe.destroy({
                where: {
                    clientID: req.params.clientID,
                    cwSpaceID: req.params.cwSpaceID
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 