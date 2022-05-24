const User = require("../models/User")
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils")

const register = async (req, res) => {
    const { email, password, name } = req.body;

    // check duplicated accounts
    const emailAlreadyExists = await User.findOne({ email });

    if (emailAlreadyExists) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: "This user has account" });
        return;
    }

    // first user will be an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const user = await User.create({ email, name, password, role });

    // setup token
    const tokenUser = { name: user.name, userId: user._id, role: user.role }
    attachCookiesToResponse({ res: res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
}


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Please provide email and password' });
        return;
    }

    const alreadyExistsUser = await User.findOne({ email });

    if (!alreadyExistsUser) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid Credentials' });
        return;
    }

    const isCorrectPassword = await alreadyExistsUser.comparePassword(password);

    if (!isCorrectPassword) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Invalid Credentials' });
        return;
    }


    const tokenUser = { name: alreadyExistsUser.name, userId: alreadyExistsUser._id, role: alreadyExistsUser.role }
    attachCookiesToResponse({ res: res, user: tokenUser });
    res.status(StatusCodes.CREATED).json({ user: tokenUser });
}

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 5 * 1000)
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out' });
}

module.exports = {
    register,
    login,
    logout
}