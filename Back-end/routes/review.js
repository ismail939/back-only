const express = require('express')
const reviewController = require('../controllers/reviewController')

const router = express.Router();

router.route("/")
    .get(reviewController.get)
    .post(reviewController.create);

router.route("/:clientID/:cwSpaceID")
    .get(reviewController.getOne)
    .patch(reviewController.update)
    .delete(reviewController.delete);

module.exports = router

