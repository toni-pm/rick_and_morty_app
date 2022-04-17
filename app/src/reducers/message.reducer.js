import { MESSAGE_SET, MESSAGE_CLEAR } from '../actions/types'

const initialState = {}

const reducer = (state = initialState, action) => {
	const { type, payload } = action

	switch (type) {
	case MESSAGE_SET:
		return { message: payload }
	case MESSAGE_CLEAR:
		return { message: '' }
	default:
		return state
	}
}

export default reducer
