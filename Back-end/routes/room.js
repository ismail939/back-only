const express = require('express')
const roomController = require('../controllers/roomController.js')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const router = express.Router();
const upload = require('../index')
const { roomSchema, roomUpdateSchema } = require("../middlewares/validationSchema");

router.route("/")
    .post(verifyToken, allowedTo('owner'), upload.single("img"), roomSchema(), roomController.create);
router.route("/:cwID")
    .get(allowedTo('client'), roomController.getAll)

router.route("/:cwID/:ID")
    .get(roomController.getOne)
    .patch(verifyToken, allowedTo('owner'), upload.single('img'), roomUpdateSchema(), roomController.update)
    .delete(verifyToken, allowedTo('owner'), roomController.delete);

module.exports = router

