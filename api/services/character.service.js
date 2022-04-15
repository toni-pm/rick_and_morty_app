const axios = require('axios')
const { API } = require('../config/config')

const getMaxPages = async () => {
  const res = await axios.get(`${API}/character`)
  const pages = res.data.info.pages
  if (!Number.isInteger(pages)) {
    throw Error('Invalid maximum number of pages')
  }
  return pages
}

const findAll = async (page = 1) => {
  const res = await axios.get(`${API}/character/?page=${page}`)
  return res.data
}

const findById = async (characterId, user) => {
  const res = await axios.get(`${API}/character/${characterId}`)
  const data = res.data
  if (data && user) {
    data.fav = isFav(characterId, user)
  } else {
    data.fav = false
  }
  return data
}

const isFav = (characterId, user) => {
  return user.favs.includes(characterId)
}

const addFav = async (characterId, user) => {
  user.favs = user.favs.filter(item => item !== characterId).concat(characterId)
  await user.save()
}

const deleteFav = async (characterId, user) => {
  user.favs = user.favs.filter(item => item !== characterId)
  await user.save()
}

module.exports = {
  getMaxPages,
  findAll,
  findById,
  addFav,
  deleteFav
}
