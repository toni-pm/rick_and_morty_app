import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/styles/Error.scss'
import errorLogo from '../assets/img/error-404-logo.png'

const Error404 = () => {
	return (
		<div className='error'>
			<div>
				<div className='error-code error-404'>
					<span>4</span>
					<img src={errorLogo} />
					<span>4</span>
				</div>
			</div>
			<div className='error-message'>
				<p>It seems that the page you are looking for is not in this universe.</p>
				<div className='error-control'>
					<p>Back to your universe?</p>
					<Link to='/'><span>YES</span></Link>
					<Link to={{}}><span>NO</span></Link>
				</div>
			</div>
		</div>
	)
}

export default Error404
