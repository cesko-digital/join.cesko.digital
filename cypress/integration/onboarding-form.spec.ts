/// <reference types="cypress" />

describe('Onboarding form', () => {
  beforeEach(() => {
    cy.visit('/').get('main')
  })

  it('should successfully load', () => {
    cy.get('form')
      .findByText(/Kontaktní formulář/i)
      .should('exist')
  })
})
