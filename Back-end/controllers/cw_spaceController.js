const { Cw_space, Cw_spacePhone, Cw_spacePhoto } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");



module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const cw_spaces = await Cw_space.findAll()
            if (cw_spaces.length === 0) {
                const error = appError.create("Cw_spaces not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            const cw_spacePhones = await Cw_spacePhone.findAll()
            if (cw_spacePhones.length === 0) {
                const error = appError.create("Cw_spacePhones not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_spaces, cw_spacePhones: cw_spacePhones, cw_spacePhotos:cw_spacePhotos}); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const cw_space = await Cw_space.findAll({
                where: {
                    cwID: req.params.ID
                }
            })
        
            const cw_spacePhones = await Cw_spacePhone.findAll({
                where: {
                    cw_SpaceCwID:req.params.ID
                }
            })
            if (cw_spacePhones.length === 0) {
                const error = appError.create("Cw_spacePhones not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            const cw_spacePhotos = await Cw_spacePhoto.findAll({
                where: {
                    cw_SpaceCwID:req.params.ID
                }
            })
            if (cw_spacePhotos.length === 0) {
                const error = appError.create("Cw_spacePhotos not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: cw_space }) 
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            const newCw_space = await Cw_space.create(req.body.data)
            let newCw_spacePhone=null;
            let newCw_spacePhoneList=[]
            for(let i=0;i<req.body.phones.length;i++){
                newCw_spacePhone = await Cw_spacePhone.create({phone:req.body.phones[i], cwSpaceCwID:newCw_space.cwID})
                newCw_spacePhoneList.push(newCw_spacePhone)
            }
            return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newCw_space , phones: newCw_spacePhoneList});
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