import {
	CHARACTER_GET_BY_PAGE,
	CHARACTER_DETAILS,
	CHARACTER_ADD_FAVORITE,
	CHARACTER_DELETE_FAVORITE
} from '../actions/types'

const initialState = { characters: [], characterDetails: {}, currentPage: 1 }

const reducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
	case CHARACTER_GET_BY_PAGE:
		return {
			...state,
			characters: payload.characters,
			currentPage: payload.currentPage
		}
	case CHARACTER_DETAILS:
		return {
			...state,
			characterDetails: payload.characterDetails
		}
	case CHARACTER_ADD_FAVORITE:
		if (state.characters && state.characters.results) {
			state.characters.results.map(item => {
				if (item.id === payload.id) {
					item.fav = true
				}
				return item
			})
		}
		if (state.characterDetails && state.characterDetails.id === payload.id) {
			state.characterDetails.fav = true
		}
		return {
			...state
		}
	case CHARACTER_DELETE_FAVORITE:
		if (state.characters && state.characters.results) {
			state.characters.results.map(item => {
				if (item.id === payload.id) {
					item.fav = false
				}
				return item
			})
		}
		if (state.characterDetails && state.characterDetails.id === payload.id) {
			state.characterDetails.fav = false
		}
		return {
			...state
		}
	default:
		return state
	}
}

export default reducer
