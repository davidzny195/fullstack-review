const express = require('express');
let app = express();
const { getReposByUsername } = require('../helpers/github.js');
const db = require('../database');
// Middleware
const morgan = require('morgan');
const cors = require('cors');

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('client/dist'));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

app.post('/repos', async (req, res) => {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const { username } = req.body

  try {
    const repos = await getReposByUsername(username)
    if (!repos) {
      throw new Error ('No Repos')
    }
    const updateDb = db.save(repos)
  } catch (error) {
    res.sendStatus(404)
  }

});

app.get('/repos', async (req, res) => {
  // TODO - your code here!
  // This route should send back the top 25 repos
  try {
    const repos = await db.read()
    res.json(repos)
  } catch (error) {
    console.log('error reading')
  }
});

app.get('/', function(req, res) {
  res.render('index');
})

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

