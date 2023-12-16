const express = require('express')
const cw_spaceController = require('../controllers/cw_spaceController')
const router = express.Router();
const { validateCw_space , validateUpdatedCw_space} = require("../middlewares/validationSchema");

const multer = require('multer')
const fs = require('fs')
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


router.route("/home").get(cw_spaceController.getHome);

router.route("/")
    .get(cw_spaceController.get)
    .post(upload.single('mainPhoto'), cw_spaceController.create);

router.route("/:ID")
    .get(cw_spaceController.getOne)
    .patch(upload.single('mainPhoto'), cw_spaceController.update)
    .delete(cw_spaceController.delete);



module.exports = router