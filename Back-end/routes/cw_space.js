const express = require('express')
const cw_spaceController = require('../controllers/cw_spaceController')
const router = express.Router();
const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        console.log(req.body)
        const acceptedFormats = ['png', 'jpg', 'jpeg']
        const decodedImage = BSON.deserialize(req.body.img);
        if(acceptedFormats.includes(req.body.imageName.split('.')[1])){
            const uniqueSuffix =Date.now() + "." + req.body.imageName.split('.')[1];
            const filePath = './public/images/' + uniqueSuffix;
            fs.writeFileSync(filePath, decodedImage.data);
            req.body.imageName = uniqueSuffix;
            cb(null, uniqueSuffix);
        }
        else{ cb(new Error('wrong type')) }
    }
})
const upload = multer({ storage: storage })



router.route("/")
    .get(cw_spaceController.get)
    .post(upload.single('mainPhoto'), cw_spaceController.create);

router.route("/:ID")
    .get(cw_spaceController.getOne)
    .patch(cw_spaceController.update)
    .delete(cw_spaceController.delete);

module.exports = router