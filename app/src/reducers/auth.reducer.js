import {
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_FAIL,
	AUTH_LOGOUT,
	AUTH_REGISTER_SUCCESS,
	AUTH_REGISTER_FAIL,
	AUTH_CHECK_TOKEN_SUCCESS,
	AUTH_CHECK_TOKEN_FAIL
} from '../actions/types'
import api from '../services/api'

const user = api.getUserStorage()

const initialState = user
	? { user }
	: { user: null }

const reducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
	case AUTH_LOGIN_SUCCESS:
		return {
			...state,
			user: payload.user
		}
	case AUTH_LOGIN_FAIL:
		return {
			...state,
			user: null
		}
	case AUTH_LOGOUT:
		return {
			...state,
			user: null
		}
	case AUTH_REGISTER_SUCCESS:
		return {
			...state,
			user: payload.user
		}
	case AUTH_REGISTER_FAIL:
		return {
			...state
		}
	case AUTH_CHECK_TOKEN_SUCCESS:
		return {
			...state,
			user: payload.user
		}
	case AUTH_CHECK_TOKEN_FAIL:
		return {
			...state,
			user: null
		}
	default:
		return state
	}
}

export default reducer
