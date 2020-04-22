"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express();
router.get('/', function (req, res) {
    res.send('Hello World!');
});
router.get('/test', function (req, res) {
    res.send('This is a test');
});
module.exports = router;
