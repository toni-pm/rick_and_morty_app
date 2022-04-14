const express = require('express')
const { handleError, ErrorHandler } = require('./config/error')
const { NODE_ENV } = require('./config/config')

// App conf
const app = express()
app.use(express.json({ limit: '5mb' }))

if (NODE_ENV === 'development') {
  // Log HTTP requests in development mode
  const morgan = require('morgan')
  app.use(morgan('tiny'))
}

// Routes
require('./routes')(app)

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  handleError(new ErrorHandler(404, `${req.originalUrl} not found`), req, res)
})

// Error handler
app.use(function (err, req, res, next) {
  handleError(err, req, res)
})

module.exports = {
  app
}
