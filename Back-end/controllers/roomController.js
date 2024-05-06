const { Room } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const Sequelize = require('sequelize')
const { validateRoom } = require('../middlewares/validationSchema');
const {uploadToCloud, deleteFromCloud} = require('../utils/cloudinary');


module.exports = {
    create: asyncWrapper(
        async (req, res, next) => {
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
            const errors = validateRoom(req)
            if(errors.length!==0){
                return res.status(400).json({status: httpStatusCode.ERROR, message: errors})
            }
            await uploadToCloud(req, 'rooms')
            const newRoom = await Room.create(req.body)
            if (newRoom) {
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Room Created Successfully" });
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
                let imgAdded = false
                if (req.file) { // there is a file
                    await deleteFromCloud(('rooms/'+updatedRoom.imgName))
                    await uploadToCloud(req, 'rooms')
                    imgAdded = true
                }
                if(!imgAdded){
                    delete req.body.img
                    delete req.body.imgName
                }
                await Room.update(req.body, {
                    where: {
                        roomID: req.params.ID,
                        cwSpaceCwID: req.params.cwID
                    }
                })
                return res.json({ status: httpStatusCode.SUCCESS, message: "Room Updated Successfully" });            }
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
            if (deletedRoom.imgName) {
                deleteFromCloud(('rooms/'+deletedRoom.imgName))
            }
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Room Deleted Successfully" });
            }
            const error = appError.create("Room Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
} 