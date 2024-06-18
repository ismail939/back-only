const express = require('express')
const cw_spaceController = require('../controllers/cw_spaceController')
const router = express.Router();
const upload = require('../index')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");

router.route("/home").get(cw_spaceController.getHome);

router.route("/updatePhoto/:ID")
    .patch(verifyToken, allowedTo('owner'), upload.single('mainPhoto'), cw_spaceController.updatePhoto);

router.route("/")
    .get(cw_spaceController.getAll)
    .post(verifyToken, allowedTo('owner'), upload.single('mainPhoto'), cw_spaceController.create);

router.route("/getAllModerators/:ID")
    .get(verifyToken, allowedTo('owner'), cw_spaceController.getAllModerators)

router.route("/:ID")
    .get(cw_spaceController.getOne)
    .patch(verifyToken, allowedTo('owner'), cw_spaceController.update)
    .delete(verifyToken, allowedTo('admin'), cw_spaceController.delete);



module.exports = router