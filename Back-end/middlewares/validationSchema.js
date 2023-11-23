const { body } = require('express-validator')

const isValidTimeFormat = (timeString) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString)

const validateClient = () => {
    return [
        body("data.fname").notEmpty().withMessage("first name is required"),
        body("data.lname").notEmpty().withMessage("last name is required"),
        body("data.username").notEmpty().withMessage("username is required"),
        body("data.email").notEmpty().withMessage("email is required").isEmail().withMessage("not in email format"),
        body("data.password").notEmpty().withMessage("password is required"),
        body("data.profilePic").optional(),
        body("data.phone").notEmpty().withMessage("phone is required"),
    ];
}

const validateCwSpace = () => {
    return [
        body('data.name').notEmpty().withMessage("name is required"),
        body("data.email").optional().isEmail().withMessage("not in email format"),
        body('data.address').notEmpty().withMessage("address is required"),
        body("data.fbPage").optional().isURL().withMessage("not url"),
        body("data.openingTime").notEmpty().withMessage("openingTime is required").custom((value) => isValidTimeFormat(value)).withMessage("not in time format"),
        body("data.closingTime").notEmpty().withMessage("closingTime is required").custom((value) => isValidTimeFormat(value)).withMessage("not in time format"),
        body("data.description").notEmpty().withMessage("description is required"),
        body("data.mainPhoto").optional(),
        body("phones").isArray().withMessage("phones is required")
    ];
}

module.exports = {
    validateClient,
    validateCwSpace,
    
}