const express = require('express')
const cw_spacePhotoController = require('../controllers/cw_spacePhotoController')
const router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/cw_spaces')
    },
    filename: function (req, file, cb) {
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!acceptedFormats.includes(file.mimetype)) {
            return cb(new Error('Wrong file type'), null);
        }
        if(req.body.photos==undefined){
            req.body.photos = []
        }
        const uniqueSuffix = Date.now() + (req.body.photos.length+1) + "." + file.originalname.split('.')[1];
        req.body.photos.push(uniqueSuffix);      
        cb(null, uniqueSuffix);       
    }

}
)
const upload = multer({ storage: storage })
router.route("/")
    .get(cw_spacePhotoController.get)
    .post(upload.any('file'), cw_spacePhotoController.create);

router.route("/:ID")
    .get(cw_spacePhotoController.getOne)
    .patch(cw_spacePhotoController.update)
    .delete(cw_spacePhotoController.delete);

module.exports = router