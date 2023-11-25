const express = require('express')
const cw_spaceController = require('../controllers/cw_spaceController')
const { validateCw_space } = require('../middlewares/validationSchema');
const router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('req 1', req.body)
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        console.log('req 2', req.body)
        // const acceptedFormats = ['png', 'jpg', 'jpeg']
        // if(acceptedFormats.includes(file.originalname.split('.')[1])){
            
        // }else{ cb(new Error('wrong type')) }
        console.log("jdjdjf")
        const uniqueSuffix = Date().slice(0, 24) + '-' + file.originalname
        req.body.data.imageName = uniqueSuffix
        cb(null, uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
// const upload = multer({ dest: 'public/images/' }) 



router.route("/")
    .get(cw_spaceController.get)
    .post(upload.single('mainPhoto'), cw_spaceController.create);

router.route("/:ID")
    .get(cw_spaceController.getOne)
    .patch(cw_spaceController.update)
    .delete(cw_spaceController.delete);

module.exports = router

