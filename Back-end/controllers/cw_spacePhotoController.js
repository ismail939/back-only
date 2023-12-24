const { Cw_spacePhoto } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const fs = require('fs')

module.exports = {
    create: asyncWrapper(
        async (req, res, next) => {
            if (req.body.photos == undefined) {
                const error = appError.create("There are No Provided Photos", 404, httpStatusCode.ERROR);
                return next(error);
            } else {
                for (let i = 0; i < req.body.photos.length; i++) {
                await Cw_spacePhoto.create({
                    photo: req.body.photos[i],
                    cwSpaceCwID: req.params.cwID
                })
            }
            return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Photos are Added Successfully" });
            }
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            const cw_spacePhotos = await Cw_spacePhoto.findAll({
                where: {
                    cwSpaceCwID: req.params.cwID
                }
            })
            if (cw_spacePhotos.length != 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: cw_spacePhotos });
            }
            const error = appError.create("There are No Available Photos", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const cw_spacePhoto = await Cw_spacePhoto.findOne({
                where: {
                    cwSpaceCwID: req.params.cwID,
                    id: req.params.ID
                }
            })
            if (cw_spacePhoto) {
                return res.json({ status: httpStatusCode.SUCCESS, data: cw_spacePhoto })
            }
            const error = appError.create("Photo Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedCw_spacePhoto = await Cw_spacePhoto.findOne({
                where: {
                    cwSpaceCwID: req.params.cwID,
                    id: req.params.ID
                }
            });
            if (deletedCw_spacePhoto) {
                await Cw_spacePhoto.destroy({
                where: {
                    id: req.params.ID
                }
            })
            let filePath = `./public/images/cw_spaces/${deletedCw_spacePhoto.photo}`;
            fs.unlink(filePath, () => { })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Photo Deleted Successfully" });
            }
            const error = appError.create("Photo Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
} 