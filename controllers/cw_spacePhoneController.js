const { Cw_spacePhone } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const cw_spacePhones = await Cw_spacePhone.findAll()
            if (cw_spacePhones.length === 0) {
                const error = appError.create("Cw_spacePhones not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_spacePhones }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const cw_spacePhone = await Cw_spacePhone.findAll({
                where: {
                    id: req.params.id
                }
            })
            if (cw_spacePhone.length === 0) {
                const error = appError.create("Cw_spacePhone not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_spacePhone }) 
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const newCw_spacePhone = await Cw_spacePhone.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newCw_spacePhone });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedCw_spacePhone = await Cw_spacePhone.findAll({
                where: {
                    id: req.params.id
                }
            });
            if (updatedCw_spacePhone.length === 0) {
                const error = appError.create("Cw_spacePhone not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Cw_spacePhone.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedCw_spacePhone = await Cw_spacePhone.findAll({
                where: {
                    id: req.params.id
                }
            });
            if (deletedCw_spacePhone.length === 0) {
                const error = appError.create("Cw_spacePhone not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Cw_spacePhone.destroy({
                where: {
                    id: req.params.id
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 