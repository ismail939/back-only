const { Request, Client, Room } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");

//not complete and may have some issues
module.exports = {
    create: asyncWrapper(
        async (req, res, next) => {
            const request = await Request.findOne({
                where: {
                    clientClientID: req.body.clientClientID,
                    cwSpaceCwID: req.body.cwSpaceCwID
                }
            })
            if (request) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "You have Already Requested this Co-working Space" })
            }
            const client = await Client.findOne({
                where: {
                    clientID : req.body.clientClientID
                }
            })
            const cw_space = await Cw_space.findOne({
                where: {
                    cwID: req.body.cwSpaceCwID
                }
            })
            if (client && cw_space) {
                const newRequest = await Request.create(req.body);
                if (newRequest) {
                    return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Request is Created Successfully" });
                }
            }
            const error = appError.create("Client or Co-working Space does not exist", 400, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            const requests = await Request.findAll()
            if (requests.length != 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: requests });
            }
            const error = appError.create("There are No Available Requests", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getCw_spaceRequests: asyncWrapper(
        async (req, res, next) => {
            let requests = await Request.findAll({
                raw: true, where: {
                    cwSpaceCwID: req.params.cwSpaceID
                }
            }, { raw: true })
            if (requests.length != 0) {
                for (let i = 0; i < requests.length; i++) {
                    let client = await Client.findOne({
                        raw: true, where: {
                            clientID: requests[i].clientClientID
                        }
                    })
                    requests[i].name = client.fname + " " + client.lname
                    requests[i].profilePic = client.profilePic
                    }
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: requests });
            }
            const error = appError.create("There are No Available Requests", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const request = await Request.findOne({
                where: {
                    clientClientID: req.params.clientID,
                    cwSpaceCwID: req.params.cwSpaceID
                }
            })
            if (request) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: request })
            }
            const error = appError.create("Request Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedRequest = await Request.findOne({
                where: {
                    clientClientID: req.params.clientID,
                    cwSpaceCwID: req.params.cwSpaceID
                }
            });
            if (updatedRequest) {
                await Request.update(req.body, {
                where: {
                    clientClientID: req.params.clientID,
                    cwSpaceCwID: req.params.cwSpaceID
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
                    cwSpaceCwID: req.params.cwSpaceID
                }
            });
            if (deletedRequest) {
                await Request.destroy({
                where: {
                    clientClientID: req.params.clientID,
                    cwSpaceCwID: req.params.cwSpaceID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Request Deleted Successfully" });
            }
            const error = appError.create("Request Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
} 
