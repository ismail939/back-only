const express = require('express')
const ownerController = require('../controllers/ownerController')
const router = express.Router();

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/owners')
    },
    filename: function (req, file, cb) {
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

router.route("/addPhoto/:username")
    .patch(upload.single('profilePic'), ownerController.addPhoto);

router.route("/login")
    .post(ownerController.login);

router.route("/register")
    .post(ownerController.create);

router.route("/")
    .get(ownerController.getAll)
    .post(ownerController.create);

router.route("/:username")
    .get(ownerController.getOne)
    .patch(ownerController.update)
    .delete(ownerController.delete);

module.exports = router
