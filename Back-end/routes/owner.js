const express = require('express')
const ownerController = require('../controllers/ownerController')
const router = express.Router();

router.route("/login")
    .post(ownerController.login);

router.route("/register")
    .post(ownerController.create);

router.route("/")
    .get(ownerController.getAll)
    .post(ownerController.create);

router.route("/:username")
    .get(ownerController.getOne)
    .patch(ownerController.update)
    .delete(ownerController.delete);

module.exports = router
