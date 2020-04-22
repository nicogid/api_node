"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
var express = require("express");
var testRouter = require('./routes/test');
// Create a new express application instance
var app = express();
app.use('/', testRouter);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
