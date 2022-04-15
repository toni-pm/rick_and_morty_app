const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.js')
const { NICKNAME_MIN, NICKNAME_MAX } = require('../middleware/user.validator')
const SALT_ROUNDS = 12
const TOKEN_EXPIRATION = '1d'

const schema = new mongoose.Schema({
  nickname: { type: String, unique: true, required: true, minlength: NICKNAME_MIN, maxLength: NICKNAME_MAX },
  firstname: String,
  lastname: String,
  hash: { type: String, required: true },
  favs: {
    type: [Number]
  }
})

schema.methods.setPassword = async function (password) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  this.hash = await bcrypt.hash(password, salt)
}

schema.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.hash)
}

schema.methods.generateToken = async function () {
  return jwt.sign({
    user_id: this.id,
    nickname: this.nickname,
    firstname: this.firstname,
    lastname: this.lastname
  }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION })
}

schema.methods.format = function () {
  const formatted = this.toJSON()
  delete formatted.hash
  delete formatted.__v
  return formatted
}

const User = mongoose.model('UserModel', schema)

module.exports = User
