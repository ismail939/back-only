const express = require('express')
const bookController = require('../controllers/bookController')

const router = express.Router();

router.route("/")
    .get(bookController.get)
    .post(bookController.create);

router.route("/:clientID/:roomID")
    .get(bookController.getOne)
    .patch(bookController.update)
    .delete(bookController.delete);

module.exports = router