const { ErrorHandler } = require('../config/error')
const authService = require('../services/auth.service')

const login = async (req, res, next) => {
  try {
    const { nickname, password } = req.body
    const token = await authService.login(nickname, password)
    if (token) {
      return res.send({ token: `Bearer ${token}` })
    }
    return res.status(403).send({ message: 'Invalid credentials.' })
  } catch (err) {
    return next(new ErrorHandler(500, 'Login error.', err))
  }
}

const register = async (req, res, next) => {
  try {
    const { nickname, firstname, lastname, password } = req.body
    await authService.register({ nickname, firstname, lastname, password })
    return res.status(200).send({ message: 'Successfully registered.' })
  } catch (err) {
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return next(new ErrorHandler(400, 'User already exists.'))
    }
    return next(new ErrorHandler(500, 'Register error.', err))
  }
}

module.exports = {
  login,
  register
}