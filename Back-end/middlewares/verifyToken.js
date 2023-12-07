const jwt = require("jsonwebtoken")
const httpStatusCode = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization']

    if (!authHeader) {
        const error = appError.create("Token is Required", 401, httpStatusCode.ERROR)
        return next(error)
    }

    const token = authHeader.split(' ')[1]
    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        next()
    } catch (err) {
        const error = appError.create("Session Expired", 401, httpStatusCode.ERROR)
        return next(error)
    }
    
    
}

module.exports = verifyToken