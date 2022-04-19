let nickname = ''
let prevNickname = ''
let password = 'Testing1234$$'

describe('Auth functions', () => {
	password = 'Testing1234$$'
	const firstname = 'Toni'
	const lastname = 'Peraira'
	let passwordConfirmation = 'Testing1234$$'
	beforeEach(() => {
		cy.visit('http://localhost:3000/')
		nickname = 'testing-' + (Math.random() + 1).toString(36).substring(7)
	})

	it('Register fails because nickname is too short', () => {
		nickname = 'tes'
		password = 'Testing1234$$'
		const passwordConfirmation = 'Testing1234$$'
		cy.register({ nickname, firstname, lastname, password, passwordConfirmation })
		cy.get('.message').contains('Nickname must be between 4 and 16 characters.')
	})

	it('Register fails because the passwords do not match', () => {
		password = 'Testing1234$$'
		passwordConfirmation = 'Testing1234'
		cy.register({ nickname, firstname, lastname, password, passwordConfirmation })
		cy.get('.message').contains('Passwords do not match.')
	})

	it('Register fails because the password is not valid', () => {
		password = 'Testing1234'
		passwordConfirmation = 'Testing1234'
		cy.register({ nickname, firstname, lastname, password, passwordConfirmation })
		cy.get('.message').contains('Password must be between 16 and 99 characters and contain at least: 1 number, 1 symbol, 1 capital letter and 1 lower letter.')
	})

	it('Register works and redirects to the main page', () => {
		password = 'Testing1234$$'
		passwordConfirmation = 'Testing1234$$'
		prevNickname = nickname
		cy.register({ nickname, firstname, lastname, password, passwordConfirmation })
		cy.url().should('eq', 'http://localhost:3000/')
		cy.contains('Hello ' + nickname + '!')
	})

	it('Register fails because user already exists', () => {
		cy.register({ nickname: prevNickname, firstname, lastname, password, passwordConfirmation })
		cy.get('.message').contains('User already exists.')
	})

	it('Invalid credentials login', () => {
		cy.visit('http://localhost:3000/login')
		cy.contains('Sign In')
		cy.get('[placeholder="Nickname"]').type(nickname)
		cy.get('[placeholder="Password"]').type(password)
		cy.get('form').submit()
		cy.get('.message').contains('Invalid credentials.')
	})

	it('Login success', () => {
		cy.login({ nickname: prevNickname, password })
	})

	it('Logout success', () => {
		cy.login({ nickname: prevNickname, password })
		cy.contains('Logout').click()
		cy.url().should('eq', 'http://localhost:3000/')
		cy.contains('Login')
	})
})

describe('Favorites functions', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/')
		cy.login({ nickname: prevNickname, password })
	})

	it('Can add Rick Sanchez to favorites', () => {
		cy.get('.character-info').first()
			.within(() => {
				cy.contains('Rick Sanchez')
				cy.get('.favorite-star').should('have.class', 'no-fav').click()
				cy.get('.favorite-star').should('have.class', 'is-fav')
			})
		cy.visit('http://localhost:3000/details/1')
		cy.get('.favorite-star').should('have.class', 'is-fav')
	})

	it('Can remove Rick Sanchez from favorites', () => {
		cy.visit('http://localhost:3000/details/1')
		cy.get('.favorite-star').should('have.class', 'is-fav')
		cy.get('.favorite-star').click()
		cy.get('.favorite-star').should('have.class', 'no-fav')
		cy.visit('http://localhost:3000')
		cy.get('.character-info').first()
			.within(() => {
				cy.contains('Rick Sanchez')
				cy.get('.favorite-star').should('have.class', 'no-fav')
			})
	})
})
