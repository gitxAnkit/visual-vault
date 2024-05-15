"use strict";

var mongoose = require('mongoose');

var connectDB = function connectDB() {
  mongoose.connect(process.env.MONGO_URI).then(function (data) {
    console.log("MongoDB connected with server ".concat(data.connection.host));
  })["catch"](function (err) {
    console.log(err);
  });
};

module.exports = connectDB;