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
    return res.json().then(json => {
      console.error(json)
      throw new ApiError(json)
    })
  }
  return res
}

const call = (url, method = 'GET', data) => {
  return fetch(`${apiUrl}/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(handleErrors)
    .then(res => res.json())
}

const get = async url => {
  return call(url, 'GET', null)
}

const post = async (url, data) => {
  return call(url, 'POST', data)
}

const exportedObj = {
  get,
  post
}

export default exportedObj
