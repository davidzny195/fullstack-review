const controllers = require('./controllers')
const router = require('express').Router()


router.get('/repos', controllers.repos.get)

router.post('/repos', controllers.repos.post)

module.exports = router