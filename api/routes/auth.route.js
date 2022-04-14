const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const { validate } = require('../middleware/validator')
const { validateUser } = require('../middleware/user.validator')

/* POST User login. */
router.post('/login',
  validate(validateUser()),
  authController.login)

/* POST User register. */
router.post('/register',
  validate(validateUser()),
  authController.register)

module.exports = router
