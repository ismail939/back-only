const express = require('express')
const clientsController = require('../controllers/clientController')

const router = express.Router();

router.route("/")
    .get(clientsController.get)
    .post(clientsController.create);

router.route("/:username")
    .get(clientsController.getOne)
    .patch(clientsController.update)
    .delete(clientsController.delete);

module.exports = router

