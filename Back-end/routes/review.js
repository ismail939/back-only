const express = require('express')
const reviewController = require('../controllers/reviewController')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");

const router = express.Router();

router.route("/")
    .post(verifyToken, allowedTo('client'), reviewController.create)

router.route("/:cwSpaceID")
    .get(reviewController.getCw_spaceReviews)

router.route("/:clientID/:cwSpaceID")
    .get(verifyToken, allowedTo('client'), reviewController.getOne)
    .patch(verifyToken, allowedTo('client'), reviewController.update)
    .delete(verifyToken, allowedTo('client'), reviewController.delete);

module.exports = router

