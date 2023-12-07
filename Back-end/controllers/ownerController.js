const Sequelize = require('sequelize');
const { Owner } = require('../models/modelIndex');
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validateUser , validateUpdatedUser} = require("../middlewares/validationSchema");


module.exports ={
    getAll: asyncWrapper(
        async (req, res, next) => {
            const owners = await Owner.findAll()
            if (owners.length != 0) {
                return res.json({ status: httpStatusCode.SUCCESS, data: owners })
            }
            const error = appError.create("There Are NO Available Owners", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const owner = await Owner.findOne({
                raw: true, where: {
                    username: req.params.username
                }
            })
            if (owner) {
                return res.json({ status: httpStatusCode.SUCCESS, data: owner })
            }
            const error = appError.create("Owner Not Found", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    addPhoto: asyncWrapper(
        async (req, res, next) => {
            if(req.body.imageName==undefined||req.body.img==null){
                const error = appError.create("There is NO Images Provided", 400, httpStatusCode.ERROR);
                return next(error);
            }
            req.body.profilePic = req.body.imageName;
            delete req.body.imageName;
            const updatedOwner = await Owner.findOne({
                where: {
                    username: req.params.username
                }
            })
            if (updatedOwner) {
                await Owner.update(req.body, {
                where: {
                    username: req.params.username
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Owner Updated Successfully" })
            }
            const error = appError.create("Owner Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    login: asyncWrapper(
        async (req, res, next) => {
            const owner = await Owner.findOne({
                raw: true, where: {
                    username: req.body.username,
                    password: req.body.password
                }
            })
            if (owner) {
                return res.json({ status: httpStatusCode.SUCCESS, data: owner })
            }
            const error = appError.create("Username or Password is Incorrect", 404, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            let errors = validateUser(req)
            if (errors.length != 0) {
                const error = appError.create(errors, 400, httpStatusCode.ERROR)
                return next(error)
            }
            const duplicates = await Owner.findOne({
                raw: true, where: {
                    [Sequelize.Op.or]: [
                        { username: req.body.username },
                        { email: req.body.email }
                    ]
                }
            })
            if (duplicates) {
                const error = appError.create("Duplicate Data Not Allowed", 400, httpStatusCode.ERROR)
                return next(error)
            }

            const newOwner = await Owner.create(req.body)
            if(newOwner){
                return res.json({ status: httpStatusCode.SUCCESS, message: "Owner is Created Successfully" })
            }
            const error = appError.create("Unexpected Error, Try Again Later", 400, httpStatusCode.ERROR)
            return next(error)
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            let errors = validateUpdatedUser(req);
            console.log(errors)
            if (errors.length != 0) {
                console.log(errors)
                const error = appError.create(errors, 400, httpStatusCode.ERROR)
                return next(error)
            }
            const updatedOwner = await Owner.findOne({
                where: {
                    username: req.params.username
                }
            })
            if (updatedOwner) {
                await Owner.update(req.body, {
                where: {
                    username: req.params.username
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Owner Updated Successfully" })
            }
            const error = appError.create("Owner Not Found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedOwner = await Owner.findOne({
                where: {
                    username: req.params.username
                }
            });
            if (deletedOwner) {
                await Owner.destroy({
                    where: {
                        username: req.params.username
                    }
                })
                return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "Owner Deleted Successfully" })     
            }
            const error = appError.create("Owner Not Found", 404, httpStatusCode.ERROR)
            return next(error);
        }
    )
} 