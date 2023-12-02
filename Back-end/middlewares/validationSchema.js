const validator = require('../utils/validators')

const validateUser = (req) => {
    let data = req.body
    let errors = []
    if(validator.isEmpty(data.fname)){
        errors.push("first name is required"); 
    }

    if(validator.isEmpty(data.lname)){
        errors.push("last name is required"); 
    }

    if(validator.isEmpty(data.username)){
        errors.push("username is required"); 
    }

    if(validator.isEmpty(data.email)){
        errors.push('email is required') 
    } else {
        if(!validator.isEmail(data.email)){
            errors.push('not in email format')
        }
    }

    if(validator.isEmpty(data.password)){
        errors.push("password is required"); 
    }

    if(validator.isEmpty(data.phone)){
        errors.push("phone is required"); 
    }

    return errors
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