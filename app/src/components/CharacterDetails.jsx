import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Character from './Character'
import Error from './Error'
import Loader from './Loader'
import { getCharacterDetails } from '../services/character.service'

const CharacterDetails = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const getCharacter = async () => {
    try {
      setCharacter(await getCharacterDetails(id))
      setLoading(false)
      setError(false)
    } catch (err) {
      setLoading(false)
      setError(err)
    }
  }

  useEffect(() => {
    getCharacter()
  }, [])

  return (
<div>
<h1>Character Details {id}</h1>
{
loading
  ? (<Loader />)
  : error
    ? (<Error />)
    : character ? (<Character data={character} />) : <></>
}
</div>
  )
}

export default CharacterDetails
