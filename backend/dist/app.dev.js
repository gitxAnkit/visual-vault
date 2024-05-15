"use strict";

var dotenv = require('dotenv');

var express = require('express');

var cors = require('cors');

var connectDB = require('./config/connection');

var imageRoutes = require('./routes/route');

var app = express(); //config

dotenv.config({
  path: "./.env"
}); // connection

connectDB(); //middlewares

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: false
})); // routes

app.use("/", imageRoutes);
app.listen(process.env.PORT, function () {
  console.log("Server started at PORT:".concat(process.env.PORT));
});