const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:9000/api'

class ApiError extends Error {
  constructor (obj = {}, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError)
    }

    const self = this
    this.name = 'ApiError'
    this.obj = obj
    this.date = new Date()
    this.status = obj.status || 500
    this.message = obj.message || 'Server Error'

    if (obj.errors) {
      this.message = ''
      this.obj.errors.forEach(err => {
        self.message += '\n' + err.msg
      })
    }
  }
}

const handleErrors = res => {
  if (!res.ok) {
    if (res.status === 401) {
      window.location.href = '/login'
    } else {
      return res.json().then(json => {
        console.error(json)
        throw new ApiError(json)
      })
    }
  }
  return res
}

const getUserStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  return user
}

const getAccessToken = () => {
  const user = getUserStorage()
  return user ? user.token : null
}

const call = (url, method = 'GET', data) => {
  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const authToken = getAccessToken()
  if (authToken) {
    config.headers.Authorization = getAccessToken()
  }
  if (method !== 'GET' && method !== 'DELETE') {
    config.body = JSON.stringify(data)
  }
  return fetch(`${apiUrl}/${url}`, config)
    .then(handleErrors)
    .then(res => res.json())
}

const get = async url => {
  return call(url, 'GET', null)
}

const delet = async url => {
  return call(url, 'DELETE', null)
}

const post = async (url, data) => {
  return call(url, 'POST', data)
}

const exportedObj = {
  getUserStorage,
  get,
  delet,
  post
}

export default exportedObj
