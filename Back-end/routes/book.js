const express = require('express')
const bookController = require('../controllers/bookController')

const router = express.Router();

router.route("/roomof/:roomID")
    .get(bookController.getAllBookingsOneRoom)

router.route("/")
    .get(bookController.get)
    .post(bookController.create);

router.route("/:cwSpaceCwID")
    .get(bookController.getCwSpaceBookings)

router.route("/:clientID/:roomID")
    .get(bookController.getOne)
    .patch(bookController.update)
    .delete(bookController.delete);



module.exports = router