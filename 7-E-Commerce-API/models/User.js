const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 255
    },

    email: {
        type: String,
        required: [true, 'Please provide email'],
        minlength: 3,
        maxlength: 255,
        validate: {
            message: 'Please provide valid email',
            validator: validator.isEmail
        },
        // match: [
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //     'Please provide a valid email'
        // ],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Please provide the password'],
        minlength: 3,
        maxlength: 255
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});


UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);