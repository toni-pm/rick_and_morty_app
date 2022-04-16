import React from 'react'
import { logout } from '../actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      <p><Link to='/'>Home</Link></p>
      {user
        ? (
          <div>
            <span>Hello {user.nickname}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          )
        : (
          <>
            <p><Link to='/login'>Login</Link></p>
            <p><Link to='/register'>Sign Up</Link></p>
          </>
          )}
    </>
  )
}

export default Header
