import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/Error.scss'
import errorLogo from '../assets/img/error-logo.png'

const Error = () => (
	<div className='error'>
		<div>
			<div className='error-code'>
				<img src={errorLogo} />
			</div>
		</div>
		<div className='error-message'>
			<p>Oops! Something went wrong! :(</p>
			<div className='error-control'>
				<p>Back to your universe?</p>
				<Link to='/'><span>YES</span></Link>
				<Link to={{}}><span>NO</span></Link>
			</div>
		</div>
	</div>
)

export default Error
