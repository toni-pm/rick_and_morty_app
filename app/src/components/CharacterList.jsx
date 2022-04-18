import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Character from './Character'
import Error from './Error'
import Loader from './Loader'
import { getCharactersByPage } from '../actions/character.actions'

const CharacterList = () => {
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const { characters, currentPage = 1 } = useSelector(state => state.character)

	const dispatch = useDispatch()

	/**
	 * Get characters from a page if the page is in the correct range.
	 * @param {Number} page
	 */
	const getCharacters = (page = 1) => {
		page = parseInt(page)
		if (page > 0 && (!characters.info || page <= characters.info.pages)) {
			setLoading(true)
			setError(false)

			dispatch(getCharactersByPage(page))
				.then(data => {
					setLoading(false)
					setError(false)
				})
				.catch(() => {
					setLoading(false)
					setError(true)
				})
		}
	}

	useEffect(() => {
		getCharacters()
	}, [])

	const pagination = () => {
		return (
			<div className='character-pagination'>
				<button className='btn-prev' onClick={() => getCharacters(currentPage - 1)}>Previous</button>
				<span className='current'>
					<select value={currentPage} onChange={e => getCharacters(e.target.value)}>
						{
							Array.from({ length: characters.info.pages }, (v, k) => k + 1).map(index =>
								<option key={index} value={index}>{index}</option>
							)
						}
					</select>
					&nbsp; / {characters.info.pages}
				</span>
				<button className='btn-next' onClick={() => getCharacters(currentPage + 1)}>Next</button>
				<span className='results'>{characters.info.count} results</span>
			</div>
		)
	}

	return (
		<div>
			{
				loading
					? (<Loader />)
					: error
						? (<Error />)
						: characters && characters.results && (
							<div className='characters-wrapper'>
								{pagination()}
								{
									<div className='characters'>
										{
											characters.results.map(character => (
												<Character data={character} key={character.id} />
											))
										}
									</div>
								}
								{pagination()}
							</div>
						)
			}
		</div>
	)
}

export default CharacterList
