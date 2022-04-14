const { api, API_PREFIX } = require('./jest.helpers')

describe('Character list', () => {
  test('it should display the first page of 20 characters', async () => {
    const response = await api
      .get(`${API_PREFIX}/characters?page=1`)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    expect(response.body.results).toHaveLength(20)
  })

  test('a page less than 1 should return the first character page', async () => {
    const response = await api
      .get(`${API_PREFIX}/characters?page=0`)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    expect(response.body.results).toHaveLength(20)
  })

  test('a page with an invalid format should return the first character page', async () => {
    const response = await api
      .get(`${API_PREFIX}/characters?page=asdfghjkl`)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    expect(response.body.results).toHaveLength(20)
  })

  test('exceed the maximum number of characters should return a 400 error', async () => {
    const response = await api
      .get(`${API_PREFIX}/characters?page=999999`)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError('There is nothing here.')
  })
})

describe('Character details', () => {
  test('it should display the details of the first character', async () => {
    const id = 1
    const response = await api
      .get(`${API_PREFIX}/characters/${id}`)
      .expect('Content-Type', /application\/json/)
      .expect(200)
    expect(response.body.id).toBe(id)
  })

  test('a character that does not exist should return a 404 error', async () => {
    const id = 99999
    await api
      .get(`${API_PREFIX}/characters/${id}`)
      .expect('Content-Type', /application\/json/)
      .expect(404)
  })

  test('an id less than 1 should return a 400 error', async () => {
    const response = await api
      .get(`${API_PREFIX}/characters/0`)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError('Invalid character.')
  })

  test('an invalid id format should return a 400 error', async () => {
    const response = await api
      .get(`${API_PREFIX}/characters/asdfghjkl`)
      .expect('Content-Type', /application\/json/)
      .expect(400)
    expect(response).toBeValidationError('Invalid character.')
  })
})