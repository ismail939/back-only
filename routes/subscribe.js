const express = require('express')
const subscribeController = require('../controllers/subscribeController')

const router = express.Router();

router.route("/")
    .get(subscribeController.get)
    .post(subscribeController.create);

router.route("/:clientID/:cwSpaceID")
    .get(subscribeController.getOne)
    .patch(subscribeController.update)
    .delete(subscribeController.delete);

module.exports = router