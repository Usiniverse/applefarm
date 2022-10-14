const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    userId: String,
    nickname: String,
    email: String,
    password: String || Number,
    confirmPassword: String || Number,
    phoneNumber: String || Number,
});

userSchema.pre("save", function (next) {
    const user = this;

    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    }
});


const user = mongoose.model("User", userSchema);

module.exports.user = user;