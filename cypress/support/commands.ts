// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to select elements by data-cy attribute
Cypress.Commands.add('dataCy', (value: string) => {
  return cy.get(`[data-cy=${value}]`)
})

// Custom command to check if element is in viewport
Cypress.Commands.add('isInViewport', { prevSubject: true }, (subject) => {
  const bottom = Cypress.$(cy.state('window')).height()
  const rect = subject[0].getBoundingClientRect()

  expect(rect.top).to.be.lessThan(bottom)
  expect(rect.bottom).to.be.greaterThan(0)
  
  return subject
})

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().should('have.property', 'document')
  cy.document().should('have.property', 'readyState', 'complete')
})

// Custom command to scroll to element smoothly
Cypress.Commands.add('scrollToElement', (selector: string) => {
  cy.get(selector).scrollIntoView({ behavior: 'smooth' })
  cy.wait(500) // Wait for smooth scroll to complete
})

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<JQuery<HTMLElement>>
      isInViewport(): Chainable<JQuery<HTMLElement>>
      waitForPageLoad(): Chainable<Window>
      scrollToElement(selector: string): Chainable<JQuery<HTMLElement>>
    }
  }
}