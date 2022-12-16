const User = require('../models/User')
const sendResponse = require('../helper/sendResponse')
const SALT_ROUNDS = 10;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const register = async (req, res) => {
    let { user, password } = req.body;
    bcrypt.hash(password, SALT_ROUNDS, async (error, hash) => {
        if (error) sendResponse(res, 'HASH_ERROR', 500, { data: error });

        const userExists = await User.findOne({ user });
        if (userExists) return sendResponse(res, 'USER_EXISTS', 401, { data: error });

        user = new User({
            user,
            password: hash
        });

        return user
            .save()
            .then((user) => sendResponse(res, 'REGISTER_SUCCESS', 201, { data: user }))
            .catch((error) => sendResponse(res, 'REGISTER_ERROR', 500, { data: error }));
    })
};

const login = async (req, res) => {
    let { user: userInput, password } = req.body;
    User.findOne({ user: userInput })
        .exec()
        .then((user)  => {
            if (!user) return sendResponse(res, 'UNEXISTENT_USER', 401);
            if (!user.active) return sendResponse(res, 'INACTIVE_USER', 401);
            bcrypt.compare(password, user.password, async(error, result) => {
                if (error) return sendResponse(res, 'LOGIN_ERROR', 401, { data: error });
                if (result) {
                    const token = jwt.sign({ userId: user._id.toString() }, process.env.JWT_KEY, { expiresIn: '1h' })
                    const userUpdated = await User.findOneAndUpdate({ user: userInput }, { token })
                    return sendResponse(res, 'LOGIN_SUCCESS', 200, {
                        userId: userUpdated._id,
                        token: token
                    })
                } else return sendResponse(res, 'INCORRECT_PASSWORD', 401, { data: error });
            });
        })
        .catch((error) => sendResponse(res, 'LOGIN_ERROR', 500, { data: error }));
};

module.exports = {
    register,
    login
};