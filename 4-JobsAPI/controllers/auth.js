const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
/*
    - Validate name,email,password with mongoose
    - Hash Password (using bcryptojs)
    - Create token
    - Send response with token
*/
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide name, email , and password' })
        return;
    }
    const newUser = await User.create({ ...req.body });
    // this method will be called from from models/User.js
    const token = newUser.createJwt();
    res.status(StatusCodes.CREATED).json({
        token: token
    });
};


const login = async (req, res) => {
    const { email, password } = { ...req.body };
    // check if email and password are provided
    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide email , and password' })
        return;
    }

    // find user depends on provided email
    const user = await User.findOne({ email: email });

    if (!user) {
        // if user is exists and email is valid
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'this email is not registered please create new account or try again' })
        return;
    } else {
        // compare password
        const isCorrectPassword = await user.checkPassword(password);
        if (!isCorrectPassword) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: 'password is wrong please check it and try again' })
            return;
        } else {
            // if password is correct and email is valid
            // generate token from user email
            const token = user.createJwt();
            res.status(StatusCodes.OK).json({
                name: user.getName(),
                token: token
            })
        }
    };
}

module.exports = {
    register,
    login
}