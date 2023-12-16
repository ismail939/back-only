const { Review } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const reviews = await Review.findAll()
            if (reviews.length === 0) {
                const error = appError.create("Reviews not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: reviews }); 
        }
    ),
    getCw_spaceReviews: asyncWrapper(
        async (req, res, next) => {
            const reviews = await Review.findAll({raw: true}, {
                where: {
                    cwSpaceCwID: req.params.cwSpaceID
                }
            })
            if (reviews.length === 0) {
                const error = appError.create("Reviews not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: reviews }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const review = await Review.findAll({
                where: {
                    clientID: req.params.clientID,
                    cwSpaceID: req.params.cwSpaceID
                }
            })
            if (review.length === 0) {
                const error = appError.create("Review not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: review }) 
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const newReview = await Review.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newReview });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedReview = await Review.findAll({
                where: {
                    clientID: req.params.clientID,
                    cwSpaceID: req.params.cwSpaceID
                }
            });
            if (updatedReview.length === 0) {
                const error = appError.create("Review not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Review.update(req.body, {
                where: {
                    clientID: req.params.clientID,
                    cwSpaceID: req.params.cwSpaceID
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedReview = await Review.findAll({
                where: {
                    clientID: req.params.clientID,
                    cwSpaceID: req.params.cwSpaceID
                }
            });
            if (deletedReview.length === 0) {
                const error = appError.create("Review not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Review.destroy({
                where: {
                    clientID: req.params.clientID,
                    cwSpaceID: req.params.cwSpaceID
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 
