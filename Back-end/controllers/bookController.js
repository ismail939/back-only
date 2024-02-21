
const { Book, Room , Client} = require('../models/modelIndex')
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
            
            // get a list of roomRoomIDs and find any bookings with included ids.
            const rooms = await Room.findAll({
                where: {
                    cwSpaceCwID: req.params.cwSpaceCwID
                }
            })
            let roomsIDs = [] 
            for (let index = 0; index < rooms.length; index++) {
                roomsIDs.push(rooms[index].roomID)
            }
            
            let books = await Book.findAll({
                raw: true, where: {
                    roomRoomID:{[sequelize.Op.in]: roomsIDs}
                }
            })
            for (let index = 0; index < books.length; index++)  {
                let clientClientID = books[index].clientClientID
                console.log(clientClientID)
                let client = await Client.findOne({raw: true, where: {
                    clientID: clientClientID
                }})
                console.log(client) 
                books[index].username = client.username
            }

            if (books.length === 0) {
                const error = appError.create("Books not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: books });
        }
    ),
    getAllBookingsOneRoom:asyncWrapper(
        async (req, res, next)=>{
            const books = await Book.findAll({
                where: {
                    roomRoomID: req.params.roomID
                }
            })
            let times = [] // list of objects each object is a list
            for (let index = 0; index < books.length; index++) {
                times.push([books[index].start.getHours(), books[index].end.getHours()])
            }
            console.log(times)
            if (books.length === 0) {
                const error = appError.create("book not found", 404, httpStatusCode.ERROR);
                return next(error);
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
            console.log(req.body)
            req.body.payment = 'cash'
            let errors = validateBook(req);
            if (errors.length != 0) {
                const error = appError.create(errors, 400, httpStatusCode.ERROR)
                return next(error)
            }
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