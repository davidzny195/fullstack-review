const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', () => {
	console.log('Mongo open');
})

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  repo_name: String,
  owner_id: Number,
  owner_name: String,
  forks: Number,
  url: String,
  description: String
}, {collection: 'Repos'});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  console.log(repos, 'IN DATABASE')

  // let saveRepo = new Repo({})
}

module.exports.save = save;