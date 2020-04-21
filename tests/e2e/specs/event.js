// https://docs.cypress.io/api/introduction/api.html

// Events
describe('Events Test', () => {
  it('LightningDistance button click test', () => {
    cy.visit('/lightning-distance')

    cy.get('button[type=button]').trigger('click')

    cy.wait(1000)

    cy.get('button[type=button]').trigger('click')

    cy.contains('span', 'The lightning is 354 meters (or 0.35 kilometers) away from you')
  })
})
