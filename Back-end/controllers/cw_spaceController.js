const { Cw_space, Cw_spacePhone, Cw_spacePhoto } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validationResult } = require("express-validator");



module.exports = {
    get: asyncWrapper(
        async (req, res, next) => {
            let cw_spaces = await Cw_space.findAll({ raw: true })
            const cw_spacePhones = await Cw_spacePhone.findAll();
            for (let i = 0; i < cw_spaces.length; i++) {
                cw_spaces[i].phones = []
                for (let j = 0; j < cw_spacePhones.length; j++) {
                    if (cw_spaces[i].cwID == cw_spacePhones[j].cwSpaceCwID) {
                        cw_spaces[i].phones.push(cw_spacePhones[j].phone)
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
                raw:true,
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
            cw_space[0].phones=[]
            cw_spacePhones.forEach(phone => {
                cw_space[0].phones.push(phone.phone)
            });
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_space })
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            let errors = validationResult(req);
            if (!errors.isEmpty()) {
                errors = errors.array()
                let errorsList = []
                for (let i = 0; i < errors.length; i++) {
                    errorsList.push(errors[i].msg)
                }
                return res.status(400).json({ status: httpStatusCode.ERROR, errors: errorsList });
            }
            let newCw_space = await Cw_space.create(req.body.data)
            newCw_space = await Cw_space.findAll({ raw: true, where:{ cwID: newCw_space.cwID }})
            newCw_space = newCw_space[0]
            let newCw_spacePhone = null;
            let newCw_spacePhoneList = []

            for (let i = 0; i < req.body.phones.length; i++) {
                newCw_spacePhone = await Cw_spacePhone.create({ phone: req.body.phones[i], cwSpaceCwID: newCw_space.cwID })
                newCw_spacePhoneList.push(newCw_spacePhone.phone)
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