const express = require('express')
const offerController = require('../controllers/offerController')
const router = express.Router();
const upload = require('../index')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");


router.route("/home")
    .get(offerController.getHome);

router.route("/")
    .get(offerController.getAll)
    .post(verifyToken, allowedTo('owner'), upload.single('img'), offerController.create);

router.route("/:offerID")
    .get(offerController.getOne)
    .patch(verifyToken, allowedTo('owner'), upload.single('img'), offerController.update)
    .delete(verifyToken, allowedTo('owner'), offerController.delete);

router.route("/cw_space/:cwID")
    .get(offerController.getCwSpaceOffers);

module.exports = router

