const express = require('express')
const roomController = require('../controllers/roomController.js')
const router = express.Router();
const { validateRoom, validateUpdatedRoom } = require("../middlewares/validationSchema");
const upload = require('../index')

router.route("/")
    .post(upload.single("img"), roomController.create);
router.route("/:cwID")
    .get(roomController.getAll)

router.route("/:cwID/:ID")
    .get(roomController.getOne)
    .patch(upload.single('img'), roomController.update)
    .delete(roomController.delete);

module.exports = router

