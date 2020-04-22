// lib/app.ts
import express = require('express');
const testRouter = require('./routes/test')

// Create a new express application instance
const app: express.Application = express();

app.use('/', testRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});