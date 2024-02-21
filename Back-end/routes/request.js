const express = require('express')
const requestController = require('../controllers/requestController')

const router = express.Router();

router.route("/")
    .get(requestController.getAll)
    .post(requestController.create);

router.route("/:cwSpaceID")
    .get(requestController.getCw_spacerequests)

router.route("/:clientID/:cwSpaceID")
    .get(requestController.getOne)
    .patch(requestController.update)
    .delete(requestController.delete);

module.exports = router

