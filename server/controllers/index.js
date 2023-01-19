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
        return models.repos.post(repos).then((result) => {
          res.status(201).json(`${result.length} new repos imported, ${result.length} repos updated`)
        }).catch((err) => {
          res.sendStatus(404)
        })
      } catch (error) {
        res.sendStatus(404)
      }
    }
  }
}