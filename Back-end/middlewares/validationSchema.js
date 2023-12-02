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
        errors.push("Offer Title is Required"); 
    }

    if(validator.isEmpty(data.description)){
        errors.push("Offer Description is Required"); 
    }

    if(validator.isEmpty(data.start)){
        errors.push("Offer Start Date is Required"); 
    } else {
        if(!validator.isDate(data.start)){
            errors.push('Offer Start Date Not in Date Format')
        }
    }
    
    if(validator.isEmpty(data.end)){
        errors.push("Offer End Date is Required"); 
    } else {
        if(!validator.isDate(data.end)){
            errors.push('Offer End Date Not in Date Format')
        }
    }

    return errors
}

const validateRoom = (req) => {
    let data = req.body
    let errors = []
    if(validator.isEmpty(data.type)){
        errors.push("Room Type is Required"); 
    }

    if(validator.isEmpty(data.hourPrice)){
        errors.push("Room HourPrice is Required"); 
    }
    else if(validator.isNotNumber(data.hourPrice)){
        errors.push("Room HourPrice Not in Price Format")
    }

    if(validator.isEmpty(data.dayPrice)){
        errors.push("Room DayPrice is Required"); 
    }
    else if(validator.isNotNumber(data.dayPrice)){
        errors.push("Room DayPrice Not in Price Format")
    }
    
    if(validator.isEmpty(data.minRoomSize)){
        errors.push("Minimum Room Size is Required"); 
    }
    else if(validator.isNotNumber(data.minRoomSize)){
        errors.push("Minimum Room Size Not in Number Format")
    }

    if(validator.isEmpty(data.maxRoomSize)){
        errors.push("Maximum Room Size is Required"); 
    }
    else if(validator.isNotNumber(data.maxRoomSize)){
        errors.push("Maximum Room Size Not in Number Format")
    }

    if(validator.isEmpty(data.cwSpaceCwID)){
        errors.push("Co-working Space ID is Required"); 
    }
    else if(validator.isNotNumber(data.cwSpaceCwID)){
        errors.push("Co-working Space ID Not in Number Format");
    }

    if(validator.isEmpty(data.number)){
        errors.push("Room Number is Required"); 
    }
    else if(validator.isNotNumber(data.number)){
        errors.push("Room Number Not in Number Format")
    }
    
    return errors
}

const validateCw_space = (req) => {
    let data = req.body
    let errors = []
    if(validator.isEmpty(data.name)){
        errors.push('Co-working Space Name is Required') 
    }

    if(!validator.isEmpty(data.email)){
        if(!validator.isEmail(data.email)){
            errors.push("Co-working Space Email Not in Email Format")
        }
    }

    if(validator.isEmpty(data.address)){
        errors.push("Co-working Space Address is Required"); 
    }

    if(!validator.isEmpty(data.fbPage)){
        if(!validator.isURL(data.fbPage)){
            errors.push("Co-working Space fbPage Not in URL Format");
        }
    }

    if(validator.isEmpty(data.openingTime)){
        errors.push("Co-working Space Opening Time is Required"); 
    } else {
        if(!validator.isTime(data.openingTime)){
            errors.push("Co-working Space Opening Time Not in Time Format");
        }
    }

    if(validator.isEmpty(data.closingTime)){
        errors.push("Co-working Space Closing Time is Required"); 
    } else {
        if(!validator.isTime(data.closingTime)){
            errors.push("Co-working Space Closing Time Not in Time Format");
        }
    }

    if(validator.isEmpty(data.description)){
        errors.push("Co-working Space Description is Required"); 
    }

    if (validator.isEmpty(data.phones)) {
        errors.push("Co-working Space Phone Number is Required");
    }
    return errors
}

module.exports = {
    validateUser,
    validateCw_space,
    validateOffer,
    validateRoom
}