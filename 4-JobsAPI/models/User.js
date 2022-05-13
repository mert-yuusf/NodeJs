const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the name'],
        minlength: 3,
        maxlength: 255
    },
    email: {
        type: String,
        required: [true, 'Please provide the name'],
        minlength: 3,
        maxlength: 255,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide the password'],
        minlength: 3,
        maxlength: 255
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});


UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


UserSchema.methods.getName = function () {
    return this.name;
}

UserSchema.methods.getEmail = function () {
    return this.email;
}

UserSchema.methods.createJwt = function () {
    return jwt.sign(
        { userId: this._id, email: this.getEmail(), name: this.getName() },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    );
}


UserSchema.methods.checkPassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}


module.exports = mongoose.model('User', UserSchema);