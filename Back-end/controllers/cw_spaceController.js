const { Cw_space, Cw_spacePhone, Cw_spacePhoto, Room } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validationResult } = require("express-validator");
const path = require('path')
const fs = require('fs')


function generateRandomName(baseName, length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomName = baseName;

    for (let i = 0; i < length; i++) {
        const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
        randomName += randomCharacter;
    }

    return randomName;
}





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

                    console.log("🚀 ~ file: cw_spaceController.js:35 ~ cw_spaces[i]:", cw_spaces[i])
                }
            }
            if (cw_spaces.length === 0) {
                const error = appError.create("Cw_spaces not found", 404, httpStatusCode.ERROR);
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
            // let errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     errors = errors.array()
            //     let errorsList = []
            //     for (let i = 0; i < errors.length; i++) {
            //         errorsList.push(errors[i].msg)
            //     }
            //     return res.status(400).json({ status: httpStatusCode.ERROR, errors: errorsList });
            // }
            // let newCw_space = await Cw_space.create(req.body.data)
            // newCw_space = await Cw_space.findAll({ raw: true, where: { cwID: newCw_space.cwID } })
            // newCw_space = newCw_space[0]
            // let newCw_spacePhone = null;
            // let newCw_spacePhoneList = []

            // for (let i = 0; i < req.body.phones.length; i++) {
            //     newCw_spacePhone = await Cw_spacePhone.create({ phone: req.body.phones[i], cwSpaceCwID: newCw_space.cwID })
            //     newCw_spacePhoneList.push(newCw_spacePhone.phone)
            // }

            // newCw_space.phones = newCw_spacePhoneList
            
            // const baseFilename = new Date()
            // const randomImageName = generateRandomName(baseFilename)
            // console.log("🚀 ~ file: cw_spaceController.js:112 ~ randomImageName:", randomImageName)
            // // console.log(req)
            // console.log(req.files, req.body)
            return res.json("succeded")
            // console.log(req.body.mainPhoto)
            // const {imageData, extension} = req.body.mainPhoto 
            // console.log("🚀 ~ file: cw_spaceController.js:126 ~ extension:", extension)
            // // Remove the data:image/png;base64 prefix
            // const base64Data = imageData.replace(/^data:image\/png|jpg;base64,/, '');
            // const filename = randomImageName+extension
            // // Specify the path to the folder where you want to save the image
            // const filePath = path.join(__dirname, 'images', filename);

            // // Save the image to the specified folder
            // fs.writeFile(filePath, base64Data, 'base64', (err)=>{
            //     console.log('saving to folder failed')
            // })
            // req.body.data.mainPhoto = filename
            // // return res.status(201).json({ status: httpStatusCode.SUCCESS, data: newCw_space });
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