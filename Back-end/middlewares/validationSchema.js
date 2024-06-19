const { body } = require("express-validator") 

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
            .matches(/^\d{11}$/).withMessage('Must be a valid phone number')
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
            .matches(/^\d{11}$/).withMessage('Must be a valid phone number')
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

const cwSpaceSchema = () => {
    return [
        body("name")
            .notEmpty().withMessage("name is required"),
        body("address")
            .notEmpty().withMessage("address is required"),
        body("amenities").optional()
            .notEmpty().withMessage("amenities is required"),
        body("email").optional()
            .notEmpty().withMessage("email is required")
            .isEmail().withMessage('Must be a valid email address'),
        body("description")
            .notEmpty().withMessage("description is required"),
        body("phone")
            .notEmpty().withMessage("phone is required")
            .matches(/^\d{11}$/).withMessage('Must be a valid phone number'),
        body("openingTime")
            .notEmpty().withMessage("opening time is required")
            .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Must be a valid time format'),
        body("closingTime")
            .notEmpty().withMessage("closing time is required")
            .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Must be a valid time format'),
        body("ownerOwnerID")
            .notEmpty().withMessage("ownerID is required")
    ]
}

const cwSpaceUpdateSchema = () => {
    return [
        body("name").optional()
            .notEmpty().withMessage("name is required"),
        body("address").optional()
            .notEmpty().withMessage("address is required"),
        body("amenities").optional()
            .notEmpty().withMessage("amenities is required"),
        body("email").optional()
            .notEmpty().withMessage("email is required")
            .isEmail().withMessage('Must be a valid email address'),
        body("description").optional()
            .notEmpty().withMessage("description is required"),
        body("phone").optional()
            .notEmpty().withMessage("phone is required")
            .matches(/^\d{11}$/).withMessage('Must be a valid phone number'),
        body("openingTime").optional()
            .notEmpty().withMessage("opening time is required")
            .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Must be a valid time format'),
        body("closingTime").optional()
            .notEmpty().withMessage("closing time is required")
            .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Must be a valid time format')
    ]
}

const roomSchema = () => {
    return [
        body("type")
            .notEmpty().withMessage("type is required"),
        body("hourPrice")
            .notEmpty().withMessage("hour price is required")
            .isFloat({ min: 0 }).withMessage('Must be a positive number'),
        body("dayPrice")
            .notEmpty().withMessage("day price is required")
            .isFloat({ min: 0 }).withMessage('Must be a positive number'),
        body("minRoomSize")
            .notEmpty().withMessage("minimum room size is required")
            .isInt({ min: 1 }).withMessage('Must be a positive integer'),
        body("maxRoomSize")
            .notEmpty().withMessage("maximum room size is required")
            .isInt({ min: 1 }).withMessage('Must be a positive integer'),
        body("cwSpaceCwID")
            .notEmpty().withMessage("co-working space ID is required"),
        body("number")
            .notEmpty().withMessage("room number is required")
            .isInt({ min: 0 }).withMessage('Must be an integer')
    ]
}

const roomUpdateSchema = () => {
    return [
        body("type").optional()
            .notEmpty().withMessage("type is required"),
        body("hourPrice").optional()
            .notEmpty().withMessage("hour price is required")
            .isFloat({ min: 0 }).withMessage('Must be a positive number'),
        body("dayPrice").optional()
            .notEmpty().withMessage("day price is required")
            .isFloat({ min: 0 }).withMessage('Must be a positive number'),
        body("minRoomSize").optional()
            .notEmpty().withMessage("minimum room size is required")
            .isInt({ min: 1 }).withMessage('Must be a positive integer'),
        body("maxRoomSize").optional()
            .notEmpty().withMessage("maximum room size is required")
            .isInt({ min: 1 }).withMessage('Must be a positive integer'),
        body("number").optional()
            .notEmpty().withMessage("room number is required")
            .isInt({ min: 0 }).withMessage('Must be an integer')
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
    userPasswordSchema,
    cwSpaceSchema,
    cwSpaceUpdateSchema,
    roomSchema,
    roomUpdateSchema,
    validateOffer,
    validateUpdatedOffer,
    validateBook,
    validateEvent,
    validateFavourite
}