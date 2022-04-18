import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import Loader from './Loader'

const CharacterImage = props => {
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		const img = new Image()
		img.onload = () => {
			setLoaded(true)
		}
		img.src = props.url
	}, [])

	if (loaded) {
		return (
			<img src={props.url} alt='Character' />
		)
	}
	return (
		<div className='loader-image'>
			<Loader />
		</div>
	)
}

CharacterImage.propTypes = {
	url: propTypes.string
}

export default CharacterImage
