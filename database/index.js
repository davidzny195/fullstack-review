const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', () => {
	console.log('Mongo open');
})

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  _id: { type: Number, unique: true },
  repo_name: String,
  owner_id: Number,
  owner_name: String,
  owner_url: String,
  forks: Number,
  url: { type: String, unique: true },
  description: String
}, {collection: 'Repos'});

let ownerSchema = new mongoose.Schema({
  owner_id: Number,
  owner_name: String,
  owner_url: String,
  repos: [{type: Number, ref: 'Repo'}]
}, {collection: 'Owners'})

let Repo = mongoose.model('Repo', repoSchema);
let Owner = mongoose.model('Owner', ownerSchema);

const save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // db.Repos.createIndex({"id":1}, {unique: true})
  // repo command to createIndex
  const reposDb = []
  for (let repo of repos) {
    let newRepo = {
      _id: repo.id,
      repo_name: repo.name,
      owner_id: repo.owner.id,
      owner_name: repo.owner.login,
      owner_url: repo.owner.html_url,
      forks: repo.forks_count,
      url: repo.html_url,
      description: repo.description
    }
    reposDb.push(newRepo)
  }

  return Repo.insertMany(reposDb).catch((err) => {
    throw new Error(err)
  })
}

const read = () => {
  return Repo.find({}).limit(25).sort({ forks: 1 })

}

module.exports = { save, read };