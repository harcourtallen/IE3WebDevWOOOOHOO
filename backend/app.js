const url = require('url');
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/User.js');

const file = JSON.parse(fs.readFileSync('./password.json', 'utf8'));
const pass = encodeURI(file.password);
const uri = `mongodb+srv://collinmurch:${pass}@cluster0-vqk4j.mongodb.net/test?retryWrites=true&w=majority`;

const port = process.env.port || 8080;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use((req, res, next) => {
    console.log(`Instruction recieved: ${req.method}`);
    next();
});

router.get('/', (req, res) => {
    res.json({message: 'Hello world!'});
});

// General functions
router.route('/user')
    .post((req, res) => {
        const user = new User();
        user.username = req.body.username;
        user.email = req.body.email

        user.save().then((err) => {
            if (err)
                res.send(err);
            else
                res.json({message: "User created"});
        }).catch((err) => {
            console.log(err);
        });
    })
    .get((req, res) => {
        User.find((err, users) => {
            if (err)
                res.send(err);
            else
                res.json(users);
        })
    });

// Functions by id
router.route('/user/:user_id')
    .get((req, res) => {
        User.findById(req.params.user_id, (err, user) => {
            if (err)
                res.send(err);
            else
                res.json(user);
        });
    })
    .put((req, res) => {
        User.findById(req.params.user_id, (err, user) => {
            if (err)
                res.send(err);
            else {
                user.username = req.body.username;
                user.email = req.body.email;
            }

            user.save((err) => {
                if (err)
                    res.send(err);
                else
                    res.json({ message: 'User updated' });
            });

        });
    })
    .delete((req, res) => {
        User.deleteOne({
            _id: req.params.user_id
        }, (err, bear) => {
            if (err)
                res.send(err);
            else
                res.json({ message: 'User deleted' });
        });
    });

app.use('/api', router);

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
app.listen(port, () => console.log(`App listening on port ${port}!`));
