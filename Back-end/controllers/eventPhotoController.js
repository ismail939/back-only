const { EventPhoto } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { uploadToCloud, deleteFromCloud } = require('../utils/cloudinary');


module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const event_photos = await EventPhoto.findAll()
            if (event_photos.length === 0) {
                const error = appError.create("Event Photos not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: event_photos }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const event_photo = await EventPhoto.findAll({
                where: {
                    id: req.params.id,
                    eventID: req.params.eventID
                }
            })
            if (review.length === 0) {
                const error = appError.create("Event Photo not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: event_photo }) 
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            console.log(req.body)
            console.log(req.file)
            console.log(req.files[0])
            await uploadToCloud(req, 'events')
            for (let i = 0; i < req.body.photos.length; i++) {
                await EventPhoto.create({
                    img: req.body.photos[i].img,
                    imgName: req.body.photos[i].imgName,
                    cwSpaceCwID: req.body.cwSpaceCwID
                })
        }
            return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Photos are Added Successfully" });
        }
    ),
    // update: asyncWrapper(
    //     async (req, res, next) => {
    //         const updatedEvent_photo = await EventPhoto.findAll({
    //             where: {
    //                 id: req.params.id,
    //                 eventID: req.params.eventID
    //             }
    //         });
    //         if (updatedEvent_photo.length === 0) {
    //             const error = appError.create("Event photos not found", 404, httpStatusCode.ERROR);
    //             return next(error);
    //         }
    //         await EventPhoto.update(req.body, {
    //             where: {
    //                 id: req.params.id,
    //                 eventID: req.params.eventID
    //             }
    //         });
    //         return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
    //     }
    // ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedEventPhoto = await EventPhoto.findOne({
                where: {
                    id: req.params.id,
                    eventID: req.params.eventID
                }
            });
            if (deletedEventPhoto) {
                const error = appError.create("Event Photo not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await EventPhoto.destroy({
                where: {
                    id: req.params.id,
                    eventID: req.params.eventID
                }
            })
            await deleteFromCloud('events/'+deletedEventPhoto.imgName)
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 