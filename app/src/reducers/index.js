import { combineReducers } from 'redux'
import auth from './auth.reducer'
import message from './message.reducer'
import character from './character.reducer'

export default combineReducers({
	auth,
	character,
	message
})
