// https://docs.cypress.io/api/introduction/api.html

// Forms
describe('Forms Test', () => {
  it('LightningDistance Form', () => {
    cy.visit('/lightning-distance')

    cy.get('input').type(10)
    cy.get('form').submit()

    cy.contains('p span', 'The lightning is 3430 meters (or 3.43 kilometers) away from you')
  })
})
