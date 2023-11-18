const { Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");

module.exports = {
    get: asyncWrapper(
        async (req, res, next) => {
            const client = await Client.findOne({
                raw: true, where: {
                    username: req.body.data.username,
                    password: req.body.data.password
                }
            })
            if (client) {
                return res.json({ status: httpStatusCode.SUCCESS, data: client })
            }
            return res.status(404).json({ status: httpStatusCode.ERROR, message: "Username or password are incorrect"})

        }
    ),
    create: asyncWrapper(
        async (req, res, next)=>{
            const client = await Client.create(req.body.data)
            if(client){
                return res.json({ status: httpStatusCode.SUCCESS, message: "Client is created successfully" })
            }
            return res.json({ status: httpStatusCode.ERROR , message: "There is something wrong with the inputs"})
        }
    )
}