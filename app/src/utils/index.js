export const getUserStorage = () => {
	const user = JSON.parse(localStorage.getItem('user'))
	return user
}

export const getAccessToken = () => {
	const user = getUserStorage()
	return user ? user.token : null
}
