import React from 'react'
import { useDispatch } from 'react-redux'
import propTypes from 'prop-types'
import { addFavorite, deleteFavorite } from '../actions/character.actions'

const Character = props => {
	const { data } = props
	const { id, name, status, fav, image } = data

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
		<div>
			<img src={image} alt='Character' />
			<div>
				<h2>
					{name}
				</h2>
				<p>
					<span>Status: {status}</span>
				</p>
				<p>{fav ? <button onClick={deleteFav}>Delete favorite</button> : <button onClick={addFav}>Add Favorite</button> }</p>
			</div>
		</div>
	)
}

Character.propTypes = {
	data: propTypes.object
}

export default Character
