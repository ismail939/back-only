const express = require('express')
const eventController = require('../controllers/eventController')
const router = express.Router();
const { validateEvent} = require("../middlewares/validationSchema");
const httpStatusCode = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/events')
    },
    filename: function (req, file, cb) {
        let errors = validateEvent(req)
        if (errors.length != 0) {
            const error = appError.create(errors, 415, httpStatusCode.ERROR)
            return cb(error);
        }
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!acceptedFormats.includes(file.mimetype)) {
            const error = appError.create("Unacceptable Type Format For Image", 415, httpStatusCode.ERROR)
            return cb(error);
        }
        const uniqueSuffix = Date.now() + "." + file.originalname.split('.')[1];
        req.body.imageName = uniqueSuffix;
        cb(null, uniqueSuffix);
    }
})
const upload = multer({ storage: storage })




router.route("/home")
    .get(eventController.getHome);

router.route("/")
    .get(eventController.getAll)
    .post(upload.single('mainPhoto'), eventController.create);

router.route("/:eventID")
    .get(eventController.getOne)
    .patch(eventController.update)
    .delete(eventController.delete);

router.route("/cw_space/:cwID")
    .get(eventController.getCwSpaceEvents);

module.exports = router

