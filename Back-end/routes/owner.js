const express = require('express')
const ownerController = require('../controllers/ownerController')
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const httpStatusCode = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const allowedTo = require("../middlewares/allowedTo");

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/owners')
    },
    filename: function (req, file, cb) {
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!acceptedFormats.includes(file.mimetype)) {
            const error = appError.create("Unacceptable Type Format", 415, httpStatusCode.ERROR)
            return cb(error);
        }
        const uniqueSuffix = Date.now() + "." + file.originalname.split('.')[1];
        req.body.imageName = uniqueSuffix
        cb(null, uniqueSuffix);
    }
})
const upload = multer({ storage: storage })


router.route("/register")
    .post(ownerController.register);

router.route("/login")
    .post(ownerController.login);

router.route("/updatePhoto/:ID")
    .patch(verifyToken, allowedTo('owner'), upload.single('profilePic'), ownerController.updatePhoto);

router.route("/updatePassword/:ID")
    .patch(verifyToken, allowedTo('owner'), ownerController.updatePassword);

router.route("/:ID")
    .patch(verifyToken, allowedTo('owner'), ownerController.update)
    .delete(verifyToken, allowedTo('admin'), ownerController.delete);

router.route("/")
    .get(verifyToken, allowedTo('admin'), ownerController.getAll)


module.exports = router