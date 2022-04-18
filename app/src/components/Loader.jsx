import React from 'react'
import propTypes from 'prop-types'

const Loader = props => {
	return (
		<div className='loader'>
			{props && props.text && (<span>Loading</span>)}
			<div className='dot-pulse'><span>.</span><span>.</span><span>.</span></div>
		</div>
	)
}

Loader.propTypes = {
	text: propTypes.bool
}

export default Loader
