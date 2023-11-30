const express = require('express')
const clientsController = require('../controllers/clientController')
const { validateUser } = require("../middlewares/validationSchema");

const router = express.Router();

router.route("/login")
    .post(validateUser(), clientsController.getOne);

router.route("/register")
    .post(validateUser(), clientsController.create);

router.route("/")
    .get(clientsController.get)

router.route("/:username")
    .get(clientsController.getOne)
    .patch(clientsController.update)
    .delete(clientsController.delete);

module.exports = router

