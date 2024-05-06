const express = require('express')
const cw_spacePhotoController = require('../controllers/cw_spacePhotoController')
const router = express.Router();
const upload = require('../index')


router.route("/:cwID")
    .get(cw_spacePhotoController.getAll)
    .post(upload.any('img'), cw_spacePhotoController.create);

router.route("/:cwID/:ID")
    .get(cw_spacePhotoController.getOne)
    .delete(cw_spacePhotoController.delete);

module.exports = router