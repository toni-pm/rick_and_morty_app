const { check } = require('express-validator')
const NICKNAME_MIN = 4
const NICKNAME_MAX = 16

const validatePassword = () => {
  return [
    check('password', 'Password must be between 16 and 99 characters and contain at least: 1 number, 1 symbol, 1 capital letter and 1 lower letter.')
      .notEmpty().isStrongPassword({
        minLength: 16,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }).isLength({ max: 99 })
  ]
}

const validateNickname = () => {
  return [
    check('nickname', `Nickname must be between ${NICKNAME_MIN} and ${NICKNAME_MAX} characters.`).notEmpty().trim().isLength({ min: NICKNAME_MIN, max: NICKNAME_MAX })
      .matches(/^[a-zA-Z0-9^_-]+$/).withMessage('Nickname cannot contain special characters except - or _')
  ]
}

const validateUser = () => {
  return [...validatePassword(), ...validateNickname(),
    check('firstname').trim(),
    check('lastname').trim()
  ]
}

module.exports = {
  NICKNAME_MIN,
  NICKNAME_MAX,
  validateUser
}
