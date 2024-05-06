const express = require('express')
const bookController = require('../controllers/bookController')
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");

const router = express.Router();

router.route("/roomof/:roomID")
    .post(bookController.getAllBookingsOneRoom)

router.route("/")
    .get(bookController.get) // must set to the admin
    .post(verifyToken, allowedTo('client'), bookController.create);

router.route("/:cwSpaceCwID")
    .get(verifyToken, allowedTo('owner'), bookController.getCwSpaceBookings)

router.route("/:clientID/:roomID")
    .get(verifyToken, allowedTo('client'), bookController.getOne)
    .patch(verifyToken, allowedTo('client'), bookController.update)
    .delete(verifyToken, allowedTo('client'), bookController.delete);



module.exports = router