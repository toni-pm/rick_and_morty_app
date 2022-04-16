import {
  CHARACTER_GET_BY_PAGE,
  CHARACTER_DETAILS,
  CHARACTER_ADD_FAVORITE,
  CHARACTER_DELETE_FAVORITE
} from './types'

import characterService from '../services/character.service'

export const getCharactersByPage = page => dispatch => {
  return characterService.getCharactersByPage(page).then(
    data => {
      dispatch({
        type: CHARACTER_GET_BY_PAGE,
        payload: { characters: data }
      })

      return Promise.resolve()
    },
    err => {
      return Promise.reject(err)
    }
  )
}

export const getCharacterDetails = id => dispatch => {
  return characterService.getCharacterDetails(id).then(
    data => {
      dispatch({
        type: CHARACTER_DETAILS,
        payload: { characterDetails: data }
      })

      return Promise.resolve()
    },
    err => {
      return Promise.reject(err)
    }
  )
}

export const addFavorite = id => (dispatch, getState) => {
  return characterService.addFavorite(id).then(
    data => {
      dispatch({
        type: CHARACTER_ADD_FAVORITE,
        payload: { id }
      })

      return Promise.resolve()
    },
    err => {
      return Promise.reject(err)
    }
  )
}

export const deleteFavorite = id => (dispatch, getState) => {
  return characterService.deleteFavorite(id).then(
    data => {
      dispatch({
        type: CHARACTER_DELETE_FAVORITE,
        payload: { id }
      })

      return Promise.resolve()
    },
    err => {
      return Promise.reject(err)
    }
  )
}
