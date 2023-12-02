const Sequelize = require('sequelize');
const { Owner } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const { validationResult } = require("express-validator");


module.exports ={
    get: asyncWrapper(
        async (req, res, next) => {
            const owners = await Owner.findAll()
            if (owners.length === 0) {
                const error = appError.create("Owners not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            return res.json({ status: httpStatusCode.SUCCESS, data: owners }); 
        }
    ),
    getOne: asyncWrapper(
        async (req, res, next) => {
            const owner = await Owner.findOne({
                raw: true, where: {
                    username: req.params.username
                }
            })
            if (Owner) {
                return res.json({ status: httpStatusCode.SUCCESS, data: owner })
            }
            return res.status(404).json({ status: httpStatusCode.ERROR, message: "Username or password are incorrect"})

        }
    ),
    login: asyncWrapper(
        async (req, res, next) => {
            const owner = await Owner.findAll({
                raw: true, where: {
                    username: req.body.data.username,
                    password: req.body.data.password
                }
            })
            if (Owner) {
                return res.json({ status: httpStatusCode.SUCCESS, data: owner })
            }
            return res.status(404).json({ status: httpStatusCode.ERROR, message: "Username or password are incorrect"})

        }
    ),
    create: asyncWrapper(
        async (req, res, next) => {
            let errors = validationResult(req);
            const duplicates = await Owner.findOne({
                raw: true, where: {
                    [Sequelize.Op.or]: [
                        { username: req.body.data.username },
                        { email: req.body.data.email }
                    ]
                }
            })
            
            if (!errors.isEmpty() || duplicates) {
                let errorsList = []
                if (errors.isEmpty()) {
                    errorsList.push("Duplicate data");
                } else {
                    errors = errors.array()
                    for (let i = 0; i < errors.length; i++) {
                        errorsList.push(errors[i].msg)
                    }
                }
                return res.status(400).json({ status: httpStatusCode.ERROR, errors: errorsList });
            }

            const newOwner = await Owner.create(req.body.data)
            if(newOwner){
                return res.json({ status: httpStatusCode.SUCCESS, message: "Owner is created successfully" })
            }
            return res.json({ status: httpStatusCode.ERROR , message: "There is something wrong with the inputs"})
        }
    ),
    update: asyncWrapper(
        async (req, res, next) => {
            const updatedOwner = await Owner.findAll({
                where: {
                    username: req.params.username
                }
            });
            if (updatedOwner.length === 0) {
                const error = appError.create("Owner not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Owner.update(req.body, {
                where: {
                    username: req.params.username
                }
            });
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "updated successfully" });
        }
    ),  
    delete: asyncWrapper(
        async (req, res, next) => {
            const deletedOwner = await Owner.findAll({
                where: {
                    username: req.params.username
                }
            });
            if (deletedOwner.length === 0) {
                const error = appError.create("Owner not found", 404, httpStatusCode.ERROR);
                return next(error);
            }
            await Owner.destroy({
                where: {
                    username: req.params.username
                }
            })
            return res.status(200).json({ status: httpStatusCode.SUCCESS, message: "deleted successfully" });
        }
    )
} 