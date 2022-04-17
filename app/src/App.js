import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom'
import { checkToken } from './actions/auth.actions'
import CharacterDetails from './components/CharacterDetails'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import { getAccessToken } from './utils'
import './App.css'

function App () {
	const dispatch = useDispatch()

	useEffect(() => {
		if (getAccessToken()) {
			dispatch(checkToken())
		}
	})
	return (
		<div className='App'>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/details/:id' element={<CharacterDetails />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
