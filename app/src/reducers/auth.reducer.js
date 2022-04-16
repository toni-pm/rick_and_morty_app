import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAIL
} from '../actions/types'

const user = JSON.parse(localStorage.getItem('user'))

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
        ...state
      }
    case AUTH_REGISTER_FAIL:
      return {
        ...state
      }
    default:
      return state
  }
}

export default reducer
