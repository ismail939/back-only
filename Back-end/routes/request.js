const express = require('express')
const requestController = require('../controllers/requestController')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");

const router = express.Router();

router.route("/")
    .get(requestController.getAll) // for admin
    .post(verifyToken, allowedTo('client'), requestController.create);

router.route("/:cwSpaceID")
    .get(verifyToken, allowedTo('owner'), requestController.getCw_spaceRequests)

router.route("/:clientID/:roomID")
    .patch(verifyToken, allowedTo('owner'), requestController.update)
    .delete(verifyToken, allowedTo('owner'), requestController.delete);

module.exports = router

