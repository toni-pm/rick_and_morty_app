const request = require('supertest')
const { app } = require('../app')
const { API_PREFIX } = require('../config/config.js')
const api = request(app)

const initialUsers = [
  {
    nickname: 'testing',
    firstname: 'Test',
    lastname: 'User',
    password: 'q9^KH6tXp%JUqEq*'
  },
  {
    nickname: 'tonipm',
    firstname: 'Toni',
    lastname: 'Peraira',
    password: 'j%Q6bep44Vxrth6Z'
  }
]

module.exports = {
  api,
  API_PREFIX,
  initialUsers
}
