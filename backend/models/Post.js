const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');
import user from 'models/User.js';

const postSchema = new postSchema({
    //id:
    clubName: String,
    date: {type: Date, required: true},
    user: {type: user, required: true},
    about: {type: Text, required: true},
    category: {type: [String], required: true},
    location: {type: PostalAddress, required: true},
    image: URL
})