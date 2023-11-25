const { body } = require('express-validator')

const isValidTimeFormat = (timeString) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString)

const validationSchema = () => {
    return [
        body('data.name').notEmpty().withMessage("name is required"),
        body("data.email").optional().isEmail().withMessage("not in email format"),
        body('data.address').notEmpty().withMessage("address is required"),
        body("data.fbPage").optional().isURL().withMessage("not url"),
        body("data.openingTime").notEmpty().withMessage("description is required").custom((value) => isValidTimeFormat(value)).withMessage("not in time format"),
        body("data.closingTime").notEmpty().withMessage("closingTime is required").custom((value) => isValidTimeFormat(value)).withMessage("not in time format"),
        body("data.description").notEmpty().withMessage("description is required"),
        body("data.mainPhoto").optional(),
        body("phones").isArray().withMessage("phones is required")
    ];
}


module.exports = {
    validationSchema
}