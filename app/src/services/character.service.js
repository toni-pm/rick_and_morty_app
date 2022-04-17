import api from '../services/api'

const baseUrl = 'character'

const getCharactersByPage = async (page = 1) => {
	return api.get(`${baseUrl}?page=${page}`)
		.then(data => {
			return data
		})
}

const getCharacterDetails = async id => {
	return api.get(`${baseUrl}/${id}`)
		.then(data => {
			return data
		})
}

const addFavorite = async id => {
	return api.get(`${baseUrl}/fav/${id}`)
		.then(data => {
			return data
		})
}

const deleteFavorite = async id => {
	return api.delet(`${baseUrl}/fav/${id}`)
		.then(data => {
			return data
		})
}

const exportedObj = {
	getCharactersByPage,
	getCharacterDetails,
	addFavorite,
	deleteFavorite
}

export default exportedObj
