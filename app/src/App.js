import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './components/Header'
import {
	Routes,
	Route,
	useLocation
} from 'react-router-dom'
import { checkToken } from './actions/auth.actions'
import { clearMessage } from './actions/message.actions'
import CharacterDetails from './components/CharacterDetails'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Error404 from './components/Error404'
import Error from './components/Error'
import { getAccessToken, randomIntBetweenTwo } from './utils'
import './assets/styles'
import audioRick from './assets/audio/rick.mp3'

function App () {
	const location = useLocation()

	const dispatch = useDispatch()
	const { message } = useSelector(state => state.message)

	/**
	 * Function that sometimes plays a Rick sound.
	 */
	const rickSound = () => {
		const random = randomIntBetweenTwo(1, 7)
		if (random === 5) {
			new Audio(audioRick).play()
		}
	}

	useEffect(() => {
		// If the client already has a token we check if it is still valid.
		if (getAccessToken()) {
			dispatch(checkToken())
		}

		// When clicked it might play a Rick sound.
		document.body.addEventListener('click', rickSound)
	}, [])

	useEffect(() => {
		// Clear message when navigating.
		if (message) {
			dispatch(clearMessage())
		}
	}, [location])

	return (
		<>
			<div className="space"></div>
			<div className='App'>
				<Header />
				<section>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/details/:id' element={<CharacterDetails />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/error' element={<Error />} />
						<Route path="*" element={<Error404 />} />
					</Routes>
				</section>
				<footer>
					Powered by <a href='https://tonipm.com'>Toni PM</a> | {new Date().getFullYear()}
				</footer>
			</div>
		</>
	)
}

export default App
