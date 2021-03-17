const config = require("../config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = config.dbConfig.URL;
db.User = require('./users')(mongoose);
db.Document = require('./documents')(mongoose);

module.exports = db;