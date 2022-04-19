import React, { useState } from 'react'
import { login } from '../actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

const Login = () => {
	const [error, setError] = useState(null)
	const [nickname, setNickname] = useState('')
	const [password, setPassword] = useState('')

	const { user } = useSelector(state => state.auth)
	const { message } = useSelector(state => state.message)

	const dispatch = useDispatch()

	const handleLogin = async e => {
		e.preventDefault()

		if (nickname && password) {
			dispatch(login(nickname, password))
				.then(() => {
					setError(false)
				})
				.catch(() => {
					setError(true)
				})
		}
	}

	if (user) {
		return <Navigate to='/' />
	}

	return (
		<div id='login'>
			<h1>Sign In</h1>
			<form onSubmit={handleLogin} className='form'>
				<input type='text' value={nickname} onChange={e => setNickname(e.target.value)} name='nickname' id='nickname' placeholder='Nickname' />
				<input type='password' value={password} onChange={e => setPassword(e.target.value)} name='password' id='password' placeholder='Password' />
				<p><Link to={'/register'} className='msg-signup'>{'Don\'t have an account yet? Sign up!'}</Link></p>
				<button type='submit'>Sign In</button>
				{message && (
					<p className={error === false ? 'message success' : error === true ? 'message error' : 'message'}>{message}</p>
				)}
			</form>
		</div>
	)
}

export default Login
