const express = require('express')
const eventController = require('../controllers/eventController')

const router = express.Router();

router.route("/home")
    .get(eventController.getHome);

router.route("/")
    .get(eventController.getAll)
    .post(eventController.create);

router.route("/:eventID")
    .get(eventController.getOne)
    .patch(eventController.update)
    .delete(eventController.delete);

router.route("/cw_space/:cwID")
    .get(eventController.getCwSpaceEvents);

module.exports = router

