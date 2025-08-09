import { mount } from 'cypress/vue'
import Skills from '../../src/components/Skills.vue'

describe('Skills Component', () => {
  it('should mount the Skills component successfully', () => {
    mount(Skills)
    cy.get('.skills').should('exist')
  })

  it('should display the main title', () => {
    mount(Skills)
    cy.contains('Technical Skills').should('be.visible')
  })

  it('should render the component structure', () => {
    mount(Skills)
    cy.get('.skills').should('be.visible')
    cy.get('.skills-container').should('exist')
  })

  it('should show skills header', () => {
    mount(Skills)
    cy.get('.skills-header').should('be.visible')
    cy.get('.skills-title').should('contain.text', 'Technical Skills')
  })

  it('should render skills content area', () => {
    mount(Skills)
    cy.get('.skills-content').should('be.visible')
  })

  it('should display category buttons section', () => {
    mount(Skills)
    cy.get('.skills-categories').should('be.visible')
  })

  it('should show skills grid', () => {
    mount(Skills)
    cy.get('.skills-grid').should('be.visible')
  })

  it('should display skills summary', () => {
    mount(Skills)
    cy.get('.skills-summary').should('be.visible')
  })

  it('should render without throwing errors', () => {
    mount(Skills)
    cy.get('.skills').should('be.visible')
    // If we get here, the component mounted successfully
  })
})