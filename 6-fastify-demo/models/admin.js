const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


AdminSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});




AdminSchema.methods.createToken = async function () {
    return jwt.sign(
        { userId: this._id },
        'secret_key',
        { expiresIn: '30d' }
    )
}


AdminSchema.methods.verifyToken = async function (token) {

}

AdminSchema.checkPassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

module.exports = mongoose.model('Admin', AdminSchema);