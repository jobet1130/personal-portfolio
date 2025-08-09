import { mount } from 'cypress/vue'
import Values from '../../src/components/Values.vue'

describe('Values Component', () => {
  it('should mount successfully', () => {
    mount(Values)
    cy.get('section').should('exist')
  })

  it('should render main values section', () => {
    mount(Values)
    cy.get('.values').should('exist')
  })

  it('should display values container', () => {
    mount(Values)
    cy.get('.values-container').should('exist')
  })

  it('should show values header', () => {
    mount(Values)
    cy.get('.values-header').should('exist')
  })

  it('should display values title', () => {
    mount(Values)
    cy.get('.values-title').should('exist')
  })

  it('should show values intro', () => {
    mount(Values)
    cy.get('.values-intro').should('exist')
  })

  it('should render values grid', () => {
    mount(Values)
    cy.get('.values-grid').should('exist')
  })

  it('should display value cards', () => {
    mount(Values)
    cy.get('.value-card').should('exist')
  })

  it('should show value icons', () => {
    mount(Values)
    cy.get('.value-icon').should('exist')
  })

  it('should display value titles', () => {
    mount(Values)
    cy.get('.value-title').should('exist')
  })

  it('should show value descriptions', () => {
    mount(Values)
    cy.get('.value-description').should('exist')
  })

  it('should display value examples', () => {
    mount(Values)
    cy.get('.value-examples').should('exist')
  })

  it('should show example lists', () => {
    mount(Values)
    cy.get('.value-examples ul').should('exist')
  })

  it('should display list items', () => {
    mount(Values)
    cy.get('.value-examples li').should('exist')
  })

  it('should have correct number of cards', () => {
    mount(Values)
    cy.get('.value-card').should('have.length', 6)
  })
})