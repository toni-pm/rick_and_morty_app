import api from '../services/api'

const baseUrl = 'auth'

const login = async (nickname, password) => {
  return api.post(`${baseUrl}/login`, { nickname, password })
    .then(data => {
      if (data.token) {
        localStorage.setItem('user', JSON.stringify(data))
      }
      return data
    })
}

const register = async ({ nickname, firstname, lastname, password, passwordConfirmation }) => {
  return api.post(`${baseUrl}/register`, { nickname, firstname, lastname, password, passwordConfirmation })
}

const logout = () => {
  localStorage.removeItem('user')
}

const exportedObj = {
  login,
  register,
  logout
}

export default exportedObj
