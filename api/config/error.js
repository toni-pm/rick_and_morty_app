const logger = require('../log/logger.log')

class ErrorHandler extends Error {
  constructor (status = 500, message = 'Server error', err = {}) {
    super()
    this.status = status
    this.message = message
    this.stack = err.stack
  }
}

const handleError = (err, req, res) => {
  const { status, message, stack } = err
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

  logger.error(`IP ${ip} tried to access ${req.originalUrl}`, {
    status,
    message
  }, stack || '', req.body)

  res.status(status).json({
    status,
    message
  })
}

module.exports = {
  ErrorHandler,
  handleError
}
