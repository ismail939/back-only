const express = require('express')
const eventphotoController = require('../controllers/eventphotoController')

const router = express.Router();

router.route("/")
    .get(eventphotoController.get)
    .post(eventphotoController.create);

router.route("/:id/:eventID")
    .get(eventphotoController.getOne)
    .patch(eventphotoController.update)
    .delete(eventphotoController.delete);

module.exports = router

