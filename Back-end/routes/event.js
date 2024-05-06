const express = require('express')
const eventController = require('../controllers/eventController')
const router = express.Router();
const { validateEvent} = require("../middlewares/validationSchema");
const httpStatusCode = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const upload = require('../index')


router.route("/home")
    .get(eventController.getHome);

router.route("/")
    .get(eventController.getAll)
    .post(upload.single('mainPhoto'), eventController.create);

router.route("/:eventID")
    .get(eventController.getOne)
    .patch(eventController.update)
    .delete(eventController.delete);

router.route("/cw_space/:cwID")
    .get(eventController.getCwSpaceEvents);

module.exports = router

