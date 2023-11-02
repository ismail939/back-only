const { Cw_space } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const cw_spaces = await Cw_space.findAll()
            if (cw_spaces.length === 0) {
                const error = appError.create("Cw_spaces not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_spaces }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const cw_space = await Cw_space.findAll({
                where: {
                    ID: req.params.ID
                }
            })
            if (cw_space.length === 0) {
                const error = appError.create("cw_space not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_space }) 
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const newCw_space = await Cw_space.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newCw_space });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedCw_space = await Cw_space.findAll({
                where: {
                    ID: req.params.ID
                }
            });
            if (updatedCw_space.length === 0) {
                const error = appError.create("cw_space not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Cw_space.update(req.body, {
                where: {
                    ID: req.params.ID
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedCw_space = await Cw_space.findAll({
                where: {
                    ID: req.params.ID
                }
            });
            if (deletedCw_space.length === 0) {
                const error = appError.create("cw_space not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Cw_space.destroy({
                where: {
                    ID: req.params.ID
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 