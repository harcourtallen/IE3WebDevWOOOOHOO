var express = require('express');
var bodyParser  = require('body-parser');

var port = 5000;

const app = express();

app.use(express.static(__dirname + '/public'))
.use(bodyParser.urlencoded({ extended: true }))
.use(bodyParser.json());

app.get('/',function(req,res){
    console.log("redirecting to foo.html");
    res.redirect('/foo.html');
});

app.get('/readdata',function(req,res){
    res.send('You just sent a get request!');
});

app.post('/writedata', function(req,res){
    console.log("Got your data!" + JSON.stringify(req.body));
    // do stuff with the data
    res.send("your name is " + req.body.name);
});

app.listen(port, () => console.log(`Node.js web server at port ${port} is running..`)); //3 - listen for any incoming requests

