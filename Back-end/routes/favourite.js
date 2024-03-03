const express = require('express')
const addToFavController = require('../controllers/favouriteController')

const router = express.Router();


router.route("/:clientID")
    .get(addToFavController.get)

router.route("/")
    .post(addToFavController.create)
    .delete(addToFavController.delete)
    
module.exports = router