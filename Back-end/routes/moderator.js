const express = require('express')
const moderatorController = require('../controllers/moderatorController')
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const httpStatusCode = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const allowedTo = require("../middlewares/allowedTo");

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/moderators')
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
    .post(moderatorController.register);

router.route("/login")
    .post(moderatorController.login);

router.route("/updatePhoto/:ID")
    .patch(verifyToken, allowedTo('moderator'), upload.single('profilePic'), moderatorController.updatePhoto);

router.route("/updatePassword/:ID")
    .patch(verifyToken, allowedTo('moderator'), moderatorController.updatePassword);

router.route("/:ID")
    .delete(verifyToken, allowedTo('admin','owner'), moderatorController.delete);

router.route("/")
    .get(verifyToken, allowedTo('admin', 'owner'), moderatorController.getAll) 

module.exports = router