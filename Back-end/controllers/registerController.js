
const { Register, Event, Client } = require('../models/modelIndex')
const httpStatusCode = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { validationResult } = require("express-validator");


module.exports = {
    getEventRegisters: asyncWrapper(
        async (req, res, next) => {
            let registers = await Register.findAll({
                raw: true, where: {
                    eventEventID: req.params.eventID }
                
            })
            if (registers.length != 0) {
                for (let index = 0; index < registers.length; index++) {
                    let clientClientID = registers[index].clientClientID
                    let client = await Client.findOne({
                        raw: true, where: {
                            clientID: clientClientID
                        }
                    })
                    registers[index].username = client.username
                }
                return res.json({ status: httpStatusCode.SUCCESS, data: registers });
            }
            const error = appError.create("Registers not found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    ),
    register: asyncWrapper(
        async (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const error = appError.create(errors.array(), 400, httpStatusCode.ERROR)
                return next(error);
            }
            const event = await Event.findOne({
                raw: true, where: {
                    eventID: req.body.eventEventID
            }})
            if (event) {
                if (event.capacity < event.maxCapacity) {
                    if (req.body.payment === 'cash') {
                        await Register.create(req.body);
                    } else if (req.body.payment === 'visa') {
                        stripe.charges.create({
                            amount: req.body.totalCost * 100, // Amount in cents
                            currency: 'usd',
                            source: req.body.cardToken, // Use a test card token
                            description: 'Test Payment',
                            }, async function(err, charge) {
                            if (err) {
                                return next(err)
                            } else {
                                req.body.status = 'paid'
                                await Register.create(req.body);
                            }
                        });
                    }
                    return res.status(201).json({ status: httpStatusCode.SUCCESS, message: "Created Successfully" });
                }
                const error = appError.create("There is no available slots", 404, httpStatusCode.ERROR);
                return next(error);
            }
            const error = appError.create("Event not found", 404, httpStatusCode.ERROR);
            return next(error);
        }
    )
} 