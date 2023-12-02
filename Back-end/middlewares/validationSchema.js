const { body } = require('express-validator')
const validator = require('../utils/validators')

const validateUser = () => {
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

const validateOffer = (req) => {
    let data = req.body
    let errors = []
    if(validator.isEmpty(data.title)){
        errors.push("title is required"); 
    }

    if(validator.isEmpty(data.description)){
        errors.push("description is required"); 
    }

    if(validator.isEmpty(data.start)){
        errors.push("start date is required"); 
    }
    
    if(validator.isEmpty(data.end)){
        errors.push("end is required"); 
    }

    return errors
}

const validateCw_space = (req) => {
    let data = req.body
    let errors = []
    if(validator.isEmpty(data.name)){
        errors.push('name is required') 
    }

    if(!validator.isEmpty(data.email)){
        if(!validator.isEmail(data.email)){
            errors.push("not in email format")
        }
    }

    if(validator.isEmpty(data.address)){
        errors.push('address is required') 
    }

    if(!validator.isEmpty(data.fbPage)){
        if(!validator.isURL(data.fbPage)){
            errors.push("not in url format")
        }
    }

    if(validator.isEmpty(data.openingTime)){
        errors.push('openingTime is required') 
    } else {
        if(!validator.isTime(data.openingTime)){
            errors.push('not in time format')
        }
    }

    if(validator.isEmpty(data.closingTime)){
        errors.push('closingTime is required') 
    } else {
        if(!validator.isTime(data.closingTime)){
            errors.push('not in time format')
        }
    }

    if(validator.isEmpty(data.description)){
        errors.push('description is required') 
    }

    if (validator.isEmpty(data.phones)) {
        errors.push("phone is required");
    }
    return errors
}

module.exports = {
    validateUser,
    validateCw_space,
    validateOffer
}