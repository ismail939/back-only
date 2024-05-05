const express = require('express')
const offerController = require('../controllers/offerController')
const router = express.Router();
const upload = require('../index')


router.route("/home")
    .get(offerController.getHome);

router.route("/")
    .get(offerController.getAll)
    .post(upload.single('img'), offerController.create);

router.route("/:offerID")
    .get(offerController.getOne)
    .patch(upload.single('img'), offerController.update)
    .delete(offerController.delete);

router.route("/cw_space/:cwID")
    .get(offerController.getCwSpaceOffers);

module.exports = router

