const express = require('express')
const cw_spaceController = require('../controllers/cw_spaceController')
const router = express.Router();
const { validateCw_space, validateUpdatedCw_space} = require("../middlewares/validationSchema");
const httpStatusCode = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const upload = require('../index')

router.route("/home").get(cw_spaceController.getHome);

router.route("/updatePhoto/:ID")
    .patch(upload.single('mainPhoto'), cw_spaceController.updatePhoto);

router.route("/")
    .get(cw_spaceController.getAll)
    .post(upload.single('mainPhoto'), cw_spaceController.create);

router.route("/:ID")
    .get(cw_spaceController.getOne)
    .patch(cw_spaceController.update)
    .delete(cw_spaceController.delete);



module.exports = router