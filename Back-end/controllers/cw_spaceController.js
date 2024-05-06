const { Cw_space, Cw_spacePhoto, Room, Owner} = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validateUpdatedCw_space, validateCw_space } = require("../middlewares/validationSchema");
const generateJWT = require("../utils/generateJWT");
const {uploadToCloud, deleteFromCloud} = require('../utils/cloudinary');


module.exports = {
    create: asyncWrapper(
        async (req, res, next) => {
            const errors = validateCw_space(req)
            if(errors.length!==0){
                return res.status(400).json({status: httpStatusCode.ERROR, message: errors})
            }
            const owner = await Owner.findOne({
                    raw: true, where: {
                        ownerID: req.body.ownerOwnerID
                    }
            })
            if(!owner){
                const error = appError.create("This Owner doesn't exist", 400, httpStatusCode.ERROR)
                return next(error)
            }
            if (owner.cwSpaceCwID != null) {
                const error = appError.create("This Owner Has Already Co-working Space", 400, httpStatusCode.ERROR)
                return next(error)
            }
            await uploadToCloud(req, 'cw_spaces')
            let newCw_space = (await Cw_space.create(req.body)).get({ plain: true })
            if (newCw_space) {
                await Owner.update({cwSpaceCwID: newCw_space.cwID}, {where: {ownerID:newCw_space.ownerOwnerID}})
                const updatedOwner = await Owner.findOne({
                    raw: true, where: {
                        ownerID: newCw_space.ownerOwnerID
                    }
                })
                const token = await generateJWT(updatedOwner, process.env.ACCESS_TOKEN_PERIOD)
                return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Co-working Space is Created Successfully" , data:{ token }});
            }
            const error = appError.create("Unexpected Error, Try Again Later", 500, httpStatusCode.FAIL)
            return next(error)
        }
    ),
    getAll: asyncWrapper(
        async (req, res, next) => {
            let cw_spaces = await Cw_space.findAll({ raw: true })
            if (cw_spaces.length != 0) {
                let rooms = await Room.findAll({ 
                    raw: true,
                    where: {
                        type: "shared room"
                    }
                });
                if (rooms.length != 0) {
                    for (let i = 0; i < cw_spaces.length; i++) {
                        for (let j = 0; j < rooms.length; j++) {
                            if (cw_spaces[i].cwID == rooms[j].cwSpaceCwID) {
                                cw_spaces[i].price = rooms[j].hourPrice
                            }
                        }
                    }
                }
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: cw_spaces });
            }
            const error = appError.create("There Are No Available Co-working Spaces", 404, httpStatusCode.ERROR);
            await deleteFromCloud(('cw_spaces/'+updatedCw_space.imgName))
            return next(error);
        }
    ),
    getHome: asyncWrapper(
        async (req, res, next) => {
            const cw_spaceHome = await Cw_space.findAll({
                raw: true,
                where: {
                    home: "home"
                }
            })
            if (cw_spaceHome.length != 0) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: cw_spaceHome })
            }
            const error = appError.create("There Are No Available Co-working Spaces", 404, httpStatusCode.ERROR);
            return next(error)
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const cw_space = await Cw_space.findOne({
                where: {
                    cwID: req.params.ID
                }
            })
            if (cw_space) {
                return res.status(200).json({ status: httpStatusCode.SUCCESS, data: cw_space })
            }
            const error = appError.create("This Co-working Spaces Not Found", 404, httpStatusCode.ERROR);
            return next(error)
        }
    ),
    updatePhoto: asyncWrapper(
        async (req, res, next) => {
            console.log('entered updatePhoto')
            const updatedCw_space = await Cw_space.findOne({
                where: {
                    cwID: req.params.ID
                }
            })
            console.log(updatedCw_space.imgName)
            if (updatedCw_space) {
                if(updatedCw_space.imgName){
                    await deleteFromCloud(('cw_spaces/'+updatedCw_space.imgName))
                }
                await uploadToCloud(req, 'cw_spaces') 
                await Cw_space.update(req.body, {
                    where: {
                        cwID: req.params.ID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Co-working Space Updated Successfully" })
            }
            const error = appError.create("Co-Working Space Not Found", 404, httpStatusCode.ERROR);
            await deleteFromCloud(('cw_spaces/'+updatedCw_space.imgName))
            return next(error);
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            let errors = validateUpdatedCw_space(req)
            if (errors.length != 0) {
                const error = appError.create(errors, 400, httpStatusCode.ERROR)
                return next(error)
            }
            const updatedCw_space = await Cw_space.findOne({
                where: {
                    cwID: req.params.ID
                }
            });
            if (updatedCw_space) {
                delete req.body.imgName
                delete req.body.img
                await Cw_space.update(req.body, {
                where: {
                    cwID: req.params.ID
                }
                });
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Co-working Space Updated Successfully" });
            }
            const error = appError.create("Co-Working Space Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedCw_space = await Cw_space.findOne({
                where: {
                    cwID: req.params.ID
                }
            });
            if (deletedCw_space) {
                await deleteFromCloud('cw_spaces/'+deletedCw_space.imgName)
                let photos = await Cw_spacePhoto.findAll({
                    where: {
                        cwSpaceCwID: req.params.ID
                    }
                }, { raw: true })
                for (const photo of photos) {
                    await deleteFromCloud('cw_spaces/'+photo.imgName)
                }
                await Cw_spacePhoto.destroy({
                    where: {
                        cwSpaceCwID: req.params.ID
                    }
                })
                await Cw_space.destroy({
                    where: {
                        cwID: req.params.ID
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Co-working Space Deleted Successfully" })
            }
            const error = appError.create("Co-working Space Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
} 