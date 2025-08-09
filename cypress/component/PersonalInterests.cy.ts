import { mount } from 'cypress/vue'
import PersonalInterests from '../../src/components/PersonalInterests.vue'

describe('PersonalInterests Component', () => {
  beforeEach(() => {
    mount(PersonalInterests)
  })

  it('should render personal interests section', () => {
    cy.get('.personal-interests').should('be.visible')
    cy.get('.interests-container').should('be.visible')
  })

  it('should display header information', () => {
    cy.get('.interests-header').should('be.visible')
    cy.get('.interests-title').should('be.visible')
    cy.get('.interests-intro').should('be.visible')
  })

  it('should render interests content', () => {
    cy.get('.interests-content').should('be.visible')
    cy.get('.interests-grid').should('be.visible')
  })

  it('should display interest cards', () => {
    cy.get('.interest-card').should('have.length.greaterThan', 0)
  })

  it('should show interest card structure', () => {
    cy.get('.interest-card').first().within(() => {
      cy.get('.interest-icon').should('be.visible')
      cy.get('.interest-title').should('be.visible')
      cy.get('.interest-description').should('be.visible')
    })
  })

  it('should display fun facts section', () => {
    cy.get('.fun-facts').should('be.visible')
    cy.get('.fun-facts-title').should('be.visible')
    cy.get('.facts-grid').should('be.visible')
  })

  it('should show fun fact items', () => {
    cy.get('.fact-item').should('have.length.greaterThan', 0)
    cy.get('.fact-item').first().within(() => {
      cy.get('.fact-icon').should('be.visible')
      cy.get('.fact-text').should('be.visible')
    })
  })

  it('should display icons', () => {
    cy.get('.interest-icon').should('have.length.greaterThan', 0)
    cy.get('.fact-icon').should('have.length.greaterThan', 0)
  })

  it('should have meaningful content', () => {
    cy.get('.interest-description').should('have.length.greaterThan', 0)
    cy.get('.fact-text').should('have.length.greaterThan', 0)
  })

  it('should render without errors', () => {
    cy.get('.personal-interests').should('be.visible')
    cy.get('.interest-card').should('have.length.greaterThan', 0)
    cy.get('.fact-item').should('have.length.greaterThan', 0)
  })
})