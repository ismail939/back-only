const express = require('express')
const cw_spacePhotoController = require('../controllers/cw_spacePhotoController')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");

const router = express.Router();
const upload = require('../index')


router.route("/:cwID")
    .get(cw_spacePhotoController.getAll)
    .post(verifyToken, allowedTo('owner'), upload.any('img'), cw_spacePhotoController.create);

router.route("/:cwID/:ID")
    .get(cw_spacePhotoController.getOne)
    .delete(verifyToken, allowedTo('owner'), cw_spacePhotoController.delete);

module.exports = router