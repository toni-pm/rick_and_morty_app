const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const { authRequired } = require('../middleware/auth.middleware')
const { validate } = require('../middleware/validator')
const { validateUser, validatePasswordConfirmation } = require('../middleware/user.validator')

/* GET Me. Returns user information from the token. */
router.get('/me',
  authRequired,
  authController.me)

/* POST User login. */
router.post('/login',
  validate(validateUser()),
  authController.login)

/* POST User register. */
router.post('/register',
  validate(validateUser().concat(validatePasswordConfirmation())),
  authController.register)

module.exports = router
