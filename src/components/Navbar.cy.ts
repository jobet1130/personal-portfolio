import { mount } from 'cypress/vue'
import Navbar from '../../../src/components/Navbar.vue'

describe('Navbar Component', () => {
  beforeEach(() => {
    // Mock the scrollTo function since it's used in the component
    cy.window().then((win) => {
      win.scrollTo = cy.stub().as('scrollTo')
    })
  })

  it('should render navbar with brand and navigation links', () => {
    cy.mount(Navbar)
    
    // Check brand
    cy.get('.navbar-brand').should('contain.text', 'Portfolio')
    
    // Check navigation links
    const expectedLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact']
    expectedLinks.forEach(link => {
      cy.get('nav').contains(link).should('be.visible')
    })
  })

  it('should toggle mobile menu', () => {
    cy.mount(Navbar)
    cy.viewport(375, 667)
    
    // Mobile menu should be closed initially
    cy.get('.mobile-menu').should('not.have.class', 'active')
    
    // Click mobile menu button
    cy.get('.mobile-menu-button').click()
    
    // Mobile menu should be open
    cy.get('.mobile-menu').should('have.class', 'active')
    
    // Click again to close
    cy.get('.mobile-menu-button').click()
    
    // Mobile menu should be closed
    cy.get('.mobile-menu').should('not.have.class', 'active')
  })

  it('should call scrollTo function when navigation links are clicked', () => {
    cy.mount(Navbar)
    
    // Click on About link
    cy.get('nav').contains('About').click()
    
    // Check if scrollTo was called
    cy.get('@scrollTo').should('have.been.called')
  })

  it('should have proper accessibility attributes', () => {
    cy.mount(Navbar)
    
    // Check navigation role
    cy.get('nav').should('have.attr', 'role', 'navigation')
    
    // Check mobile menu button aria-label
    cy.get('.mobile-menu-button').should('have.attr', 'aria-label')
    
    // Check that links are focusable
    cy.get('nav a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href')
    })
  })

  it('should be responsive', () => {
    cy.mount(Navbar)
    
    // Desktop view - mobile menu button should be hidden
    cy.viewport(1024, 768)
    cy.get('.mobile-menu-button').should('not.be.visible')
    cy.get('.desktop-nav').should('be.visible')
    
    // Mobile view - mobile menu button should be visible
    cy.viewport(375, 667)
    cy.get('.mobile-menu-button').should('be.visible')
  })

  it('should close mobile menu when clicking outside', () => {
    cy.mount(Navbar)
    cy.viewport(375, 667)
    
    // Open mobile menu
    cy.get('.mobile-menu-button').click()
    cy.get('.mobile-menu').should('have.class', 'active')
    
    // Click outside the menu (on the navbar brand)
    cy.get('.navbar-brand').click()
    
    // Menu should close
    cy.get('.mobile-menu').should('not.have.class', 'active')
  })

  it('should handle keyboard navigation', () => {
    cy.mount(Navbar)
    
    // Tab through navigation links
    cy.get('nav a').first().focus()
    cy.focused().should('contain.text', 'Home')
    
    // Press Tab to move to next link
    cy.focused().tab()
    cy.focused().should('contain.text', 'About')
    
    // Press Enter to activate link
    cy.focused().type('{enter}')
    cy.get('@scrollTo').should('have.been.called')
  })

  it('should maintain state during rapid interactions', () => {
    cy.mount(Navbar)
    cy.viewport(375, 667)
    
    // Rapidly toggle mobile menu
    cy.get('.mobile-menu-button').click()
    cy.get('.mobile-menu-button').click()
    cy.get('.mobile-menu-button').click()
    
    // Should end up in closed state
    cy.get('.mobile-menu').should('not.have.class', 'active')
  })
})