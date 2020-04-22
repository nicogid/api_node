"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express();
var _a = require('./../handlers'), signIn = _a.signIn, welcome = _a.welcome, refresh = _a.refresh;
router.get('/', function (req, res) {
    res.send('Hello World!');
});
router.get('/test', function (req, res) {
    res.send('This is a test');
});
router.post('/signin', signIn);
router.get('/welcome', welcome);
router.post('/refresh', refresh);
module.exports = router;
