const router = require('express').Router()
const { API_PREFIX } = require('../config/config')

// API welcome message
router.get('/', function (req, res, next) {
  res.send('Welcome to my Rick & Morty Application')
})

module.exports = app => {
  app.use(API_PREFIX, router)
  app.use(`${API_PREFIX}/auth`, require('./auth.route'))
  app.use(`${API_PREFIX}/characters`, require('./character.route'))
}
