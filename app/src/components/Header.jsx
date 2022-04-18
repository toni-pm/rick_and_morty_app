import React from 'react'
import { logout } from '../actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import textLogo from '../assets/img/text-logo.png'
import '../assets/styles/Header.scss'

const Header = () => {
	const { user } = useSelector(state => state.auth)

	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<>
			<header>
				<nav>
					<Link to='/'>Home</Link>
					{user
						? (
							<>
								<Link to='/' onClick={handleLogout}>Logout</Link>
								<span className='welcome-user'>Hello {user.nickname}!</span>
							</>
						)
						: (
							<>
								<Link to='/login'>Login</Link>
								<Link to='/register'>Sign Up</Link>
							</>
						)}
				</nav>
				<img src={textLogo}></img>
			</header>
		</>
	)
}

export default Header
