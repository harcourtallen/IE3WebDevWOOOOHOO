const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: {type: String, required: [true, "Please enter a username"]},
    email: {type: String, required: [true, "Please enter an email address"]},
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
