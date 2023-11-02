const express = require('express')
const cw_spacePhoneController = require('../controllers/cw_spacePhoneController')

const router = express.Router();

router.route("/")
    .get(cw_spacePhoneController.get)
    .post(cw_spacePhoneController.create);

router.route("/:ID")
    .get(cw_spacePhoneController.getOne)
    .patch(cw_spacePhoneController.update)
    .delete(cw_spacePhoneController.delete);

module.exports = router