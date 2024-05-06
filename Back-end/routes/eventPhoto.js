const express = require('express')
const eventPhotoController = require('../controllers/eventPhotoController')
const router = express.Router();
const upload = require('../index')

router.route("/")
    .get(eventPhotoController.get)
    .post(upload.any('img'), eventPhotoController.create);

router.route("/:id/:eventID")
    .get(eventPhotoController.getOne)
    .delete(eventPhotoController.delete);

module.exports = router

