import React from 'react'
import './App.css'
import Header from './components/Header'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import CharacterDetails from './components/CharacterDetails'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

function App () {
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
