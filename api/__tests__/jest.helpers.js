const request = require('supertest')
const { app } = require('../app')
const { API_PREFIX } = require('../config/config.js')
const User = require('../models/user.model')
const api = request(app)

let authToken = ''

const testToken = async () => {
  if (!authToken) {
    const user = initialUsers[0]
    let testUser = await User.findOne({ nickname: user.nickname })
    if (!testUser) {
      testUser = new User(user)
      await testUser.setPassword(user.password)
      await testUser.save()
    }
    authToken = await testUser.generateToken()
  }
  return authToken
}

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
  initialUsers,
  testToken
}
