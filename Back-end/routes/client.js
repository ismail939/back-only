const express = require('express')
const clientController = require('../controllers/clientController')
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken')
const httpStatusCode = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const allowedTo = require("../middlewares/allowedTo")

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/clients')
    },
    filename: function (req, file, cb) {
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!acceptedFormats.includes(file.mimetype)) {
            const error = appError.create("Unacceptable Type Format", 415, httpStatusCode.ERROR)
            return cb(next(error));
        }
        const uniqueSuffix = Date.now() + "." + file.originalname.split('.')[1];
        req.body.imageName = uniqueSuffix     
        cb(null, uniqueSuffix);       
    } 
})
const upload = multer({ storage: storage })


router.route("/register")
    .post(clientController.register);

router.route("/login")
    .post(clientController.login);

router.route("/updatePhoto/:ID")
    .patch(verifyToken, allowedTo('client'), upload.single('profilePic'), clientController.updatePhoto);

router.route("/:ID")
    .patch(verifyToken, allowedTo('client'), clientController.update)
    .delete(verifyToken, allowedTo('client'), clientController.delete);

router.route("/")
    .get(verifyToken, allowedTo('owner'), clientController.getAll)


module.exports = router

