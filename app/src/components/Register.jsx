import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../actions/auth.actions'

const Register = () => {
  const [error, setError] = useState(null)
  const [nickname, setNickname] = useState('tonipm')
  const [firstname, setFirstname] = useState('Toni')
  const [lastname, setLastname] = useState('Peraira')
  const [password, setPassword] = useState('1Very$$$ecurePassword6')
  const [passwordConfirmation, setPasswordConfirmation] = useState('1Very$$$ecurePassword6')

  const { message } = useSelector(state => state.message)

  const dispatch = useDispatch()

  const handleRegister = async e => {
    e.preventDefault()
    setError(false)

    dispatch(register({ nickname, firstname, lastname, password, passwordConfirmation }))
      .then(() => {
        setError(false)
      })
      .catch(() => {
        setError(true)
      })
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleRegister}>
        <input type='text' value={nickname} onChange={e => setNickname(e.target.value)} name='nickname' id='nickname' placeholder='Nickname' />
        <input type='text' value={firstname} onChange={e => setFirstname(e.target.value)} name='firstname' id='firstname' placeholder='Firstname' />
        <input type='text' value={lastname} onChange={e => setLastname(e.target.value)} name='lastname' id='lastname' placeholder='Lastname' />
        <input type='password' value={password} onChange={e => setPassword(e.target.value)} name='password' id='password' placeholder='Password' />
        <input type='password' value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} name='password_confirmation' id='password_confirmation' placeholder='Password confirmation' />
        <button type='submit'>Sign Up</button>
      </form>
      {message && (
        <p className={error ? '' : ''}>{message}</p>
      )}
    </>
  )
}

export default Register
