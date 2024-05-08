const { Review, Client, Cw_space } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");


module.exports = {
    create: asyncWrapper(
        async (req, res, next) => {
            const review = await Review.findOne({
                where: {
                    clientClientID: req.body.clientClientID,
                    cwSpaceCwID: req.body.cwSpaceCwID
                }
            })
            if (review) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "You have Already Reviewed this Co-working Space" })
            }
            const client = await Client.findOne({
                where: {
                    clientID : req.body.clientClientID
                }
            })
            const cw_space = await Cw_space.findOne({
                where: {
                    cwID: req.body.cwSpaceCwID
                }
            })
            if (client && cw_space) {
                const newReview = await Review.create(req.body)
                const newRate = (cw_space.rate * cw_space.noOfReviews + req.body.rate) / (cw_space.noOfReviews + 1)
                await Cw_space.update(
                    {
                        rate: newRate,
                        noOfReviews: cw_space.noOfReviews+1
                    }, {
                    where: {
                        cwID: cw_space.cwID
                    }
                })
                if (newReview) {
                    return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Review is Created Successfully" });
                }
            }
            const error = appError.create("Client or Co-working Space does not exist", 404, httpStatusCode.ERROR);
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
            let reviews = await Review.findAll({
                raw: true, where: {
                    cwSpaceCwID: req.params.cwSpaceID
                }
            }, { raw: true })
            if (reviews.length != 0) {
                for (let i = 0; i < reviews.length; i++) {
                    let client = await Client.findOne({
                        raw: true, where: {
                            clientID: reviews[i].clientClientID
                        }
                    })
                    reviews[i].name = client.fname + " " + client.lname
                    reviews[i].img = client.img
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
                if (req.body.rate) {
                    const cw_space = await Cw_space.findOne({
                        where: {
                            cwID: req.params.cwSpaceID
                        }
                    })
                    const newRate = (cw_space.rate * cw_space.noOfReviews - updatedReview.rate + req.body.rate) / (cw_space.noOfReviews)
                    await Cw_space.update(
                        {
                            rate: newRate
                        }, {
                        where: {
                            cwID: cw_space.cwID
                        }
                    })
                }
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
                const cw_space = await Cw_space.findOne({
                        where: {
                            cwID: req.params.cwSpaceID
                        }
                    })
                    const newRate = (cw_space.rate * cw_space.noOfReviews - deletedReview.rate) / (cw_space.noOfReviews - 1)
                    await Cw_space.update(
                        {
                            rate: newRate,
                            noOfReviews: cw_space.noOfReviews-1
                        }, {
                        where: {
                            cwID: cw_space.cwID
                        }
                    })
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
