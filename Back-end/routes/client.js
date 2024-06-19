const express = require('express')
const clientController = require('../controllers/clientController')
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const allowedTo = require("../middlewares/allowedTo")
const upload = require("../index")
const { userSchema, userUpdateSchema } = require("../middlewares/validationSchema");


router.route("/register")
    .post(userSchema(), clientController.register);

router.route("/sendVerification")
    .post(clientController.sendVerification);

router.route("/verify")
    .post(clientController.verifyEmail);

router.route("/login")
    .post(clientController.login);

router.route("/forgotPassword")
    .post(clientController.forgotPassword);

router.route("/updatePhoto/:ID")
    .patch(verifyToken, allowedTo('client'), upload.single('profilePic'), clientController.updatePhoto);

router.route("/updatePassword/:ID")
    .patch(verifyToken, allowedTo('client'), clientController.updatePassword);

router.route("/:ID")
    .patch(verifyToken, allowedTo('client'), userUpdateSchema(), clientController.update)
    .delete(verifyToken, allowedTo('admin'), clientController.delete);

router.route("/")
    .get(verifyToken, allowedTo('admin'), clientController.getAll)


module.exports = router