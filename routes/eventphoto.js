const express = require('express')
const eventPhotoController = require('../controllers/eventPhotoController')

const router = express.Router();

router.route("/")
    .get(eventPhotoController.get)
    .post(eventPhotoController.create);

router.route("/:id/:eventID")
    .get(eventPhotoController.getOne)
    .patch(eventPhotoController.update)
    .delete(eventPhotoController.delete);

module.exports = router

