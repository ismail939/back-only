const { Offer, Cw_space } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const fs = require('fs')
const {uploadToCloud} = require('../utils/cloudinary')
module.exports = {
    create: asyncWrapper(
        async (req, res, next) => {
            await uploadToCloud(req, 'offers')
            const newOffer = await Offer.create(req.body)
            if (newOffer) {
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Offer is Created Successfully" })
            }
            const error = appError.create("Unexpected Error, Try Again Later", 400, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            const offers = await Offer.findAll({ raw: true })
            if (offers.length != 0) {
                for (let i = 0; i < offers.length; i++) {
                let cw_space = await Cw_space.findOne({ raw: true }, {
                    where: {
                        cwID: offers[i].cwSpaceCwID
                    }
                })
                offers[i].cwSpaceName = cw_space.name
            }
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: offers })
            }
            const error = appError.create("There are No Available Offers", 404, httpStatusCode.ERROR);
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
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: offerHome })
            }
            const error = appError.create("There are No Available Offers", 404, httpStatusCode.ERROR);
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
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: offer })
            }
            const error = appError.create("Offer Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getCwSpaceOffers: asyncWrapper(
        async (req, res, next) => {
            const offers = await Offer.findAll({
                where: {
                    cwSpaceCwID: req.params.cwID
                }
            })
            if (offers.length != 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: offers });
            }
            const error = appError.create("There are No Available Offers for This Co-working Space", 404, httpStatusCode.ERROR);
            return next(error);
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
                let deleteOld = false
                if (req.body.imageName) { // there is a file
                    req.body.img = req.body.imageName
                    delete req.body.imageName
                    deleteOld = true
                } else if (req.body.img == '') { // the photo to be removed
                    deleteOld = true
                    req.body.img = null
                }
                await Offer.update(req.body, {
                    where: {
                        offerID: req.params.offerID
                    }
                })
                if (deleteOld&&updatedOffer.img) {
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
                if (deletedOffer.img) {
                    const filePath = `./public/images/offers/${deletedOffer.img}`
                    fs.unlink(filePath, () => { })
                }
                return res.json({ status: httpStatusCode.SUCCESS, message: "Offer Deleted Successfully" });
            }
            const error = appError.create("Offer Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
} 