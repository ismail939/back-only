const express = require('express')
const reviewController = require('../controllers/reviewController')

const router = express.Router();

router.route("/")
    .get(reviewController.getAll)
    .post(reviewController.create);

router.route("/:cwSpaceID")
    .get(reviewController.getCw_spaceReviews)

router.route("/:clientID/:cwSpaceID")
    .get(reviewController.getOne)
    .patch(reviewController.update)
    .delete(reviewController.delete);

module.exports = router

