import React, { useState, useEffect } from 'react'
import Character from './Character'
import Error from './Error'
import Loader from './Loader'
import { getCharactersByPage } from '../services/character.service'
import { Link } from 'react-router-dom'

const CharacterList = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getCharacters = async () => {
    try {
      setCharacters(await getCharactersByPage(1))
      setLoading(false)
      setError(false)
    } catch (err) {
      setLoading(false)
      setError(err)
    }
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
    : characters && characters.map(character => (
      <Link key={character.id} to={`/details/${character.id}`}>
        <Character data={character} />
      </Link>
    ))
}
    </div>
  )
}

export default CharacterList
