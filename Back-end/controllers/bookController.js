
const { Book, Room, Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const sequelize = require('sequelize')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { reminderQueue } = require("../utils/schedulingQueues");
const moment = require("moment");
const { validationResult } = require("express-validator");

module.exports = {
    get: asyncWrapper(
        async (req, res, next) => {
            const books = await Book.findAll()
            if (books.length === 0) {
                const error = appError.create("Books not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: books });
        }
    ),
    getCwSpaceBookings: asyncWrapper(
        async (req, res, next) => {
            // get the room image and the client image
            // roomsIDs to be 
            const rooms = await Room.findAll({
                where: {
                    cwSpaceCwID: req.params.cwSpaceCwID
                }
            })
            let roomsIDs = []
            let roomsImages = []
            roomsImages.length = 1000000
            for (let index = 0; index < rooms.length; index++) {
                roomsIDs.push(rooms[index].roomID)
                roomsImages.splice(rooms[index].roomID, 0, rooms[index].img)
            }
            let books = await Book.findAll({
                raw: true, where: {
                    roomRoomID: { [sequelize.Op.in]: roomsIDs }
                }
            })
            for (let index = 0; index < books.length; index++) {
                let clientClientID = books[index].clientClientID
                let client = await Client.findOne({
                    raw: true, where: {
                        clientID: clientClientID
                    }
                })
                books[index].username = client.username
                books[index].clientImg = client.img
                books[index].roomImage = roomsImages[books[index].roomRoomID]
            }
            if (books.length === 0) {
                const error = appError.create("Books not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: books });
        }
    ),
    getAllBookingsOneRoom: asyncWrapper(
        async (req, res, next) => {
            let books = await Book.findAll({
                where: {
                    roomRoomID: req.params.roomID
                }, raw: true
            })
            // filter the books as they are equal to the sent date
            for (let index = 0; index < books.length; index++) {
                if(books[index].start.toISOString().split('T')[0]!=req.body.date){
                    books.splice(index, 1)
                    index--
                }
            }
            let times = [] // list of objects each object is a list
            for (let index = 0; index < books.length; index++) {
                for (let j = books[index].start.getHours(); j < books[index].end.getHours(); j++) {
                    times.push([j, j + 1])
                }
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: times })
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const book = await Book.findAll({
                where: {
                    clientID: req.params.clientID,
                    roomID: req.params.roomID
                }
            })
            if (book.length === 0) {
                const error = appError.create("book not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: book })
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = appError.create(errors.array(), 400, httpStatusCode.ERROR)
                return next(error);
            }
            req.body.start = moment(req.body.date + ' ' + req.body.times[0], 'YYYY-MM-DD HH:mm').toISOString()
            req.body.end = moment(req.body.date + ' ' + req.body.times[1], 'YYYY-MM-DD HH:mm').toISOString()
            // check if this date exists already
            const booked = await Book.findOne({
                raw: true, where: {
                    start: {
                        [sequelize.Op.lt]: req.body.end
                    },
                    end: {
                        [sequelize.Op.gt]: req.body.start
                    },
                    roomRoomID: req.body.roomRoomID
                }
            })
            if (booked != null) {
                const error = appError.create("This slot is not valid", 400, httpStatusCode.ERROR);
                return next(error);
            }
            delete req.body.date
            delete req.body.times
            let book
            if (req.body.payment === 'cash') {
                book = await Book.create(req.body);
            } else if (req.body.payment === 'visa') {
                stripe.charges.create({
                    amount: req.body.totalCost * 100, // Amount in cents
                    currency: 'usd',
                    source: req.body.cardToken, // Use a test card token
                    description: 'Test Payment',
                    }, async function(err, charge) {
                    if (err) {
                        return next(err)
                    } else {
                        req.body.status = 'paid'
                        book = await Book.create(req.body);
                    }
                });
            }
            // Calculate the delay until the booking time
            const bookingTime = new Date(req.body.start)
            const delay = bookingTime.getTime() - Date.now() - (6 * 60 * 60 * 1000)
            reminderQueue.add({ email: req.currentUser.email, bookID: book.bookID, cwSpaceID: req.body.cwSpaceID }, { delay })
            return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Created Successfully" });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedBook = await Book.findAll({
                where: {
                    clientID: req.params.clientID,
                    roomID: req.params.roomID
                }
            });
            if (updatedBook.length === 0) {
                const error = appError.create("Book not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Book.update(req.body, {
                where: {
                    clientID: req.params.clientID,
                    roomID: req.params.roomID
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedBook = await Book.findAll({
                where: {
                    bookID: req.params.bookID
                }
            });
            if (deletedBook.length === 0) {
                const error = appError.create("Book not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Book.destroy({
                where: {
                    bookID: req.params.bookID
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Deleted Successfully" });
        }
    )
} 