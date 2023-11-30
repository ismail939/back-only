const { Cw_space, Cw_spacePhone, Cw_spacePhoto, Room } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const {validateCw_space} = require('../middlewares/validationSchema')

module.exports = {
    get: asyncWrapper(
        async (req, res, next) => {
            let cw_spaces = await Cw_space.findAll({ raw: true })
            const cw_spacePhones = await Cw_spacePhone.findAll();
            let rooms = await Room.findAll({
                raw: true,
                where: {
                    type: "shared room"
                }
            });
            for (let i = 0; i < cw_spaces.length; i++) {
                cw_spaces[i].phones = []
                for (let j = 0; j < cw_spacePhones.length; j++) {
                    if (cw_spaces[i].cwID == cw_spacePhones[j].cwSpaceCwID) {
                        cw_spaces[i].phones.push(cw_spacePhones[j].phone)
                    }
                }
                cw_spaces[i].prices = []
                for (let j = 0; j < rooms.length; j++) {
                    if (cw_spaces[i].cwID == rooms[j].cwSpaceCwID) {
                        cw_spaces[i].prices.push(rooms[j].hourPrice)
                        delete rooms[j]
                    }
                }
            }
            if (cw_spaces.length === 0) {
                const error = appError.create("Co-working spaces not found", 404, httpStatusCode.ERROR);
                return next(error);
            }

            if (cw_spacePhones.length === 0) {
                const error = appError.create("Cw_spacePhones not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_spaces });
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const cw_space = await Cw_space.findAll({
                raw: true,
                where: {
                    cwID: req.params.ID
                }
            })
            const cw_spacePhones = await Cw_spacePhone.findAll({
                where: {
                    cwSpaceCwID: req.params.ID
                }
            })
            if (cw_spacePhones.length === 0) {
                const error = appError.create("Cw_spacePhones not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            // const cw_spacePhotos = await Cw_spacePhoto.findAll({
            //     where: {
            //         cwSpaceCwID: req.params.ID
            //     }
            // })
            // if (cw_spacePhotos.length === 0) {
            //     const error = appError.create("Cw_spacePhotos not found", 404, httpStatusCode.ERROR);
            //     return next(error);
            // }
            cw_space[0].phones = []
            cw_spacePhones.forEach(phone => {
                cw_space[0].phones.push(phone.phone)
            });
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_space })
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            console.log(req.body)
            let errors = validateCw_space(req)
            if (errors.length!=0) {    
                return res.status(400).json({ status: httpStatusCode.ERROR, errors: errors});
            }
            let newCw_space = (await Cw_space.create({
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                fbPage: req.body.fbPage,
                openingTime: req.body.openingTime,
                closingTime: req.body.closingTime,
                description: req.body.description,
                rate: req.body.rate,
                mainPhoto: req.body.imageName
            })).get({ plain: true })
            let newCw_spacePhone = null;
            let newCw_spacePhoneList = req.body.phones.split(',')
            for (let i = 0; i < newCw_spacePhoneList.length; i++) {
                newCw_spacePhone = await Cw_spacePhone.create({ phone: newCw_spacePhoneList[i], cwSpaceCwID: newCw_space.cwID })
            }
            newCw_space.phones = newCw_spacePhoneList
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newCw_space });
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedCw_space = await Cw_space.findAll({
                where: {
                    cwID: req.params.ID
                }
            });
            if (updatedCw_space.length === 0) {
                const error = appError.create("cw_space not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Cw_space.update(req.body, {
                where: {
                    cwID: req.params.ID
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedCw_space = await Cw_space.findAll({
                where: {
                    cwID: req.params.ID
                }
            });
            if (deletedCw_space.length === 0) {
                const error = appError.create("cw_space not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Cw_space.destroy({
                where: {
                    cwID: req.params.ID
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 