const { Room } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const Sequelize = require('sequelize')
const fs = require('fs')

module.exports = {
    get: asyncWrapper(
        async (req, res, next) => {
            const rooms = await Room.findAll()
            if (rooms.length === 0) {
                const error = appError.create("Rooms not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: rooms });
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const room = await Room.findAll({
                where: {
                    roomID: req.params.ID
                }
            })
            if (room.length === 0) {
                const error = appError.create("Room not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: room })
        }
    ),
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
                const error = appError.create("Duplicate data", 400, httpStatusCode.ERROR)
                return next(error)
            }
            const newRoom = await Room.create(req.body)
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newRoom });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedRoom = await Room.findOne({
                where: {
                    roomID: req.params.ID
                }
            });
            if (!updatedRoom) {
                const error = appError.create("Room not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
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
                    roomID: req.params.ID
                }
            });
            if (deleteOld&&updatedRoom.img) {
                const filePath = `./public/images/rooms/${updatedRoom.img}`
                fs.unlink(filePath, () => { })
            }
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedRoom = await Room.findOne({
                where: {
                    roomID: req.params.ID
                }
            });
            if (!deletedRoom) {
                const error = appError.create("Room not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Room.destroy({
                where: {
                    roomID: req.params.ID
                }
            })
            if (deletedRoom.img) {
                const filePath = `./public/images/rooms/${deletedRoom.img}`
                fs.unlink(filePath, () => { })
            }
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 