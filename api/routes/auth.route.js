const router = require('express').Router()

router.get('/', function (req, res, next) {
  res.send('Auth')
})

module.exports = router
