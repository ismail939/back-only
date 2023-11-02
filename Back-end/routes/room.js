const express = require('express')
const roomController = require('../controllers/roomController.js')

const router = express.Router();

router.route("/")
    .get(roomController.get)
    .post(roomController.create);

router.route("/:ID")
    .get(roomController.getOne)
    .patch(roomController.update)
    .delete(roomController.delete);

module.exports = router

