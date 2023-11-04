const { Cw_spacePhoto } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const cw_spacePhotos = await Cw_spacePhoto.findAll()
            if (cw_spacePhotos.length === 0) {
                const error = appError.create("Cw_spacePhotos not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_spacePhotos }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const cw_spacePhoto = await Cw_spacePhoto.findAll({
                where: {
                    id: req.params.id
                }
            })
            if (cw_spacePhoto.length === 0) {
                const error = appError.create("Cw_spacePhoto not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_spacePhoto }) 
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const newCw_spacePhoto = await Cw_spacePhoto.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newCw_spacePhoto });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedCw_spacePhoto = await Cw_spacePhoto.findAll({
                where: {
                    id: req.params.id
                }
            });
            if (updatedCw_spacePhoto.length === 0) {
                const error = appError.create("Cw_spacePhoto not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Cw_spacePhoto.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedCw_spacePhoto = await Cw_spacePhoto.findAll({
                where: {
                    id: req.params.id
                }
            });
            if (deletedCw_spacePhoto.length === 0) {
                const error = appError.create("Cw_spacePhoto not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Cw_spacePhoto.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 