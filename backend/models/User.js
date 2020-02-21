const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');


//user schema
const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: {type: String, required: [true, "Please enter a username"]},
    email: {type: String, required: [true, "Please enter an email address"]},
}, {timestamps: true});

//userSchema.plugin(uniqueValidator, {message: "is already taken."});


const user = mongoose.model('User', userSchema);

module.exports = {user};
