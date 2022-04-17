import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Character from './Character'
import Error from './Error'
import Loader from './Loader'
import { getCharacterDetails } from '../actions/character.actions'

const CharacterDetails = () => {
	const { id } = useParams()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const { characterDetails } = useSelector(state => state.character)

	const dispatch = useDispatch()

	const getCharacter = () => {
		setLoading(true)
		setError(false)

		dispatch(getCharacterDetails(id))
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
						: characterDetails ? (<Character data={characterDetails} />) : <></>
			}
		</div>
	)
}

export default CharacterDetails
