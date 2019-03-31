var mongoose = require('mongoose');

// this is heruko conncection
//var db = mongoose.connect('mongodb://');
 var db = mongoose.connect('mongodb://localhost:27017/web5610');

module.exports = db;
