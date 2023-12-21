const express = require('express')
const cw_spaceController = require('../controllers/cw_spaceController')
const router = express.Router();
const { validateCw_space, validateUpdatedCw_space} = require("../middlewares/validationSchema");
const httpStatusCode = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/cw_spaces')
    },
    filename: function (req, file, cb) {
        let errors
        if (req.method == "PATCH") {
            errors = validateUpdatedCw_space(req)
        } else if (req.method == "POST") {
            errors = validateCw_space(req)
        }
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