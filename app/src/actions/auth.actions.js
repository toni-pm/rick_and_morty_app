import {
	AUTH_LOGIN_SUCCESS,
	AUTH_LOGIN_FAIL,
	AUTH_LOGOUT,
	AUTH_REGISTER_SUCCESS,
	AUTH_REGISTER_FAIL,
	AUTH_CHECK_TOKEN_SUCCESS,
	AUTH_CHECK_TOKEN_FAIL,
	MESSAGE_SET
} from './types'

import authService from '../services/auth.service'

export const login = (nickname, password) => dispatch => {
	return authService.login(nickname, password).then(
		data => {
			dispatch({
				type: AUTH_LOGIN_SUCCESS,
				payload: { user: data }
			})

			return Promise.resolve()
		},
		err => {
			dispatch({
				type: AUTH_LOGIN_FAIL
			})

			dispatch({
				type: MESSAGE_SET,
				payload: err.message
			})

			return Promise.reject(err)
		}
	)
}

export const register = ({ nickname, firstname, lastname, password, passwordConfirmation }) => dispatch => {
	return authService.register({ nickname, firstname, lastname, password, passwordConfirmation }).then(
		data => {
			dispatch({
				type: AUTH_REGISTER_SUCCESS,
				payload: { user: data }
			})

			dispatch({
				type: MESSAGE_SET,
				payload: data.message
			})

			return Promise.resolve()
		},
		err => {
			dispatch({
				type: AUTH_REGISTER_FAIL
			})

			dispatch({
				type: MESSAGE_SET,
				payload: err.message
			})

			return Promise.reject(err)
		}
	)
}

export const logout = () => dispatch => {
	authService.logout()
	dispatch({
		type: AUTH_LOGOUT
	})
}

/**
 * User information from the token. If the token is wrong, it is deleted.
 */
export const checkToken = () => dispatch => {
	return authService.checkToken().then(
		data => {
			dispatch({
				type: AUTH_CHECK_TOKEN_SUCCESS,
				payload: { user: data }
			})
		},
		err => {
			dispatch({
				type: AUTH_CHECK_TOKEN_FAIL
			})

			dispatch(logout())

			return Promise.reject(err)
		}
	)
}
