const router = require('express').Router()
const { check } = require('express-validator')
const { authRequired, authOptional } = require('../middleware/auth.middleware')
const { validate } = require('../middleware/validator')
const characterController = require('../controllers/character.controller')
const { validateCharacterId } = require('../middleware/character.validator')
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
  authOptional,
  validate(validateCharacterId()),
  characterController.findById)

/* GET Add to favorites. */
router.get('/fav/:id',
  authRequired,
  validate(validateCharacterId()),
  characterController.addFav)

/* DELETE Remove from favorites */
router.delete('/fav/:id',
  authRequired,
  validate(validateCharacterId()),
  characterController.deleteFav)

module.exports = router
