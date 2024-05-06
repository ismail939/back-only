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
    .post(verifyToken, allowedTo('owner', 'moderator'), upload.single('mainPhoto'), eventController.create);

router.route("/:eventID")
    .get(eventController.getOne)
    .patch(verifyToken, allowedTo('owner', 'moderator'), eventController.update)
    .delete(verifyToken, allowedTo('owner'), eventController.delete);

router.route("/cw_space/:cwID")
    .get(eventController.getCwSpaceEvents);

module.exports = router

