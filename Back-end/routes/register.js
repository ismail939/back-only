const express = require('express')
const registerController = require('../controllers/registerController')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");

const router = express.Router();

router.route("/")
    .post(verifyToken, allowedTo('client'), registerController.register);

router.route("/:eventID")
    .get(verifyToken, allowedTo('owner'), registerController.getEventRegisters)

module.exports = router