const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = async (username) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let requestUrl = `https://api.github.com/users/${username}/repos`
  let options = {
    url: requestUrl,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  try {
    const repos = await axios(options)
    return repos.data
  } catch (error) {
    console.log('NO REPOS github.js')
  }


}

module.exports.getReposByUsername = getReposByUsername;