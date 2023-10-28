
const { Event } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const events = await Event.findAll()
            if (events.length === 0) {
                const error = appError.create("Events not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: events }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const event = await Event.findAll({
                where: {
                    ID: req.params.ID
                }
            })
            if (event.length === 0) {
                const error = appError.create("event not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: event }) 
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const newEvent = await Event.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newEvent });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedEvent = await Event.findAll({
                where: {
                    ID: req.params.ID
                }
            });
            if (updatedEvent.length === 0) {
                const error = appError.create("Event not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Event.update(req.body, {
                where: {
                    ID: req.params.ID
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedEvent = await Event.findAll({
                where: {
                    ID: req.params.ID
                }
            });
            if (deletedEvent.length === 0) {
                const error = appError.create("Event not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Event.destroy({
                where: {
                    ID: req.params.ID
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 