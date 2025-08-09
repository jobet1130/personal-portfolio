import { mount } from 'cypress/vue'
import Timeline from '../../src/components/Timeline.vue'

describe('Timeline Component', () => {
  beforeEach(() => {
    mount(Timeline)
  })

  it('should render timeline section', () => {
    cy.get('.timeline').should('be.visible')
    cy.get('.timeline-container').should('be.visible')
  })

  it('should display header information', () => {
    cy.get('.timeline-header').should('be.visible')
    cy.get('.timeline-title').should('be.visible')
    cy.get('.timeline-intro').should('be.visible')
  })

  it('should render timeline content', () => {
    cy.get('.timeline-content').should('be.visible')
  })

  it('should display timeline items', () => {
    cy.get('.timeline-item').should('have.length.greaterThan', 0)
  })

  it('should show timeline cards', () => {
    cy.get('.timeline-card').should('have.length.greaterThan', 0)
    cy.get('.timeline-card').first().should('be.visible')
  })

  it('should display timeline icons', () => {
    cy.get('.timeline-icon').should('have.length.greaterThan', 0)
    cy.get('.timeline-icon').first().should('be.visible')
  })

  it('should show dates and titles', () => {
    cy.get('.timeline-date').should('have.length.greaterThan', 0)
    cy.get('.timeline-title-item').should('have.length.greaterThan', 0)
  })

  it('should display company information', () => {
    cy.get('.timeline-company').should('have.length.greaterThan', 0)
    cy.get('.timeline-description').should('have.length.greaterThan', 0)
  })

  it('should show skills', () => {
    cy.get('.timeline-skills').should('have.length.greaterThan', 0)
    cy.get('.skill-tag').should('have.length.greaterThan', 0)
  })

  it('should render without errors', () => {
    cy.get('.timeline').should('be.visible')
    cy.get('.timeline-item').should('have.length.greaterThan', 0)
  })
})