const express = require('express')
const offerController = require('../controllers/offerController')
const router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const acceptedFormats = ['png', 'jpg', 'jpeg']
        if(acceptedFormats.includes(file.originalname.split('.')[1])){
            const uniqueSuffix =
            Date.now() + "." + file.originalname.split(".")[1];
            req.body.data.imageName = uniqueSuffix;
            cb(null, uniqueSuffix);
        }else{ cb(new Error('wrong type')) }
    }
})
const upload = multer({ storage: storage })


router.route("/")
    .get(offerController.get)
    .post(upload.single('img'), offerController.create);

router.route("/:offerID")
    .get(offerController.getOne)
    .patch(offerController.update)
    .delete(offerController.delete);

module.exports = router

