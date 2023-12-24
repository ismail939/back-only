const { Review, Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


module.exports = {
    create: asyncWrapper(
        async (req, res, next) => {
            const newReview = await Review.create(req.body)
            if (newReview) {
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Review is Created Successfully" });
            }
            const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL);
            return next(error);
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            const reviews = await Review.findAll()
            if (reviews.length != 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: reviews });
            }
            const error = appError.create("There are No Available Reviews", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getCw_spaceReviews: asyncWrapper(
        async (req, res, next) => {
            const reviews = await Review.findAll({
                where: {
                    cwSpaceCwID: req.params.cwSpaceID
                }
            }, { raw: true })
            if (reviews.length != 0) {
                for (let i = 0; i < reviews.length; i++) {
                    let client = await Client.findOne({
                        where: {
                            clientID: reviews[i].clientClientID
                        }
                    })
                    reviews[i].name = client.fname + " " + client.lname
                    reviews[i].profilePic = client.profilePic
                    }
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: reviews });
            }
            const error = appError.create("There are No Available Reviews", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const review = await Review.findOne({
                where: {
                    clientClientID: req.params.clientID,
                    cwSpaceCwID: req.params.cwSpaceID
                }
            })
            if (review) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: review })
            }
            const error = appError.create("Review Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedReview = await Review.findOne({
                where: {
                    clientClientID: req.params.clientID,
                    cwSpaceCwID: req.params.cwSpaceID
                }
            });
            if (updatedReview) {
                await Review.update(req.body, {
                where: {
                    clientClientID: req.params.clientID,
                    cwSpaceCwID: req.params.cwSpaceID
                }
                });
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Review Updated Successfully" });
            }
            const error = appError.create("Review Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedReview = await Review.findOne({
                where: {
                    clientClientID: req.params.clientID,
                    cwSpaceCwID: req.params.cwSpaceID
                }
            });
            if (deletedReview) {
                await Review.destroy({
                where: {
                    clientClientID: req.params.clientID,
                    cwSpaceCwID: req.params.cwSpaceID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Review Deleted Successfully" });
            }
            const error = appError.create("Review Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
} 
