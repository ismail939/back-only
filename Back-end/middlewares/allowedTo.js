const httpStatusCode = require("../utils/httpStatusText");
const appError = require("../utils/appError");

module.exports = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.currentUser.role)) {
            const error = appError.create("This Role is Not Authorized", 401, httpStatusCode.ERROR);
            return next(error);
        }
        next()
    }
}
