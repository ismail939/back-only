const express = require('express')
const cw_spaceController = require('../controllers/cw_spaceController')
const { validateCwSpace } = require("../middlewares/validationSchema");

const router = express.Router();

router.route("/")
    .get(cw_spaceController.get)
    .post(validateCwSpace(), cw_spaceController.create);

router.route("/:ID")
    .get(cw_spaceController.getOne)
    .patch(cw_spaceController.update)
    .delete(cw_spaceController.delete);

module.exports = router

