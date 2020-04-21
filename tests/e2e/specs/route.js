// https://docs.cypress.io/api/introduction/api.html

// Route
describe('Route Test', () => {
  it('Check if pages heading are correct', () => {
    // Home
    cy.visit('/')
    cy.contains('h2', 'Playground')

    // Lightning Distance
    cy.visit('/lightning-distance')
    cy.contains('h2', 'Lightning Distance Calculator')
  })

  it('Check if pages titles are correct', () => {
    // Home
    cy.visit('/')
    cy.title().should('eq', 'userjapa')

    // Lightning Distance
    cy.visit('/lightning-distance')
    cy.title().should('eq', 'Lightning Distance Calculator')
  })
})
