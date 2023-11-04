const express = require('express')
const offerController = require('../controllers/offerController')

const router = express.Router();

router.route("/")
    .get(offerController.get)
    .post(offerController.create);

router.route("/:clientID/:cwSpaceID")
    .get(offerController.getOne)
    .patch(offerController.update)
    .delete(offerController.delete);

module.exports = router

