const express = require('express')
const logger = require('morgan')
const { handleError, ErrorHandler } = require('./config/error')

// App conf
const app = express()
app.use(logger('dev'))
app.use(express.json({ limit: '5mb' }))

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
