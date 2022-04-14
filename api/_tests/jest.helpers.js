const request = require('supertest')
const { app } = require('../app')
const { API_PREFIX } = require('../config/config.js')
const api = request(app)

module.exports = {
  api,
  API_PREFIX
}
