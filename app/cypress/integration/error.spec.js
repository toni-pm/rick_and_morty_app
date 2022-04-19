
describe('Error pages', () => {
	it('Error 404 Page not found works', () => {
		cy.visit('http://localhost:3000/testing')
		cy.contains('It seems that the page you are looking for is not in this universe.')
	})
	it('Default error works', () => {
		cy.visit('http://localhost:3000/details/9999')
		cy.contains('Oops! Something went wrong! :(')
	})
})
