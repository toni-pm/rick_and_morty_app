const moongose = require('mongoose')
const server = require('../bin/www')
const User = require('../models/user.model')
const { api, API_PREFIX, initialUsers } = require('./jest.helpers')

beforeAll(async () => {
  await User.deleteMany({})

  for (const user of initialUsers) {
    const newUser = new User(user)
    await newUser.setPassword(user.password)
    await newUser.save()
  }
})

afterAll(() => {
  moongose.connection.close()
  server.close()
})

const passwordAndNicknamePolicyTests = apiReq => {
  const passwordPolicyMsg = 'Password must be between 16 and 99 characters and contain at least: 1 number, 1 symbol, 1 capital letter and 1 lower letter.'

  test('Nickname cannot contain symbols other than - or _', async () => {
    const user = {
      nickname: 'nickname\'',
      password: 'Testing1234567890123!'
    }
    if (apiReq === 'register') {
      user.password_confirmation = user.password
    }

    const response = await api
      .post(`${API_PREFIX}/auth/${apiReq}`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError('Nickname cannot contain special characters except - or _')
  })

  test('Nickname must have at least 4 characters.', async () => {
    const user = {
      nickname: 'ton',
      password: 'Testing1234567890123!'
    }
    if (apiReq === 'register') {
      user.password_confirmation = user.password
    }

    const response = await api
      .post(`${API_PREFIX}/auth/${apiReq}`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError('Nickname must be between 4 and 16 characters.')
  })

  test('Nickname must have at most 16 characters.', async () => {
    const user = {
      nickname: 'invalid_nickname_at_most_16',
      password: 'Testing1234567890123!'
    }
    if (apiReq === 'register') {
      user.password_confirmation = user.password
    }

    const response = await api
      .post(`${API_PREFIX}/auth/${apiReq}`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError('Nickname must be between 4 and 16 characters.')
  })

  test('Password must have at least 16 characters', async () => {
    const user = {
      nickname: 'tonipm_password_at_least_16_characters',
      password: 'T1#sting'
    }
    if (apiReq === 'register') {
      user.password_confirmation = user.password
    }

    const response = await api
      .post(`${API_PREFIX}/auth/${apiReq}`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError(passwordPolicyMsg)
  })

  test('Password must have at most 99 characters', async () => {
    const user = {
      nickname: 'tonipm_password_at_most_99_characters',
      password: 'T1#sting12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012'
    }
    if (apiReq === 'register') {
      user.password_confirmation = user.password
    }

    const response = await api
      .post(`${API_PREFIX}/auth/${apiReq}`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError(passwordPolicyMsg)
  })

  test('Password must have at least 1 number', async () => {
    const user = {
      nickname: 'tonipm_password_at_least_1_number',
      password: '##Supersecurepassword'
    }
    if (apiReq === 'register') {
      user.password_confirmation = user.password
    }

    const response = await api
      .post(`${API_PREFIX}/auth/${apiReq}`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError(passwordPolicyMsg)
  })

  test('Password must have at least 1 symbol', async () => {
    const user = {
      nickname: 'tonipm_password_at_least_1_symbol',
      password: 'Supersecurepassword1234'
    }
    if (apiReq === 'register') {
      user.password_confirmation = user.password
    }

    const response = await api
      .post(`${API_PREFIX}/auth/${apiReq}`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError(passwordPolicyMsg)
  })

  test('Password must have at least 1 capital letter', async () => {
    const user = {
      nickname: 'tonipm_password_at_least_1_capital_letter',
      password: '###supersecurepassword1234'
    }
    if (apiReq === 'register') {
      user.password_confirmation = user.password
    }

    const response = await api
      .post(`${API_PREFIX}/auth/${apiReq}`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError(passwordPolicyMsg)
  })

  test('Password must have at least 1 lower letter', async () => {
    const user = {
      nickname: 'tonipm_password_at_least_1_lower_letter',
      password: '###SUPERSECUREPASSWORD1234'
    }
    if (apiReq === 'register') {
      user.password_confirmation = user.password
    }

    const response = await api
      .post(`${API_PREFIX}/auth/${apiReq}`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError(passwordPolicyMsg)
  })
}

describe('Login', () => {
  test('Success with access token', async () => {
    const user = initialUsers[0]

    const response = await api
      .post(`${API_PREFIX}/auth/login`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.token).toBeDefined()
    expect(response.body.token.startsWith('Bearer ')).toBe(true)
  })

  test('Invalid credentials', async () => {
    const user = {
      nickname: initialUsers[0].nickname,
      password: initialUsers[0].password + '+different'
    }

    const response = await api
      .post(`${API_PREFIX}/auth/login`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(403)
    expect(response.body.message).toBe('Invalid credentials.')
  })

  passwordAndNicknamePolicyTests('login')
})

describe('Register', () => {
  test('Nickname already exist', async () => {
    const user = initialUsers[0]
    user.password_confirmation = user.password

    const response = await api
      .post(`${API_PREFIX}/auth/register`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response.body.message).toBe('User already exists.')
  })

  test('Passwords do not match', async () => {
    const user = {
      nickname: 'passwd_not_match',
      password: '1Very$$$ecurePassword6'
    }
    user.password_confirmation = user.password + 'diff'

    const response = await api
      .post(`${API_PREFIX}/auth/register`)
      .set('Accept', 'application/json')
      .send(user)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError('Passwords do not match.')
  })

  passwordAndNicknamePolicyTests('register')
})
