const { TokenExpiredError } = require('jsonwebtoken')
const { verifyToken } = require('../services/auth.service')

const authRequired = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
    if (!authorization && !authorization.startsWith('Bearer ')) {
      return res.status(401).send({ message: 'Invalid token authorization.' })
    }
    const token = authorization.replace('Bearer ', '')
    const user = await verifyToken(token)
    if (!user) {
      return res.status(401).send({ message: 'Invalid token authorization.' })
    }
    req.user = user
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

const authOptional = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    return authRequired(req, res, next)
  }
  return next()
}

module.exports = {
  authRequired,
  authOptional
}
