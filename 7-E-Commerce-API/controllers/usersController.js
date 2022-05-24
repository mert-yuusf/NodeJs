const User = require("../models/User")
const {StatusCodes} = require("http-status-codes");
const {attachCookiesToResponse} = require("../utils");

const getAllUsers = async (req, res) => {
    const users = await User.find({role: "user"}).select("-password")
    res.status(StatusCodes.OK).json({users});
};

const getOneUser = async (req, res) => {
    const user = await User.findOne({_id: req.params.id}).select("-password");
    if (!user) {
        res.status(StatusCodes.BAD_REQUEST).json({msg: "not Found"});
        return;
    }
    res.status(StatusCodes.OK).json({user});
}

const getCurrentUser = async (req, res) => {
    const user = req.user;
    res.status(StatusCodes.OK).json({user})
}

const updateOneUser = async (req, res) => {
    const {email, name} = req.body;
    if (!email || !name) {
        res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide email and password"})
        return;
    }
    const user = await User.findOneAndUpdate(
        {_id: req.user.userId},
        {email, name},
        {new: true, overwrite: true}
    );
    const tokenUser = {name: user.name, userId: user._id, role: user.role}
    attachCookiesToResponse({res: res, user: tokenUser});
    res.status(StatusCodes.OK).json({user})
}

const updateUserPassword = async (req, res) => {
    const {oldPassword, newPassword} = req.body;
    if (!oldPassword || !newPassword) {
        res.status(StatusCodes.BAD_REQUEST).json({msg: "Please provide old and new password."})
        return;
    }
    const user = await User.findOne(req.userId);

    const isCorrect = await user.comparePassword(oldPassword)
    if (!isCorrect) {
        res.status(StatusCodes.BAD_REQUEST).json({msg: "old password is wrong please check it again."})
        return;
    }

    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({msg: "password has updated."})
}

module.exports = {
    getAllUsers,
    getOneUser,
    getCurrentUser,
    updateOneUser,
    updateUserPassword
}