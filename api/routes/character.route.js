const router = require('express').Router()
const { check } = require('express-validator')
const characterController = require('../controllers/character.controller')
const { validate } = require('../middleware/validator')
const { MAX_PAGES } = require('../config/config')

/* GET Character list. */
router.get('/',
  validate([
    check('page')
      .custom(async (value, { req }) => {
        if (value > MAX_PAGES) { // TODO dynamic max
          throw new Error('There is nothing here.')
        }
        req.query.page = 1
        return true
      })
  ]),
  characterController.findAll)

/* GET Character details. */
router.get('/:id',
  validate([
    check('id').isInt({ min: 1 }).withMessage('Invalid character.')
  ]), characterController.findById)

module.exports = router
