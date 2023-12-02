const express = require('express')
const ownerController = require('../controllers/ownerController')
const { validateUser } = require("../middlewares/validationSchema");

const router = express.Router();

router.route("/login").post(validateUser(), ownerController.login);

router.route("/register")
    .post(validateUser(), ownerController.create);

router.route("/")
    .get(ownerController.get)
    .post(ownerController.create);

router.route("/:username")
    .get(ownerController.getOne)
    .patch(ownerController.update)
    .delete(ownerController.delete);

module.exports = router
