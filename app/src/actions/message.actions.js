import { MESSAGE_SET, MESSAGE_CLEAR } from './types'

export const setMessage = message => ({
  type: MESSAGE_SET,
  payload: message
})

export const clearMessage = () => ({
  type: MESSAGE_CLEAR
})
