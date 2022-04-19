import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { register } from '../actions/auth.actions'

const Register = () => {
	const [error, setError] = useState(null)
	const [nickname, setNickname] = useState('')
	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')

	const { user } = useSelector(state => state.auth)
	const { message } = useSelector(state => state.message)

	const dispatch = useDispatch()

	const handleRegister = async e => {
		e.preventDefault()

		if (nickname && password && passwordConfirmation) {
			dispatch(register({ nickname, firstname, lastname, password, passwordConfirmation }))
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
		<div id='register'>
			<h1>Sign Up</h1>
			<form onSubmit={handleRegister} className='form'>
				<input type='text' value={nickname} onChange={e => setNickname(e.target.value)} name='nickname' id='nickname' placeholder='Nickname' />
				<input type='text' value={firstname} onChange={e => setFirstname(e.target.value)} name='firstname' id='firstname' placeholder='Firstname' />
				<input type='text' value={lastname} onChange={e => setLastname(e.target.value)} name='lastname' id='lastname' placeholder='Lastname' />
				<input type='password' value={password} onChange={e => setPassword(e.target.value)} name='password' id='password' placeholder='Password' />
				<input type='password' value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} name='password_confirmation' id='password_confirmation' placeholder='Password confirmation' />
				<button type='submit'>Sign Up</button>
				{message && (
					<p className={error === false ? 'message success' : error === true ? 'message error' : 'message'}>{message}</p>
				)}
			</form>
		</div>
	)
}

export default Register
