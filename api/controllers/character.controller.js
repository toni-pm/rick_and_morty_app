
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
    return res.send(await characterService.findById(id, req.user))
  } catch (err) {
    if (err.response && err.response.status) {
      return next(new ErrorHandler(404, 'Character not found.', err))
    }
    return next(new ErrorHandler(500, 'Error finding character.', err))
  }
}

const addFav = async (req, res, next) => {
  const { id } = req.params
  try {
    const character = await characterService.findById(id, req.user)
    if (!character) {
      return next(new ErrorHandler(404, 'Character not found.'))
    }
    await characterService.addFav(id, req.user)
    return res.send({ message: 'Character added to favorites.' })
  } catch (err) {
    if (err.response && err.response.status) {
      return next(new ErrorHandler(404, 'Character not found.', err))
    }
    return next(new ErrorHandler(500, 'Error adding to favorites.', err))
  }
}

const deleteFav = async (req, res, next) => {
  const { id } = req.params
  try {
    await characterService.deleteFav(id, req.user)
    return res.send({ message: 'Character removed from favorites.' })
  } catch (err) {
    return next(new ErrorHandler(500, 'Error deleting from favorites.', err))
  }
}

module.exports = {
  findAll,
  findById,
  addFav,
  deleteFav
}
