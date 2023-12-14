const { Offer, Cw_space } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const fs = require('fs')

module.exports = {
    getAll: asyncWrapper(
        async (req, res, next) => {
            const offers = await Offer.findAll({ raw: true })
            for (let i = 0; i < offers.length; i++) {
                let cw_space = await Cw_space.findOne({ raw: true }, {
                    where: {
                        cwID: offers[i].cwSpaceCwID
                    }
                })
                offers[i].cwSpaceName = cw_space.name
            }
            if (offers.length != 0) {
                return res.json({ status: httpStatusCode.SUCCESS, data: offers })
            }
            const error = appError.create("There Are No Available Offers", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getHome: asyncWrapper(
        async (req, res, next) => {
            const offerHome = await Offer.findAll({
                raw: true,
                where: {
                    home: "home"
                }
            })
            if (offerHome.length != 0) {
                return res.json({ status: httpStatusCode.SUCCESS, data: offerHome })
            }
            const error = appError.create("There Are No Available Offers", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const offer = await Offer.findOne({
                where: {
                    offerID: req.params.offerID
                }
            })
            if (offer) {
                return res.json({ status: httpStatusCode.SUCCESS, data: offer })
            }
            const error = appError.create("Offer Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            if (req.body.imageName == undefined || req.body.img == '') {
                const error = appError.create("img is null", 400, httpStatusCode.ERROR);
                return next(error);
            }

            req.body.img = req.body.imageName
            delete req.body.imageName
            const newOffer = await Offer.create(req.body)
            if (newOffer) {
                return res.json({ status: httpStatusCode.SUCCESS, message: "Offer is Created Successfully" })
            }
            const error = appError.create("Unexpected Error, Try Again Later", 400, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedOffer = await Offer.findOne({
                where: {
                    offerID: req.params.offerID
                }
            });
            if (updatedOffer) {
                if(req.body.imageName){
                    req.body.img = req.body.imageName
                    delete req.body.imageName
                }
                await Offer.update(req.body, {
                    where: {
                        offerID: req.params.offerID
                    }
                })
                if (req.body.img) {
                    const filePath = `./public/images/offers/${updatedOffer.img}`
                    fs.unlink(filePath, () => { })
                }
                return res.json({ status: httpStatusCode.SUCCESS, message: "Offer Updated Successfully" });
            }
            const error = appError.create("Offer Not Found", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedOffer = await Offer.findOne({
                where: {
                    offerID: req.params.offerID
                }
            })
            if (deletedOffer) {
                await Offer.destroy({
                    where: {
                        offerID: req.params.offerID
                    }
                })
                const filePath = `./public/images/offers/${deletedOffer.img}`
                fs.unlink(filePath, () => { })
                return res.json({ status: httpStatusCode.SUCCESS, message: "Offer Deleted Successfully" });
            }
            const error = appError.create("Offer Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
} 