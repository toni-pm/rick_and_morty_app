const { validationResult } = require('express-validator')

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)))

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const errArray = errors.array({ onlyFirstError: true })
    const errStatus = errArray.find(err => Number.isInteger(err.msg))
    if (errStatus) {
      res.sendStatus(errStatus.msg)
    } else {
      res.status(400).json({
        errors: errArray
      })
    }
  }
}

module.exports = {
  validate
}
