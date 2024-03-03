const express = require('express')
const addToFavController = require('../controllers/favouriteController')

const router = express.Router();


router.route("/:clientID")
    .get(addToFavController.get)
    .delete(addToFavController.delete)

router.route("/")
    .post(addToFavController.create)

module.exports = router