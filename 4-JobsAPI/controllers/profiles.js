const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const allProfiles = async (req, res) => {
    const currentUser = await User.findOne({ _id: req.currentUser.userId });
    if (currentUser.isAdmin) {
        const users = await User.find();
        res.status(StatusCodes.OK).json({ users });
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'this for admin only' });
    }
}


module.exports = {
    allProfiles
}