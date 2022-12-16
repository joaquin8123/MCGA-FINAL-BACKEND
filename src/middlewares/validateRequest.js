const jwt = require('jsonwebtoken');
const sendResponse = require('../helper/sendResponse');
const User = require('../models/User')
require('dotenv').config()

const validateToken = async (req, res, next) => {
    try {
        const { token } = req.headers;

        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded.userId)
        if (token !== user.token) {
            return sendResponse(res, 'INVALID_TOKEN', 401)
        }
        next()
    } catch (error) {
        return sendResponse(res, 'VALIDATE_TOKEN_ERROR', 401, { error })
    }
}

module.exports = validateToken