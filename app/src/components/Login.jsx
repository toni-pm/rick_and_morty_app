import React, { useState } from 'react'
import { login } from '../actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Login = () => {
	const [error, setError] = useState(null)
	const [nickname, setNickname] = useState('tonipm')
	const [password, setPassword] = useState('1Very$$$ecurePassword6')

	const { user } = useSelector(state => state.auth)
	const { message } = useSelector(state => state.message)

	const dispatch = useDispatch()

	const handleLogin = async e => {
		e.preventDefault()
		setError(false)

		dispatch(login(nickname, password))
			.then(() => {
				setError(false)
			})
			.catch(() => {
				setError(true)
			})
	}

	if (user) {
		return <Navigate to='/' />
	}

	return (
		<>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<input type='text' value={nickname} onChange={e => setNickname(e.target.value)} name='nickname' id='nickname' placeholder='Nickname' />
				<input type='password' value={password} onChange={e => setPassword(e.target.value)} name='password' id='password' placeholder='Password' />
				<button type='submit'>Login</button>
			</form>
			{message && (
				<p className={error ? '' : ''}>{message}</p>
			)}
		</>
	)
}

export default Login
