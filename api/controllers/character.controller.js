
const { ErrorHandler } = require('../config/error')
const characterService = require('../services/character.service')

const findAll = async (req, res, next) => {
  const { page } = req.query
  try {
    return res.send(await characterService.findAll(page))
  } catch (err) {
    return next(new ErrorHandler(500, 'Error finding characters.', err))
  }
}

const findById = async (req, res, next) => {
  const { id } = req.params
  try {
    return res.send(await characterService.findById(id))
  } catch (err) {
    if (err.response.status) {
      return next(new ErrorHandler(404, 'Character not found.', err))
    }
    return next(new ErrorHandler(500, 'Error finding character.', err))
  }
}

module.exports = {
  findAll,
  findById
}
