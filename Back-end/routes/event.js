const express = require('express')
const eventController = require('../controllers/eventController')
const router = express.Router();
const upload = require('../index')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");


router.route("/home")
    .get(eventController.getHome);

router.route("/")
    .get(eventController.getAll)
    .post(verifyToken, allowedTo('owner', 'moderator'), upload.single('img'), eventController.create);

router.route("/:eventID")
    .get(eventController.getOne)
    .patch(verifyToken, allowedTo('owner', 'moderator'),upload.single('img'),  eventController.update)
    .delete(verifyToken, allowedTo('owner'), eventController.delete);

router.route("/cw_space/:cwID")
    .get(eventController.getCwSpaceEvents);

module.exports = router

