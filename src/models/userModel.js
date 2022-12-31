const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A user must have a username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "A password cannot be empty"],
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
