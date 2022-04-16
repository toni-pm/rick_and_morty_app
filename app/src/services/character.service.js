const apiUrl = 'http://localhost:8000/api/character'

export const getCharactersByPage = async (page = 1) => {
  const response = await fetch(`${apiUrl}?page=${page}`)
  const data = await response.json()
  return data.results
}

export const getCharacterDetails = async id => {
  const response = await fetch(`${apiUrl}/${id}`)
  const data = await response.json()
  return data
}
