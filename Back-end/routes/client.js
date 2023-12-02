const express = require('express')
const clientController = require('../controllers/clientController')
const router = express.Router();

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/clients')
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
    .patch(upload.single('profilePic'), clientController.addPhoto);

router.route("/login")
    .post(clientController.login);

router.route("/register")
    .post(clientController.create);

router.route("/")
    .get(clientController.getAll)

router.route("/:username")
    .get(clientController.getOne)
    .patch(clientController.update)
    .delete(clientController.delete);

module.exports = router

