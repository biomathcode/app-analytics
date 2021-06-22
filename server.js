'use strict';

const Express = require('express');
const cors = require('cors');

const router = require('./lib');

const app = Express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use('/api/', router);

app.listen(port, function () {
  console.log('Server started on port', port);
});
