const express = require('express')
const clientsController = require('../controllers/clientController')

const router = express.Router();

router.route("/clients")
    .get(clientsController.get)
    .post(clientsController.create);

router.route("/clients/:username")
    .get(clientsController.getOne)
    .patch(clientsController.update)
    .delete(clientsController.delete);

module.exports = router

