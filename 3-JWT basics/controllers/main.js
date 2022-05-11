const asyncWrapper = require("../middlewares/asyncWarper");
const jwt = require("jsonwebtoken");

const login = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ msg: 'username and password are required!' })
        return;
    }
    const id = "1";
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({ msg: 'user created', token });
});

const dashboard = async (req, res) => {
    const randNumber = Math.ceil(Math.random() * 100);
    res.status(200).json({ msg: `hi ${req.currentUser.username} your lucky random number is ${randNumber}` });
};

module.exports = {
    login,
    dashboard
}