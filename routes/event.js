const express = require('express')
const eventController = require('../controllers/eventController')

const router = express.Router();

router.route("/")
    .get(eventController.get)
    .post(eventController.create);

router.route("/:ID")
    .get(eventController.getOne)
    .patch(eventController.update)
    .delete(eventController.delete);

module.exports = router

