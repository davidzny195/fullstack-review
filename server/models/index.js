const db = require('../../database');

module.exports = {
  repos: {
    get: () => {
      return db.read()
    },

    post: (repos) => {
      return db.save(repos).catch((err) => {
        throw new Error (err)
      })

    }
  }
}