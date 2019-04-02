var mongoose = require('mongoose');

// this is heruko conncection
//var db = mongoose.connect('mongodb://');
 var db = mongoose.connect('mongodb://normaluser:web5610@ds221416.mlab.com:21416/heroku_wc90b4tr');
 var mongo_url = process.env.MONGO_URL || "mongodb://localhost:27017/web5610"

module.exports = db;
