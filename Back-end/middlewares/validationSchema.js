const { body } = require("express-validator") 

const validators = require("../utils/validators");
const validator = require("../utils/validators");

const userSchema = () => {
    return [
        body("fname")
            .notEmpty().withMessage("first name is required"),
        body("lname")
            .notEmpty().withMessage("last name is required"),
        body("username")
            .notEmpty().withMessage("username is required"),
        body("email")
            .notEmpty().withMessage("email is required")
            .isEmail().withMessage('Must be a valid email address'),
        body("password")
            .notEmpty().withMessage("password is required")
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage('Must contain at least one uppercase letter, one lowercase letter, and one number'),
        body("phone")
            .notEmpty().withMessage("phone is required")
            .matches(/^\d{10}$/).withMessage('Must be a valid phone number')
    ]
}

const userUpdateSchema = () => {
    return [
        body("fname").optional()
            .notEmpty().withMessage("first name is required"),
        body("lname").optional()
            .notEmpty().withMessage("last name is required"),
        body("username").optional()
            .notEmpty().withMessage("username is required"),
        body("email").optional()
            .notEmpty().withMessage("email is required")
            .isEmail().withMessage('Must be a valid email address'),
        body("password").optional()
            .notEmpty().withMessage("password is required")
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage('Must contain at least one uppercase letter, one lowercase letter, and one number'),
        body("phone").optional()
            .notEmpty().withMessage("phone is required")
            .matches(/^\d{10}$/).withMessage('Must be a valid phone number')
    ]
}

const userPasswordSchema = () => {
    return [
        body("reset")
            .notEmpty().withMessage("reset is required")
            .isBoolean().withMessage('Must be a boolean value'),
        body("newPassword")
            .notEmpty().withMessage("password is required")
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage('Must contain at least one uppercase letter, one lowercase letter, and one number')
    ]
}

const validateOffer = (req) => {
    let data = req.body
    let errors = []
    if (validator.isEmpty(data.title)) {
        errors.push("Offer Title is Required");
    }

    if (validator.isEmpty(data.description)) {
        errors.push("Offer Description is Required");
    }

    if (validator.isEmpty(data.start)) {
        errors.push("Offer Start Date is Required");
    } else {
        if (!validator.isDate(data.start)) {
            errors.push('Offer Start Date Not in Date Format')
        }
    }

    if (validator.isEmpty(data.end)) {
        errors.push("Offer End Date is Required");
    } else {
        if (!validator.isDate(data.end)) {
            errors.push('Offer End Date Not in Date Format')
        }
    }

    return errors
}

const validateUpdatedOffer = (req) => {
    let data = req.body
    let errors = []

    if (data.title) {
        if (validator.isEmpty(data.title)) {
            errors.push("Offer Title is empty");
        }
    }

    if (data.description) {
        if (validator.isEmpty(data.description)) {
            errors.push("Offer Description is empty");
        }
    }

    if (data.start) {
        if (validator.isEmpty(data.start)) {
            errors.push("Offer Start Date is empty");
        } else if (!validator.isDate(data.start)) {
            errors.push('Offer Start Date Not in Date Format')
        }
    }

    if (data.end) {
        if (validator.isEmpty(data.end)) {
            errors.push("Offer End Date is empty");
        } else if (!validator.isDate(data.end)) {
            errors.push('Offer End Date Not in Date Format')
        }
    }

    return errors
}

const validateRoom = (req) => {
    let data = req.body
    let errors = []
    if (validator.isEmpty(data.type)) {
        errors.push("Room Type is Required");
    }

    if (validator.isEmpty(data.hourPrice)) {
        errors.push("Room HourPrice is Required");
    }
    else if (validator.isNotNumber(data.hourPrice)) {
        errors.push("Room HourPrice Not in Price Format")
    }

    if (validator.isEmpty(data.dayPrice)) {
        errors.push("Room DayPrice is Required");
    }
    else if (validator.isNotNumber(data.dayPrice)) {
        errors.push("Room DayPrice Not in Price Format")
    }

    if (validator.isEmpty(data.minRoomSize)) {
        errors.push("Minimum Room Size is Required");
    }
    else if (validator.isNotNumber(data.minRoomSize)) {
        errors.push("Minimum Room Size Not in Number Format")
    }

    if (validator.isEmpty(data.maxRoomSize)) {
        errors.push("Maximum Room Size is Required");
    }
    else if (validator.isNotNumber(data.maxRoomSize)) {
        errors.push("Maximum Room Size Not in Number Format")
    }

    if (validator.isEmpty(data.cwSpaceCwID)) {
        errors.push("Co-working Space ID is Required");
    }
    else if (validator.isNotNumber(data.cwSpaceCwID)) {
        errors.push("Co-working Space ID Not in Number Format");
    }

    if (validator.isEmpty(data.number)) {
        errors.push("Room Number is Required");
    }
    else if (validator.isNotNumber(data.number)) {
        errors.push("Room Number Not in Number Format")
    }

    return errors
}

const validateUpdatedRoom = (req) => {
    let data = req.body
    let errors = []
    if (data.type) {
        if (validator.isEmpty(data.type)) {
            errors.push("Room Type is empty");
        }
    }

    if (data.hourPrice) {
        if (validator.isEmpty(data.hourPrice)) {
            errors.push("Room HourPrice is empty");
        }
        else if (validator.isNotNumber(data.hourPrice)) {
            errors.push("Room HourPrice Not in Price Format")
        }
    }

    if (data.dayPrice) {
        if (validator.isEmpty(data.dayPrice)) {
            errors.push("Room DayPrice is empty");
        }
        else if (validator.isNotNumber(data.dayPrice)) {
            errors.push("Room DayPrice Not in Price Format")
        }
    }
    if (data.minRoomSize) {
        if (validator.isEmpty(data.minRoomSize)) {
            errors.push("Minimum Room Size is empty");
        }
        else if (validator.isNotNumber(data.minRoomSize)) {
            errors.push("Minimum Room Size Not in Number Format")
        }
    }
    if (data.maxRoomSize) {
        if (validator.isEmpty(data.maxRoomSize)) {
            errors.push("Maximum Room Size is empty");
        }
        else if (validator.isNotNumber(data.maxRoomSize)) {
            errors.push("Maximum Room Size Not in Number Format")
        }
    }
    if (data.cwSpaceCwID) {
        if (validator.isEmpty(data.cwSpaceCwID)) {
            errors.push("Co-working Space ID is empty");
        }
        else if (validator.isNotNumber(data.cwSpaceCwID)) {
            errors.push("Co-working Space ID Not in Number Format");
        }
    }
    if (data.number) {
        if (validator.isEmpty(data.number)) {
            errors.push("Room Number is empty");
        }
        else if (validator.isNotNumber(data.number)) {
            errors.push("Room Number Not in Number Format")
        }
    }

    return errors
}

const validateCw_space = (req) => {
    let data = req.body
    let errors = []
    if (validator.isEmpty(data.name)) {
        errors.push('Co-working Space Name is Required')
    }

    if (validator.isEmpty(data.phone)) {
        errors.push('Co-working Space phone is Required')
    }

    if (!validator.isEmpty(data.email)) {
        if (!validator.isEmail(data.email)) {
            errors.push("Co-working Space Email Not in Email Format")
        }
    }

    if (validator.isEmpty(data.address)) {
        errors.push("Co-working Space Address is Required");
    }

    if (!validator.isEmpty(data.fbPage)) {
        if (!validator.isURL(data.fbPage)) {
            errors.push("Co-working Space fbPage Not in URL Format");
        }
    }

    if (validator.isEmpty(data.openingTime)) {
        errors.push("Co-working Space Opening Time is Required");
    } else {
        if (!validator.isTime(data.openingTime)) {
            errors.push("Co-working Space Opening Time Not in Time Format");
        }
    }

    if (validator.isEmpty(data.closingTime)) {
        errors.push("Co-working Space Closing Time is Required");
    } else {
        if (!validator.isTime(data.closingTime)) {
            errors.push("Co-working Space Closing Time Not in Time Format");
        }
    }

    if (validator.isEmpty(data.description)) {
        errors.push("Co-working Space Description is Required");
    }

    if (validator.isEmpty(data.phone)) {
        errors.push("Co-working Space Phone Number is Required");
    }
    return errors
}

const validateUpdatedCw_space = (req) => {
    let data = req.body
    let errors = []

    if (data.name) {
        if (validator.isEmpty(data.name)) {
            errors.push('Co-working Space name is empty')
        }
    }

    if (data.email) {
        if (validator.isEmpty(data.email)) {
            errors.push("Email field is empty")
        }
        else if (!validator.isEmail(data.email)) {
            errors.push("Co-working Space Email Not in email format")
        }
    }
    if (data.address) {
        if (validator.isEmpty(data.address)) {
            errors.push("Co-working Space Address is empty");
        }
    }

    if (data.fbPage) {
        if (validator.isEmpty(data.fbPage)) {
            errors.push("Co-working Space fbPage is empty");
        } else if (!validator.isURL(data.fbPage)) {
            errors.push("Co-working Space fbPage Not in URL Format");
        }
    }

    if (data.openingTime) {
        if (validator.isEmpty(data.openingTime)) {
            errors.push("Co-working Space Opening Time is empty");
        } else if (!validator.isTime(data.openingTime)) {
            errors.push("Co-working Space Opening Time not in Time Format");
        }
    }


    if (data.closingTime) {
        if (validator.isEmpty(data.closingTime)) {
            errors.push("Co-working Space closing Time is empty");
        } else if (!validator.isTime(data.closingTime)) {
            errors.push("Co-working Space closing Time not in Time Format");
        }
    }

    if (data.description) {
        if (validator.isEmpty(data.description)) {
            errors.push("Co-working Space Description is empty");
        }
    }

    if (data.phones) {
        if (validator.isEmpty(data.phones)) {
            errors.push("Co-working Space phone number is empty");
        }
    }
    return errors
}

const validateBook= (req) => {
    let data = req.body
    let errors = []
    if(validator.isEmpty(data.date)){
        errors.push("date is empty")
    }else if(!validator.isDate(data.date)){
        errors.push("date not in date format")
    }

    if(validator.isEmpty(data.times)){
        errors.push("times is empty")
    }else if(!validator.isTimes(data.times)){
        errors.push("times not in times format")
    }

    
    if(validator.isEmpty(data.payment)){
        errors.push("Payment is empty")
    }// we check if it is cash or visa or whatever.

    let typesAllowed=['event', 'room']
    if(validator.isEmpty(data.type)){
        errors.push("Type is empty")
    }else if(!typesAllowed.includes(data.type)){
        errors.push("Not a valid type")
    }

    if(validator.isEmpty(data.totalCost)){
        errors.push("Total Cost is empty")
    }else if(validator.isNotNumber(data.totalCost)){
        errors.push("totalCost not in number format")
    }

    if(validator.isEmpty(data.clientClientID)){
        errors.push("clientClientID is empty")
    }else if(validator.isNotNumber(data.clientClientID)){
        errors.push("clientClientID not in number format")
    }

    if(validator.isEmpty(data.roomRoomID)){
        errors.push("roomRoomID is empty")
    }else if(validator.isNotNumber(data.roomRoomID)){
        errors.push("roomRoomID not in number format")
    }
    return errors
}

const validateEvent = (req) => {
    let data = req.body
    let errors = []
    if (validator.isEmpty(data.name)) {
        errors.push("Event Name is Required");
    }

    if (validator.isEmpty(data.start)) {
        errors.push("Event Start Date is Required");
    } else {
        if (!validator.isDate(data.start)) {
            errors.push('Event Start Date Not in Date Format')
        }
    }

    if (validator.isEmpty(data.end)) {
        errors.push("Event End Date is Required");
    } else {
        if (!validator.isDate(data.end)) {
            errors.push('Event End Date Not in Date Format')
        }
    }

    if (validator.isEmpty(data.price)) {
        errors.push("Event price is Required");
    }
    else if (validator.isNotNumber(data.price)) {
        errors.push("Event price Not in Price Format")
    }

    if (validator.isEmpty(data.maxCapacity)) {
        errors.push("Maximum Capacity is Required");
    }
    else if (validator.isNotNumber(data.maxCapacity)) {
        errors.push("Maximum Capacity Not in Number Format");
    }
    if (validator.isEmpty(data.description)) {
        errors.push("Description is Required");
    }

    return errors
}

const validateFavourite = (req) =>{
    let data = req.body
    let errors = []

    if(validator.isEmpty(data.clientClientID))
    {
        errors.push("clientClientID is required")
    }else if(validator.isNotNumber(data.clientClientID)){
        errors.push("clientClientID not in number format")
    }

    if(validator.isEmpty(data.cwSpaceCwID))
    {
        errors.push("cwSpaceCwID is required")
    }else if(validator.isNotNumber(data.cwSpaceCwID)){
        errors.push("cwSpaceCwID not in number format")
    }
    return errors
}

module.exports = {
    userSchema,
    userUpdateSchema,
    validateCw_space,
    validateUpdatedCw_space,
    validateRoom,
    validateUpdatedRoom,
    validateOffer,
    validateUpdatedOffer,
    validateBook,
    validateEvent,
    validateFavourite
}