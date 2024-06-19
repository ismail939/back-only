const express = require('express')
const ownerController = require('../controllers/ownerController')
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const upload = require('../index')
const { userSchema, userUpdateSchema, userPasswordSchema } = require("../middlewares/validationSchema")

router.route("/register")
    .post(userSchema(), ownerController.register);

router.route("/sendVerification")
    .post(ownerController.sendVerification);

router.route("/verify")
    .post(ownerController.verifyEmail);

router.route("/login")
    .post(ownerController.login);

router.route("/forgotPassword")
    .post(ownerController.forgotPassword);

router.route("/updatePhoto/:ID")
    .patch(verifyToken, allowedTo('owner'), upload.single('profilePic'), ownerController.updatePhoto);

router.route("/updatePassword/:ID")
    .patch(verifyToken, allowedTo('owner'), userPasswordSchema(), ownerController.updatePassword);

router.route("/:ID")
    .patch(verifyToken, allowedTo('owner'), userUpdateSchema(), ownerController.update)
    .delete(verifyToken, allowedTo('admin'), ownerController.delete);

router.route("/")
    .get(verifyToken, allowedTo('admin', 'owner'), ownerController.getAll) 


module.exports = router