const express = require('express')
const requestController = require('../controllers/requestController')

const router = express.Router();

router.route("/")
    .get(requestController.getAll)
    .post(requestController.create);

//router.route("/:cwSpaceID")
//    .get(requestController.getCw_spaceRequests)

router.route("/:clientID/:cwSpaceID")
    .patch(requestController.update)
    .delete(requestController.delete);

module.exports = router

