"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var testRouter = require('./routes/test');
// Create a new express application instance
var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', testRouter);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
