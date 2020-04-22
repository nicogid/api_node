import express = require ('express');
const router :express.Application = express();

router.get('/', function (req, res) {
    res.send('Hello World!');
});

router.get('/test', function (req, res) {
    res.send('This is a test');
});

module.exports =  router;