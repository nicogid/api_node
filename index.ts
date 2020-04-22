import express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const testRouter = require('./routes/test');


// Create a new express application instance
const app: express.Application = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', testRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});