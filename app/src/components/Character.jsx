import React from 'react'
import { useDispatch } from 'react-redux'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { addFavorite, deleteFavorite } from '../actions/character.actions'

const Character = props => {
	const { data } = props
	const { id, name, status, species, location, fav, image } = data

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
		<div className='character'>
			<div className='character-image'>
				<Link key={id} to={`/details/${id}`}>
					<img src={image} alt='Character' />
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
