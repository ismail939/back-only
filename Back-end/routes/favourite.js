const express = require('express')
const favouriteController = require('../controllers/favouriteController')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");

const router = express.Router();


router.route("/:clientID")
    .get(verifyToken, allowedTo('client'), favouriteController.get)

router.route("/")
    .post(verifyToken, allowedTo('client'), favouriteController.create)
    .delete(verifyToken, allowedTo('client'), favouriteController.delete)
    
module.exports = router