const express = require('express')
const ownerController = require('../controllers/ownerController')

const router = express.Router();

router.route("/owners")
    .get(ownerController.get)
    .post(ownerController.create);

router.route("/owners/:username")
    .get(ownerController.getOne)
    .patch(ownerController.update)
    .delete(ownerController.delete);

module.exports = router

