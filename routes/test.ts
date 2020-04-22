import express = require ('express');
const router :express.Application = express();

const { signIn, welcome, refresh } = require('./../handlers/handlers')

router.get('/', function (req, res) {
    res.send('Hello World!');
});

router.get('/test', function (req, res) {
    res.send('This is a test');
});

router.post('/signin', signIn)
router.get('/welcome', welcome)
router.post('/refresh', refresh)

export =  router;