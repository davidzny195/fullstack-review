const express = require('express');
let app = express();
const models = require('./models')
// Middleware
const morgan = require('morgan');

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('client/dist'));
app.use(morgan('dev'));
app.use(express.json())

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

app.get('/', function(req, res) {
  res.render('index');
})

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

