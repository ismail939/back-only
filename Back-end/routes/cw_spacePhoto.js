const express = require('express')
const cw_spacePhotoController = require('../controllers/cw_spacePhotoController')

const router = express.Router();

router.route("/")
    .get(cw_spacePhotoController.get)
    .post(cw_spacePhotoController.create);

router.route("/:ID")
    .get(cw_spacePhotoController.getOne)
    .patch(cw_spacePhotoController.update)
    .delete(cw_spacePhotoController.delete);

module.exports = router