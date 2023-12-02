const express = require('express')
const clientsController = require('../controllers/clientController')
const { validateUser } = require("../middlewares/validationSchema");

const router = express.Router();

router.route("/login")
    .post(clientsController.getOne);

router.route("/register")
    .post(clientsController.create);

router.route("/")
    .get(clientsController.get)

router.route("/:username")
    .get(clientsController.getOne)
    .patch(clientsController.update)
    .delete(clientsController.delete);

module.exports = router

