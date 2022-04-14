const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.js')
const UserModel = require('../models/user.model')
const { findById } = require('../services/user.service')

const login = async (nickname, password) => {
  const user = await UserModel.findOne({ nickname }).select('-__v')
  if (!user) {
    return null
  }
  const matches = await user.matchPassword(password)
  return matches ? await user.generateToken() : null
}

const register = async ({ nickname, firstname, lastname, password }) => {
  const user = new UserModel({
    nickname,
    lastname,
    firstname
  })
  await user.setPassword(password)
  await user.save()
  return user.format()
}

const verifyToken = async token => {
  const userDecoded = jwt.verify(token, JWT_SECRET)
  return await findById(userDecoded.user_id)
}

module.exports = {
  login,
  register,
  verifyToken
}
