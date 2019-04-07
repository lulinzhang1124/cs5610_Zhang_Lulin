var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
 var url = 'mongodb://localhost:27017/web5610';
 //var url = 'mongodb://normaluser:web5610@ds221416.mlab.com:21416/heroku_wc90b4tr';
 var mongo_url = process.env.MONGO_URL || "mongodb://localhost:27017/web5610";
var client = mongoose.connect(url, { useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
