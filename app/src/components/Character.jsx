import React from 'react'
import { useDispatch } from 'react-redux'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { addFavorite, deleteFavorite } from '../actions/character.actions'
import CharacterImage from './CharacterImage'

const Character = props => {
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
		type,
		details
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

	if (details) {
		return (
			<div className='character-details'>
				<div className='character'>
					<div className='character-image'>
						<CharacterImage url={image} />
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

	return (
		<div className='character'>
			<div className='character-image'>
				<Link key={id} to={`/details/${id}`}>
					<CharacterImage url={image} />
				</Link>
			</div>
			<div className='character-info'>
				<Link key={id} to={`/details/${id}`}>
					<h2 className='ellipsis'>{name}</h2>
				</Link>
				<p className='status'>{status} - {species}</p>
				<span>Last known location:</span>
				<p className='location'>{location.name}</p>
				<div className='favorite'>
					<span className={fav ? 'is-fav' : 'no-fav'} onClick={fav ? deleteFav : addFav}>★</span>
				</div>
			</div>
		</div>
	)
}

Character.propTypes = {
	data: propTypes.object
}

export default Character
