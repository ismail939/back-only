const express = require('express')
const roomController = require('../controllers/roomController.js')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");

const router = express.Router();
const { validateRoom, validateUpdatedRoom } = require("../middlewares/validationSchema");
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/rooms')
    },
    filename: function (req, file, cb) {
        let errors
        if (req.method == "POST") {
            console.log(req.body)
            errors = validateRoom(req)
        }
        else if (req.method == "PATCH") {
            errors = validateUpdatedRoom(req)
        }
        if (errors.length != 0) {
            return cb(new Error(errors.join(', ')), null);
        }
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!acceptedFormats.includes(file.mimetype)) {
            return cb(new Error('Wrong file type'), null);
        }
        const uniqueSuffix = Date.now() + "." + file.originalname.split('.')[1];
        req.body.imageName = uniqueSuffix
        cb(null, uniqueSuffix);
    }
})
const upload = multer({ storage: storage })

router.route("/")
    .post(verifyToken, allowedTo('owner'), upload.single("img"), roomController.create);
router.route("/:cwID")
    .get(roomController.getAll)

router.route("/:cwID/:ID")
    .get(roomController.getOne)
    .patch(verifyToken, allowedTo('owner'), upload.single('img'), roomController.update)
    .delete(verifyToken, allowedTo('owner'), roomController.delete);

module.exports = router

