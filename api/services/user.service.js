const User = require('../models/user.model')

const findById = async userId => {
  return await User.findById(userId)
}

const create = async ({ nickname, firstname, lastname, password }) => {
  const user = new User({
    nickname,
    lastname,
    firstname
  })
  await user.setPassword(password)
  await user.save()
  return user.format()
}

module.exports = {
  findById,
  create
}
