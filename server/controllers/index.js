const models = require('../models');
const { getReposByUsername } = require('../../helpers/github.js');

module.exports = {
  repos: {
    get: async (req, res) => {
      try {
        const repos = await models.repos.get()
        res.status(200).json(repos)
      } catch (error) {
        res.sendStatus(404)
      }
    },

    post: async (req, res) => {
      const { username } = req.body
      try {
        const repos = await getReposByUsername(username)
        if (!repos) {
          throw new Error ('No Repos')
        }
        const updateDb = await models.repos.post(repos)
        if (updateDb) {
          res.status(201).json(`${updateDb.length} new repos imported, ${updateDb.length} repos updated`)
        }
      } catch (error) {
        res.sendStatus(404)
      }
    }
  }
}