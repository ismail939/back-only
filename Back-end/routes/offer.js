const express = require('express')
const offerController = require('../controllers/offerController')
const router = express.Router();
const { validateOffer } = require("../middlewares/validationSchema");

const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        let errors = validateOffer(req)
            if (errors.length!=0) {    
                return cb(new Error(errors.join(', ')), null);
        }
        const acceptedFormats = ['png', 'jpg', 'jpeg']
        if(acceptedFormats.includes(req.body.imageName.split('.')[1])){
            const uniqueSuffix =Date.now() + "." + req.body.imageName.split('.')[1];
            const filePath = './public/images/' + uniqueSuffix;
            fs.writeFileSync(filePath, uniqueSuffix);
            req.body.imageName = uniqueSuffix;
            cb(null, uniqueSuffix);
        }
        else{ cb(new Error('wrong type')) }
    } 
})
const upload = multer({ storage: storage })

router.route("/home").get(offerController.getHome);

router.route("/")
    .get(offerController.get)
    .post(upload.single('img'), offerController.create);

router.route("/:offerID")
    .get(offerController.getOne)
    .patch(offerController.update)
    .delete(offerController.delete);

module.exports = router  

