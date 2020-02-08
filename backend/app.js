const mongoose = require('mongoose');

const url = require('url');
const fs = require('fs');
const file = JSON.parse(fs.readFileSync('./password.json', 'utf8'));


const pass = encodeURI(file.password);

const uri = `mongodb+srv://collinmurch:${pass}@cluster0-vqk4j.mongodb.net/test?retryWrites=true&w=majority`;

console.log(uri);

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));

console.log("Testing.")

// Cat.deleteMany({ name: 'Zildjian' }, (err) => {
//     if(err) console.log(err);
//     console.log("Successful deletion");
// });
