const { Room } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const Sequelize = require('sequelize')
const fs = require('fs')

module.exports = {
    create: asyncWrapper(
        async (req, res, next) => {
            req.body.img = req.body.imageName
            delete req.body.imageName
            const duplicates = await Room.findOne({
                raw: true, where: {
                    [Sequelize.Op.and]: [
                        { type: req.body.type },
                        { cwSpaceCwID: req.body.cwSpaceCwID },
                        { number: req.body.number }
                    ]
                }
            })
            if (duplicates) {
                const error = appError.create("Room Already Exists", 400, httpStatusCode.ERROR)
                return next(error)
            }
            const newRoom = await Room.create(req.body)
            if (newRoom) {
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Rooms Created Successfully" });
            }
            const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL);
            return next(error);
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            const rooms = await Room.findAll({
                where: {
                    cwSpaceCwID: req.params.cwID
                }
            })
            if (rooms.length != 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: rooms });
            }
            const error = appError.create("There are No Available Rooms", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const room = await Room.findOne({
                where: {
                    cwSpaceCwID: req.params.cwID,
                    roomID: req.params.ID
                }
            })
            if (room) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: room })
            }
            const error = appError.create("Room Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedRoom = await Room.findOne({
                where: {
                    cwSpaceCwID: req.params.cwID,
                    roomID: req.params.ID
                }
            });
            if (updatedRoom) {
                let deleteOld = false
                if (req.body.imageName) { // there is a file
                    req.body.img = req.body.imageName
                    delete req.body.imageName
                    deleteOld = true
                } else if (req.body.img == '') { // the photo to be removed
                    deleteOld = true
                    req.body.img = null
                }
                await Room.update(req.body, {
                    where: {
                        cwSpaceCwID: req.params.cwID,
                        roomID: req.params.ID
                    }
                });
                if (deleteOld&&updatedRoom.img) {
                    const filePath = `./public/images/rooms/${updatedRoom.img}`
                    fs.unlink(filePath, () => { })
                }
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Room Updated Successfully" });
            }
            const error = appError.create("Room Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedRoom = await Room.findOne({
                where: {
                    cwSpaceCwID: req.params.cwID,
                    roomID: req.params.ID
                }
            });
            if (deletedRoom) {
                await Room.destroy({
                    where: {
                    cwSpaceCwID: req.params.cwID,
                    roomID: req.params.ID
                }
            })
            if (deletedRoom.img) {
                const filePath = `./public/images/rooms/${deletedRoom.img}`
                fs.unlink(filePath, () => { })
            }
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Room Deleted Successfully" });
            }
            const error = appError.create("Room Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
} 