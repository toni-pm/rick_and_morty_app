import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Character from './Character'
import Error from './Error'
import Loader from './Loader'
import { getCharactersByPage } from '../actions/character.actions'

const CharacterList = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const { characters } = useSelector(state => state.character)

  const dispatch = useDispatch()

  const getCharacters = () => {
    setLoading(true)
    setError(false)

    dispatch(getCharactersByPage())
      .then(() => {
        setLoading(false)
        setError(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }

  useEffect(() => {
    getCharacters()
  }, [])

  return (
    <div>
      {
loading
  ? (<Loader />)
  : error
    ? (<Error />)
    : characters && characters.results && characters.results.map(character => (
      <Link key={character.id} to={`/details/${character.id}`}>
        <Character data={character} />
      </Link>
    ))
}
    </div>
  )
}

export default CharacterList
