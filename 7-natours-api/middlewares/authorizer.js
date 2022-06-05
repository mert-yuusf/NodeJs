const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {StatusCodes} = require("http-status-codes");


const AuthenticateUser = async (req, res, next) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
        res.status(StatusCodes.UNAUTHORIZED).send("Please login to continue");
        return;
    }
    const token = authHeaders.split(' ')[1]
    if (token && token !== 'null') {
        const currentUserId = jwt.verify(token, "secret").userId;
        const currentUser = await User.findOne({_id: currentUserId});
        req.currentUser = currentUser;
        next();
    } else {
        res.status(StatusCodes.UNAUTHORIZED).json({
            error: "Please login to continue"
        });
        return;
    }


}


module.exports = {AuthenticateUser}