/// <reference types="cypress" />

describe('Onboarding form', () => {
  beforeEach(() => {
    cy.visit('/').get('main')
  })

  it('should successfully load', () => {
    cy.get('form')
      .findByText(/Představ se/i)
      .should('exist')
  })
})
