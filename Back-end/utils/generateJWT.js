const jwt = require("jsonwebtoken")

module.exports = async (payload, period) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: period })
    return token
}