const { Cw_space, Favourite, Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validateFavourite } = require('../middlewares/validationSchema');
const sequelize = require('sequelize')

module.exports = {
    get: asyncWrapper(
        async (req, res, next) => {
            const favourites = await Favourite.findAll({
                where: {
                    clientClientID: req.params.clientID
                }, raw: true
            })
            if (favourites.length === 0) {
                const error = appError.create("No favourites found for this client", 404, httpStatusCode.ERROR);
                return next(error);
            } 
            let favIDs = [] 
            for (let index = 0; index < favourites.length; index++) {
                favIDs.push(favourites[index].cwSpaceCwID)
            }
            const cw_spaces = await Cw_space.findAll({
                where: {
                    cwID: { [sequelize.Op.in]: favIDs }
                }
                , raw: true
            })
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_spaces });
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const errors = validateFavourite(req)
            if (errors.length != 0) {
                const error = appError.create(errors, 400, httpStatusCode.ERROR)
                return next(error)
            }
            const favourite = await Favourite.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: favourite })
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const favourite = await Favourite.findOne({
                where: {
                    clientClientID: req.body.clientClientID,
                    cwSpaceCwID: req.body.cwSpaceCwID
                }
            })
            if (favourite) {
                await Favourite.destroy({
                    where: {
                        clientClientID: req.body.clientClientID,
                        cwSpaceCwID: req.body.cwSpaceCwID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
            }
            const error = appError.create("Favourite not found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
}