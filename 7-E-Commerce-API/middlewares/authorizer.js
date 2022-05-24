const {isValidToken} = require("../utils");
const {StatusCodes} = require("http-status-codes");

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({msg: "Sorry no token provided"})
    } else {
        try {
            const {name, userId, role} = isValidToken({token: token});
            // const payload = isValidToken({token: token});
            req.user = {name, userId, role};
            next();
        } catch (e) {
            console.log(e)
        }
    }
}


// const authorizePermissions = (req, res, next) => {
//     const user = req.user;
//     const {role} = user;
//     if (role !== 'admin') {
//         res.status(StatusCodes.UNAUTHORIZED).json({msg: "Unauthorized, only for admins"});
//         return;
//     }
//
//     next();
// }
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        const {role} = req.user;
        if (!roles.includes(role)){
            res.status(StatusCodes.UNAUTHORIZED).json({msg: "Unauthorized, only for admins"});
            return;
        }
        next();
    }
}
module.exports = {authenticateUser, authorizePermissions}