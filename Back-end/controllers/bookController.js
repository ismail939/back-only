
const { Book, Room, Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validateBook } = require('../middlewares/validationSchema');
const sequelize = require('sequelize')


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
                books[index].clientImage = client.profilePic
                console.log(books[index].roomID, roomsImages, "9999999999")
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
                console.log(books[index].start.toISOString().split('T')[0])
                console.log(req.body.date)
                if(books[index].start.toISOString().split('T')[0]!=req.body.date){
                    console.log(books[index]+"uuuu")
                    books.splice(index, 1)
                    index--
                }
            }
            console.log(books)
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
            // date, range of hour
            let errors = validateBook(req);
            if (errors.length != 0) {
                const error = appError.create(errors, 400, httpStatusCode.ERROR)
                return next(error)
            }
            req.body.start = req.body.date + ' ' + req.body.times[0] + ":00:00"
            req.body.end = req.body.date + ' ' + req.body.times[1] + ":00:00"
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
                console.log(booked)
                const error = appError.create("This slot is not valid", 400, httpStatusCode.ERROR);
                return next(error);
            }
            delete req.body.date
            delete req.body.times
            console.log(req.body)
            const newBook = await Book.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newBook });
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
                    clientID: req.params.clientID,
                    roomID: req.params.roomID
                }
            });
            if (deletedBook.length === 0) {
                const error = appError.create("Book not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Book.destroy({
                where: {
                    clientID: req.params.clientID,
                    roomID: req.params.roomID
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 