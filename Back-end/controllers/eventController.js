const { Event, Cw_space, EventPhoto } = require("../models/modelIndex");
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const {uploadToCloud, deleteFromCloud} = require('../utils/cloudinary');
const cache = require('../utils/caching')
const { validationResult } = require("express-validator");

module.exports = {
    create: asyncWrapper(
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = appError.create(errors.array(), 400, httpStatusCode.ERROR)
                return next(error);
            }
            await uploadToCloud(req, 'events')
            const newEvent = await Event.create(req.body)
            if (newEvent) {
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Event is Created Successfully" })
            }
            const error = appError.create("Unexpected Error, Try Again Later", 400, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            let events = await cache.getJsonList('events')
            if(events.length!=0){
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: events });
            }
            events = await Event.findAll({ raw: true })
            if (events.length != 0) {
                for (let i = 0; i < events.length; i++) {
                    let cw_space = await Cw_space.findOne({
                        raw: true,
                        where: {
                            cwID: events[i].cwSpaceCwID
                        }
                    })
                    events[i].cwSpaceName = cw_space.name
                }
                for (let index = 0; index < events.length; index++) {
                    await cache.pushJsonToList('events', events[index])
                }
                await cache.setKeyTTL('events', 180)
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: events })
            }
            const error = appError.create("There are No Available Events", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getHome: asyncWrapper(
        async (req, res, next) => {
            let eventHome = await cache.getJsonList('eventHome')
            if(eventHome.length!=0){
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: eventHome })
            }
            eventHome = await Event.findAll({
                raw: true,
                where: {
                    home: "home"
                }
            })
            if (eventHome.length != 0) {
                for (let index = 0; index < eventHome.length; index++) {
                    await cache.pushJsonToList('eventHome', eventHome[index])                    
                }
                await cache.setKeyTTL('eventHome', 600)
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: eventHome })
            }
            const error = appError.create("There are No Available Events", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const key = 'event:'+req.params.eventID
            let event = await cache.getJsonObject(key)
            if(event){
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: event })
            }
            event = await Event.findOne({
                where: {
                    eventID: req.params.eventID
                }
            })
            if (event) {
                await cache.setJsonObject(key, event)
                await cache.setKeyTTL(key, 600)
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: event })
            }
            const error = appError.create("Event Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getCwSpaceEvents: asyncWrapper(
        async (req, res, next) => {
            const events = await Event.findAll({
                where: {
                    cwSpaceCwID: req.params.cwID
                }
            })
            if (events.length != 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: events });
            }
            const error = appError.create("There are No Available Events for This Co-working Space", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = appError.create(errors.array(), 400, httpStatusCode.ERROR)
                return next(error);
            }
            const updatedEvent = await Event.findOne({
                where: {
                    eventID: req.params.eventID
                }
            });
            if (updatedEvent) {
                let imgAdded = false
                if (req.file) { // there is a file
                    await deleteFromCloud(('events/'+updatedEvent.imgName))
                    await uploadToCloud(req, 'events')
                    imgAdded = true
                }
                if(!imgAdded){
                    delete req.body.img
                    delete req.body.imgName
                }
                await Event.update(req.body, {
                    where: {
                        eventID: req.params.eventID
                    }
                })
                return res.json({ status: httpStatusCode.SUCCESS, message: "Event Updated Successfully" });
            }
            const error = appError.create("Event Not Found", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedEvent = await Event.findOne({
                where: {
                    eventID: req.params.eventID
                }
            });
            if (deletedEvent) {
                await deleteFromCloud('events/'+deletedEvent.imgName)
                await Event.destroy({
                    where: {
                        eventID: req.params.eventID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Event Deleted Successfully" });
            }
            const error = appError.create("Event Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
} 