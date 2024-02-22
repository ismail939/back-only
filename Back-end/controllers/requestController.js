const { Request, Client, Room } = require("../models/modelIndex");
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const sequelize = require("sequelize");

module.exports = {
    create: asyncWrapper(
        async (req, res, next) => {
            const newRequest = await Request.create(req.body)
            if (newRequest) {
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Submitted Successfully" })
            }
            const error = appError.create("Unexpected Error, Try Again Later", 400, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            const requests = await Request.findAll({ raw: true });
            if (requests.length != 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: requests });
            }
            const error = appError.create("There are No Available Requests", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getCw_spaceRequests: asyncWrapper(
        async (req, res, next) => {
            const rooms = await Room.findAll({
                where: {
                    cwSpaceCwID: req.params.cwSpaceID
                }
            })
            let roomsIDs = []
            for (let index = 0; index < rooms.length; index++) {
                roomsIDs.push(rooms[index].roomID)
            }
            const requests = await Request.findAll({
                where: {
                    roomRoomID:{[sequelize.Op.in]: roomsIDs}
                }
            })
            if (requests.length != 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: requests });
            }
            const error = appError.create("There are No Available Requests", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedRequest = await Request.findOne({
                where: {
                    clientClientID: req.params.clientID,
                    roomRoomID : req.params.roomID
                }
            });
            if (updatedRequest) {
                await Request.update(req.body, {
                where: {
                    clientClientID: req.params.clientID,
                    roomRoomID : req.params.roomID
                }
                });
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Request Updated Successfully" });
            }
            const error = appError.create("Request Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedRequest = await Request.findOne({
                where: {
                    clientClientID: req.params.clientID,
                    roomRoomID : req.params.roomID
                }
            });
            if (deletedRequest) {
                await Request.destroy({
                where: {
                    clientClientID: req.params.clientID,
                    roomRoomID : req.params.roomID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Request Deleted Successfully" });
            }
            const error = appError.create("Request Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
} 