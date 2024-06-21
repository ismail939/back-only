const { body } = require("express-validator") 

const isTimesValid = (times) => {
    if (times.length != 2) {
        throw new Error('Times array must contain exactly two elements');
    } else if (times[0] >= times[1] || times[0] > 23 || times[0] < 7 || times[1] > 23) {
        throw new Error('Times must be valid and in the range of 7-23');
    }
    return true;
}

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

const offerSchema = () => {
    return [
        body("title")
            .notEmpty().withMessage("title is required"),
        body("description")
            .notEmpty().withMessage("description is required"),
        body("start")
            .notEmpty().withMessage("start date is required")
            .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Must be a valid date format'),
        body("end")
            .notEmpty().withMessage("end date is required")
            .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Must be a valid date format'),
        body("cwSpaceCwID")
            .notEmpty().withMessage("co-working space ID is required")
    ]
}

const offerUpdateSchema = () => {
    return [
        body("title").optional()
            .notEmpty().withMessage("title is required"),
        body("description").optional()
            .notEmpty().withMessage("description is required"),
        body("start").optional()
            .notEmpty().withMessage("start date is required")
            .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Must be a valid date format'),
        body("end").optional()
            .notEmpty().withMessage("end date is required")
            .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Must be a valid date format')
    ]
}

const eventSchema = () => {
    return [
        body("name")
            .notEmpty().withMessage("name is required"),
        body("description")
            .notEmpty().withMessage("description is required"),
        body("start")
            .notEmpty().withMessage("start date is required")
            .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Must be a valid date format'),
        body("end")
            .notEmpty().withMessage("end date is required")
            .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Must be a valid date format'),
        body("price")
            .notEmpty().withMessage("price is required")
            .isFloat({ min: 0 }).withMessage('Must be a positive number'),
        body("maxCapacity")
            .notEmpty().withMessage("maximum capacity is required")
            .isInt({ min: 1 }).withMessage('Must be a positive integer'),
        body("description")
            .notEmpty().withMessage("description is required"),
        body("cwSpaceCwID")
            .notEmpty().withMessage("co-working space ID is required")
    ]
}

const eventUpdateSchema = () => {
    return [
        body("name").optional()
            .notEmpty().withMessage("name is required"),
        body("description").optional()
            .notEmpty().withMessage("description is required"),
        body("start").optional()
            .notEmpty().withMessage("start date is required")
            .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Must be a valid date format'),
        body("end").optional()
            .notEmpty().withMessage("end date is required")
            .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Must be a valid date format'),
        body("price").optional()
            .notEmpty().withMessage("price is required")
            .isFloat({ min: 0 }).withMessage('Must be a positive number'),
        body("maxCapacity").optional()
            .notEmpty().withMessage("maximum capacity is required")
            .isInt({ min: 1 }).withMessage('Must be a positive integer'),
        body("description").optional()
            .notEmpty().withMessage("description is required")
    ]
}

const moderatorSchema = () => {
    return [
        body("username")
            .notEmpty().withMessage("username is required"),
        body("password")
            .notEmpty().withMessage("password is required")
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage('Must contain at least one uppercase letter, one lowercase letter, and one number'),
        body("cwSpaceCwID")
            .notEmpty().withMessage("co-working space ID is required")
    ]
}

const moderatorPasswordSchema = () => {
    return [
        body("newPassword")
            .notEmpty().withMessage("password is required")
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).withMessage('Must contain at least one uppercase letter, one lowercase letter, and one number')
    ]
}

const bookSchema = () => {
    return [
        body("date")
            .notEmpty().withMessage("date is required")
            .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Must be a valid date format'),
        body("times")
            .notEmpty().withMessage("times is required")
            .custom(isTimesValid),
        body("payment")
            .notEmpty().withMessage("payment is required"),
        body("cardToken").optional()
            .notEmpty().withMessage("card token is required"),
        body("totalCost")
            .notEmpty().withMessage("total cost is required")
            .isFloat({ min: 0 }).withMessage('Must be a positive number'),
        body("clientClientID")
            .notEmpty().withMessage("client ID is required"),
        body("roomRoomID")
            .notEmpty().withMessage("room ID is required")
    ]
}

const registerSchema = () => {
    return [
        body("payment").optional()
            .notEmpty().withMessage("payment is required"),
        body("cardToken").optional()
            .notEmpty().withMessage("card token is required"),
        body("totalCost")
            .notEmpty().withMessage("total cost is required")
            .isFloat({ min: 0 }).withMessage('Must be a positive number'),
        body("clientClientID")
            .notEmpty().withMessage("client ID is required"),
        body("eventEventID")
            .notEmpty().withMessage("room ID is required")
    ]
}

const requestSchema = () => {
    return [
        body("numberOfPersons")
            .notEmpty().withMessage("number of persons is required")
            .isInt({ min: 1 }).withMessage('Must be a positive integer'),
        body("clientClientID")
            .notEmpty().withMessage("client ID is required"),
        body("roomRoomID")
            .notEmpty().withMessage("room ID is required")
    ]
}

module.exports = {
    userSchema, userUpdateSchema, userPasswordSchema,
    cwSpaceSchema, cwSpaceUpdateSchema,
    roomSchema, roomUpdateSchema,
    offerSchema, offerUpdateSchema,
    eventSchema, eventUpdateSchema,
    moderatorSchema, moderatorPasswordSchema,
    bookSchema,
    registerSchema,
    requestSchema
}