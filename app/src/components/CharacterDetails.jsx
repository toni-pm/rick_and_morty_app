import React from 'react'
import { useDispatch } from 'react-redux'
import propTypes from 'prop-types'
import { addFavorite, deleteFavorite } from '../actions/character.actions'

const CharacterDetails = props => {
	const { data } = props
	const {
		id,
		name,
		status,
		species,
		location,
		fav,
		image,
		episode,
		gender,
		origin,
		type
	} = data

	const dispatch = useDispatch()

	const addFav = e => {
		e.preventDefault()
		dispatch(addFavorite(id))
	}

	const deleteFav = e => {
		e.preventDefault()
		dispatch(deleteFavorite(id))
	}

	return (
		<div className='character-details'>
			<div className='character'>
				<div className='character-image'>
					<img src={image} alt='Character' />
					<div className='favorite'>
						<span className={fav ? 'is-fav' : 'no-fav'} onClick={fav ? deleteFav : addFav}>★</span>
					</div>
				</div>
				<div className='character-info'>
					<h2>{name}</h2>

					<span>Status:</span>
					<p className='status'>{status}</p>

					<span>Species:</span>
					<p className='species'>{species}</p>

					<span>Origin:</span>
					<p className='origin'>{origin.name}</p>

					<span>Last known location:</span>
					<p className='location'>{location.name}</p>

					<span>Gender:</span>
					<p className='gender'>{gender}</p>

					{type && (
						<>
							<span>Type:</span>
							<p className='type'>{type}</p>
						</>
					)}
					<span>Episodes:</span>
					<p className='episodes'>{episode.length}</p>
				</div>
			</div>
		</div>
	)
}

CharacterDetails.propTypes = {
	data: propTypes.object
}

export default CharacterDetails
