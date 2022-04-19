Cypress.Commands.add('register', ({ nickname, firstname, lastname, password, passwordConfirmation }) => {
	cy.visit('http://localhost:3000/register')
	cy.contains('Sign Up')
	cy.get('[placeholder="Nickname"]').type(nickname)
	cy.get('[placeholder="Firstname"]').type(firstname)
	cy.get('[placeholder="Lastname"]').type(lastname)
	cy.get('[placeholder="Password"]').type(password)
	cy.get('[placeholder="Password confirmation"]').type(passwordConfirmation)
	cy.get('form').submit()
})

Cypress.Commands.add('login', ({ nickname, password }) => {
	cy.visit('http://localhost:3000/login')
	cy.contains('Sign In')
	cy.get('[placeholder="Nickname"]').type(nickname)
	cy.get('[placeholder="Password"]').type(password)
	cy.get('form').submit()
	cy.url().should('eq', 'http://localhost:3000/')
	cy.contains('Hello ' + nickname + '!')
})

Cypress.Commands.add('logout', () => {
	cy.contains('Logout').click()
	cy.url().should('eq', 'http://localhost:3000/')
	cy.contains('Login')
})
