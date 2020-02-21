const express = require('express');
const mongoose = require('mongoose');
const user = require('./models/User.js').user;
const url = require('url');
const fs = require('fs');

const file = JSON.parse(fs.readFileSync('./password.json', 'utf8'));
const pass = encodeURI(file.password);
const uri = `mongodb+srv://collinmurch:${pass}@cluster0-vqk4j.mongodb.net/test?retryWrites=true&w=majority`;

const port = process.env.port || 8080;
const app = express();

const Tom = new user({name: 'Tom', surname: 'Tommert', username: 'tom12',
    email: 'tomtommert@northwestern.edu'});

app.get('/', (req, res) => {
    res.send('<b>Hello world</b>');

    Tom.save().then(() => {
        console.log("saved");
     });
});

app.put('/adduser', (req, res) => {

});

app.listen(port, () => console.log(`App listening on port ${port}!`))

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

// Cat.deleteMany({ name: 'Zildjian' }, (err) => {
//     if(err) console.log(err);
//     console.log("Successful deletion");
// });
