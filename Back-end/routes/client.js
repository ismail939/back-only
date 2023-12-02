const express = require('express')
const clientController = require('../controllers/clientController')
const router = express.Router();

router.route("/login")
    .post(clientController.login);

router.route("/register")
    .post(clientController.create);

router.route("/")
    .get(clientController.getAll)

router.route("/:username")
    .get(clientController.getOne)
    .patch(clientController.update)
    .delete(clientController.delete);

module.exports = router

