const { Owner } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const owners = await Owner.findAll()
            if (owners.length === 0) {
                const error = appError.create("Owners not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: owners }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const owner = await Owner.findAll({
                where: {
                    username: req.params.username
                }
            })
            if (owner.length === 0) {
                const error = appError.create("Owner not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: owner }) 
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const newOwner = await Owner.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newOwner });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedOwner = await Owner.findAll({
                where: {
                    username: req.params.username
                }
            });
            if (updatedOwner.length === 0) {
                const error = appError.create("Owner not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Owner.update(req.body, {
                where: {
                    username: req.params.username
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedOwner = await Owner.findAll({
                where: {
                    username: req.params.username
                }
            });
            if (deletedOwner.length === 0) {
                const error = appError.create("Owner not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Owner.destroy({
                where: {
                    username: req.params.username
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 