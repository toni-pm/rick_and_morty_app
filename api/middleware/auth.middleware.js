const { TokenExpiredError } = require('jsonwebtoken')
const { verifyToken } = require('../services/auth.service')

const authRequired = async (req, res, next) => {
  try {
    await handleAuthorization(req)
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).send({
        message: 'Token expired.'
      })
    } else {
      return res.status(401).send({ message: 'Invalid token authorization.' })
    }
  }
  return next()
}

const authOptional = async (req, res, next) => {
  try {
    await handleAuthorization(req)
  } catch (err) {
    req.headers.authorization = ''
    // As the authorization is optional we do not control error
  }
  return next()
}

const handleAuthorization = async req => {
  try {
    const authorization = req.headers.authorization
    if (!authorization && !authorization.startsWith('Bearer ')) {
      throw Error()
    }
    const token = authorization.replace('Bearer ', '')
    const user = await verifyToken(token)
    if (!user) {
      throw Error()
    }
    req.user = user
  } catch (err) {
    throw Error('Invalid token authorization.')
  }
}

module.exports = {
  authRequired,
  authOptional
}
