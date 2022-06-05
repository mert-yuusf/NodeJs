const {StatusCodes} = require("http-status-codes");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
    try {
        const {email, password, passwordConfirm} = req.body;
        const alreadyExistsUser = await User.findOne({email: email});
        if (alreadyExistsUser) {
            res.status(StatusCodes.BAD_REQUEST).json({err: "This user already has account try to login."})
        }

        if (password !== passwordConfirm) {
            res.status(StatusCodes.BAD_REQUEST).json({err: "Failed to confirm password, please make them same"})
        }
        const isFirstAccount = (await User.countDocuments({}) === 0);
        const role = isFirstAccount ? "admin" : "user";
        console.log(role);
        const newUser = await User.create(req.body);
        const token = jwt.sign(
            {userId: newUser._id},
            'secret',
            {expiresIn: "1d"}
        );
        res.status(StatusCodes.OK).json({token});
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).json({e});
    }
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const existsUser = await User.findOne({email: email}).select(["email", "password"]);
    if (!existsUser) {
        res.status(StatusCodes.BAD_REQUEST).json({
            err: "Please signup first"
        })
    }
    const isCorrect = await bcrypt.compare(password, existsUser.password);

    if (!isCorrect) {
        res.status(StatusCodes.UNAUTHORIZED).json({err: 'Unauthorized password'})
        return;
    }
    const token = existsUser.generateToken()
    const currentUserId = jwt.verify(token, "secret");
    req.currentUser = await User.findOne({_id: currentUserId.userId});
    res.status(StatusCodes.OK).json(
        {currentUser: req.currentUser, token: token}
    );
}

const logout = async (req, res) => {
    req.headers.authorization = null;
    req.currentUser = null;
    res.send("logout")
}

module.exports = {
    signup,
    login,
    logout
}