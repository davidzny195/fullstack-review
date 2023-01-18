const express = require('express');
let app = express();
const { getReposByUsername } = require('../helpers/github.js');
const db = require('../database');
// Middleware
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes.js')

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

app.use('/api', router)

app.use(express.static('client/dist'));

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

