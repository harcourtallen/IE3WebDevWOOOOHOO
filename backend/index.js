const MongoClient = require('mongodb').MongoClient;

const fs = require('fs');
const file = JSON.parse(fs.readFileSync('./password.json', 'utf8'));
const url = require('url');

const pass = encodeURI(file.password);

const uri = `mongodb+srv://collinmurch:${pass}@cluster0-vqk4j.mongodb.net/test?retryWrites=true&w=majority`;

console.log(uri);

// replace the uri string with your connection string.
MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
   if (err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
        return;
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});
