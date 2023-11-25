// const { body } = require('express-validator')
const validator = require('../utils/validators')
const isValidTimeFormat = (timeString) => /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString)
const httpStatusCode = require("../utils/httpStatusText");
const appError = require('../utils/appError');

const validateCw_space = (req) => {
    let data = req.body.data
    let phones = req.body.phones
    console.log(data)
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
    
    return errors
}

module.exports = {
    validateCw_space
}