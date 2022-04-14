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

const findById = async id => {
  const res = await axios.get(`${API}/character/${id}`)
  return res.data
}

module.exports = {
  getMaxPages,
  findAll,
  findById
}
