const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3
    },
    email: {
        type: String,
        required: [true, "Please provide valid email."],
        validate: [validator.isEmail, "Please provide valid email."],
        unique: [true, "For each email you can make one account"]
    },
    photo: {
        type: String,
        default: "photo.png"
    },
    password: {
        type: String,
        required: [true, "Please provide valid password"],
        minlength: 6,
        maxlength: 24
    },
    passwordConfirm: {
        type: String,
        required: [true, "Passwords must be same"],
        minlength: 6,
        maxlength: 24,
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Please provide same passwords to continue"
        }
    },
    role: {
        type: String,
        enum:{
          values:["admin","user"],
          message: "{VALUE} is not valid"
        },
        default: "user"
    },
})

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;
    next();
});

UserSchema.methods.generateToken = function () {
    return jwt.sign({userId: this._id}, "secret", {
        expiresIn: "1d"
    })
}

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
}


module.exports = mongoose.model("User", UserSchema);