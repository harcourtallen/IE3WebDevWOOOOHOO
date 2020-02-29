const express = require('express');
var cookieParser = require('cookie-parser')
const queryString = require('query-string');

const googleHelper = require('./googleHelper');

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 3000;

const url = googleHelper.urlGoogle();

app.get('/', (req, res) => {
    res.send(`<a href="${url}">Login with Google</a>`)
});

app.get('/callback', (req, res) => {
    console.log(req.query);
    googleHelper.getTokenFromCode(req.query.code).then((tokens) => {
        console.log(tokens);
        const encoded = Buffer.from(tokens.access_token).toString('base64');

        // Could also set refresh token
        res.cookie('token', encoded).redirect('/authenticated');
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/authenticated', (req, res) => {
    console.log(req.cookies);
    token = Buffer.from(req.cookies.token, 'base64');

    googleHelper.getEmailFromId(token).then((data) => {
        res.send(`Hello ${data.name}!\nYour email is ${data.email}.`)
    }).catch((err) => {
        console.log(err);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
