const express = require('express')
const roomController = require('../controllers/roomController.js')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const router = express.Router();
const upload = require('../index')

router.route("/")
    .post(verifyToken, allowedTo('owner'), upload.single("img"), roomController.create);
router.route("/:cwID")
    .get(roomController.getAll)

router.route("/:cwID/:ID")
    .get(roomController.getOne)
    .patch(verifyToken, allowedTo('owner'), upload.single('img'), roomController.update)
    .delete(verifyToken, allowedTo('owner'), roomController.delete);

module.exports = router

