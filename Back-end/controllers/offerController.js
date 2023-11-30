const { Offer } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");

module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const offers = await Offer.findAll({raw: true})
            if (offers.length === 0) {
                const error = appError.create("Offers not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: offers }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const offer = await Offer.findAll({
                where: {
                    offerID: req.params.offerID
                }
            })
            if (offer.length === 0) {
                const error = appError.create("Offer not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: offer }) 
        }
    ), 
    create: asyncWrapper(
        async (req, res, next) => {
            console.log("ggggg", req.body)
            req.body.cwSpaceCwID = 1
            req.body.img = req.body.imageName 
            delete req.body.imageName
            const newOffer = await Offer.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newOffer });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedOffer = await Offer.findAll({
                where: {
                    offerID: req.params.offerID
                }
            });
            if (updatedOffer.length === 0) {
                const error = appError.create("Offer not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Offer.update(req.body, {
                where: {
                    offerID: req.params.offerID
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedOffer = await Offer.findAll({
                where: {
                    offerID: req.params.offerID
                }
            });
            if (deletedOffer.length === 0) {
                const error = appError.create("Offer not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Offer.destroy({
                where: {
                    offerID: req.params.offerID
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 