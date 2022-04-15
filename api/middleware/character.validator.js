const { check } = require('express-validator')

const validateCharacterId = () => {
  return [
    check('id').isInt({ min: 1 }).toInt().withMessage('Invalid character.')
  ]
}

module.exports = {
  validateCharacterId
}
