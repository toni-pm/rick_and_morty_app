
describe('Rick & Morty Characters', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000/')
	})

	it('App is ready', () => {
		cy.contains('Home')
	})

	it('Contains Rick Sanchez character', () => {
		cy.contains('Rick Sanchez')
	})

	it('Contains Morty Smith character', () => {
		cy.contains('Morty Smith')
	})

	it('Contains Ants in my Eye character', () => {
		cy.contains('Ants in my Eye')
	})

	it('Can navigate to second page', () => {
		cy.get('.btn-next').first().click()
		cy.get('select').first().should('have.value', '2')
		cy.contains('Aqua Morty')
	})

	it('Can navigate to last page', () => {
		const lastPage = '42'
		cy.get('select').first().select(lastPage)
		cy.get('select').first().should('have.value', lastPage)
		cy.contains('Gotron')
	})

	it('Can return to first page', () => {
		cy.get('select').first().select('1')
		cy.contains('Rick Sanchez')
	})

	it('Can see the details of Rick Sanchez', () => {
		cy.get('select').first().select('1')
		cy.contains('Rick Sanchez').click()
		cy.url().should('eq', 'http://localhost:3000/details/1')
		cy.contains('Rick Sanchez')
	})

	it('Can see the details of Morty Smith', () => {
		cy.visit('http://localhost:3000/details/2')
		cy.contains('Morty Smith')
	})
})
