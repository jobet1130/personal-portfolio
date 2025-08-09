import { mount } from 'cypress/vue'
import Projects from '../../src/components/Projects.vue'

describe('Projects Component', () => {
  beforeEach(() => {
    mount(Projects)
  })

  it('should render projects section', () => {
    cy.get('.projects').should('exist')
  })

  it('should render projects section with all main elements', () => {
    // Check main projects section
    cy.get('.projects').should('be.visible')
    cy.get('.container').should('be.visible')
    cy.get('.projects-header').should('be.visible')
    cy.get('.projects-grid').should('be.visible')
  })

  it('should display correct header content', () => {
    // Check section title and subtitle
    cy.get('.section-title').should('contain.text', 'My Projects')
    cy.get('.section-subtitle')
      .should('contain.text', 'Here are some of the projects')
      .and('contain.text', 'unique challenge')
      .and('contain.text', 'learning experience')
  })

  it('should have all filter buttons with correct labels', () => {
    // Check all filter buttons exist
    cy.get('.filter-buttons .filter-btn').should('have.length', 4)
    
    // Check individual filter button labels
    cy.get('.filter-btn').eq(0).should('contain.text', 'All Projects')
    cy.get('.filter-btn').eq(1).should('contain.text', 'Featured')
    cy.get('.filter-btn').eq(2).should('contain.text', 'Web Apps')
    cy.get('.filter-btn').eq(3).should('contain.text', 'Mobile')
  })

  it('should have "All Projects" filter active by default', () => {
    cy.get('.filter-btn').first().should('have.class', 'active')
  })

  it('should allow clicking filter buttons', () => {
    // Test that filter buttons are clickable
    cy.get('.filter-btn').contains('Featured').click()
    cy.get('.filter-btn').contains('Web Apps').click()
    cy.get('.filter-btn').contains('All Projects').click()
    
    // Verify the component still functions after clicks
    cy.get('.projects-grid').should('be.visible')
  })

  it('should display project cards with required elements', () => {
    // Check that project cards exist
    cy.get('.project-card').should('have.length.greaterThan', 0)
    
    // Check first project card structure
    cy.get('.project-card').first().within(() => {
      cy.get('.project-image').should('be.visible')
      cy.get('.project-content').should('be.visible')
      cy.get('.project-title').should('be.visible')
      cy.get('.project-description').should('be.visible')
      cy.get('.project-technologies').should('be.visible')
    })
  })

  it('should display project images with proper attributes', () => {
    cy.get('.project-card').first().within(() => {
      cy.get('.project-image').should('exist')
      cy.get('.project-image img').should('exist')
      cy.get('.project-image img').should('have.attr', 'src')
      cy.get('.project-image img').should('have.attr', 'alt')
    })
  })

  it('should display technology tags for each project', () => {
    cy.get('.project-card').first().within(() => {
      cy.get('.tech-tag').should('have.length.greaterThan', 0)
      cy.get('.tech-tag').first().should('not.be.empty')
    })
  })

  it('should have accessible filter buttons', () => {
    // Check filter buttons exist and are clickable
    cy.get('.filter-btn').should('exist')
    cy.get('.filter-btn').should('be.visible')
    cy.get('.filter-btn').first().should('not.be.disabled')
  })
})