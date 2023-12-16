const validator = require('../utils/validators')

const validateUser = (req) => {
    let data = req.body
    let errors = []
    if (validator.isEmpty(data.fname)) {
        errors.push("first name is required");
    }

    if (validator.isEmpty(data.lname)) {
        errors.push("last name is required");
    }

    if (validator.isEmpty(data.username)) {
        errors.push("username is required");
    }

    if (validator.isEmpty(data.email)) {
        errors.push('email is required')
    } else {
        if (!validator.isEmail(data.email)) {
            errors.push('not in email format')
        }
    }
    if (validator.isEmpty(data.password)) {
        errors.push("password is required");
    }

    if (validator.isEmpty(data.phone)) {
        errors.push("phone is required");
    }
    return errors
}

const validateUpdatedUser = (req) => {
    let data = req.body
    let errors = []
    if (data.fname) {
        if (validator.isEmpty(data.fname))
            errors.push("first name is empty");
    }

    if (data.lname) {
        if (validator.isEmpty(data.lname))
            errors.push("last name is empty");
    }

    if (data.username) {
        if (validator.isEmpty(data.username))
            errors.push("username is empty");
    }

    if (data.email) {
        if (validator.isEmpty(data.email))
            errors.push('email is empty')
        else if (!validator.isEmail(data.email)) {
            errors.push('not in email format')
        }
    }
    if (data.password) {
        if (validator.isEmpty(data.password))
            errors.push("password is empty");
    }

    if (data.phone) {
        if (validator.isEmpty(data.phone))
            errors.push("phone is empty");
    }
    return errors
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

module.exports = {
    validateUser,
    validateUpdatedUser,
    validateCw_space,
    validateUpdatedCw_space,
    validateRoom,
    validateUpdatedRoom,
    validateOffer,
    validateUpdatedOffer
}