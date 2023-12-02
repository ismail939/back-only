const express = require('express')
const offerController = require('../controllers/offerController')
const router = express.Router();
const { validateOffer } = require("../middlewares/validationSchema");

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/offers')
    },
    filename: function (req, file, cb) {
        let errors = validateOffer(req)
            if (errors.length!=0) {    
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
    .patch(offerController.update)
    .delete(offerController.delete);

module.exports = router  

