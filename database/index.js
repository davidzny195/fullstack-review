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
  id: Number,
  repo_name: String,
  owner_id: Number,
  owner_name: String,
  owner_url: String,
  forks: Number,
  url: String,
  description: String
}, {collection: 'Repos'});

let Repo = mongoose.model('Repo', repoSchema);

const save = async (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // db.Repos.createIndex({"id":1}, {unique: true})
  // repo command to createIndex
  const reposDb = []
  for (let repo of repos) {
    let newRepo = new Repo({
      id: repo.id,
      repo_name: repo.name,
      owner_id: repo.owner.id,
      owner_name: repo.owner.login,
      owner_url: repo.owner.html_url,
      forks: repo.forks_count,
      url: repo.html_url,
      description: repo.description
    })
    reposDb.push(newRepo)
  }

  try {
    const res = await Repo.insertMany(reposDb)
    return res
  } catch (error) {
    console.log('error save')
  }
}

const read = async() => {
  try {
    const res = Repo.find({}).limit(25).sort({ forks: 1 })
    return res
  } catch (err) {
    console.log('error read')
  }
}

module.exports = { save, read };