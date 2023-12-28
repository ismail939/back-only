const express = require('express')
const offerController = require('../controllers/offerController')
const router = express.Router();
const { validateOffer, validateUpdatedOffer } = require("../middlewares/validationSchema");

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/offers')
    },
    filename: function (req, file, cb) {
        let errors
        if (req.method == "POST") {
            errors = validateOffer(req)
        }
        else if (req.method == "PATCH") {
            errors = validateUpdatedOffer(req)
        }
        if (errors.length != 0) {
            return cb(new Error(errors.join(', ')), null);
        }
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!acceptedFormats.includes(file.mimetype)) {
            return cb(new Error('Unacceptable Type Format'), null);
        }
        const uniqueSuffix = Date.now() + "." + file.originalname.split('.')[1];
        req.body.imageName = uniqueSuffix
        cb(null, uniqueSuffix);
    }
})
const upload = multer({ storage: storage })

router.route("/home")
    .get(offerController.getHome);

router.route("/")
    .get(offerController.getAll)
    .post(upload.single('img'), offerController.create);

router.route("/:offerID")
    .get(offerController.getOne)
    .patch(upload.single('img'), offerController.update)
    .delete(offerController.delete);

router.route("/cw_space/:cwID")
    .get(offerController.getCwSpaceOffers);

module.exports = router

