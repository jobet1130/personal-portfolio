import { mount } from 'cypress/vue'
import Navbar from '../../src/components/Navbar.vue'

describe('Navbar Component', () => {
  beforeEach(() => {
    // Mock the scrollIntoView function since it's used in the component
    cy.document().then((doc) => {
      cy.stub(doc, 'getElementById').returns({
        scrollIntoView: cy.stub().as('scrollIntoView')
      })
    })
  })

  it('should render navbar with brand and navigation links', () => {
    mount(Navbar)

    // Check brand
    cy.get('.brand-text').should('contain.text', 'Portfolio')

    // Check navigation links
    const expectedLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact']
    expectedLinks.forEach((link) => {
      cy.get('.nav-links').contains(link).should('be.visible')
    })
  })

  it('should toggle mobile menu', () => {
    mount(Navbar)
    cy.viewport(375, 667)

    // Mobile menu should be closed initially
    cy.get('.nav-links').should('not.have.class', 'nav-links-open')

    // Click mobile menu button
    cy.get('.mobile-menu-toggle').click()

    // Mobile menu should be open
    cy.get('.nav-links').should('have.class', 'nav-links-open')

    // Click again to close
    cy.get('.mobile-menu-toggle').click()

    // Mobile menu should be closed
    cy.get('.nav-links').should('not.have.class', 'nav-links-open')
  })

  it('should call scrollIntoView function when navigation links are clicked', () => {
    mount(Navbar)

    // Click on About link
    cy.get('.nav-links').contains('About').click()

    // Check if scrollIntoView was called
    cy.get('@scrollIntoView').should('have.been.called')
  })

  it('should have proper accessibility attributes', () => {
    mount(Navbar)

    // Check navigation role
    cy.get('.nav').should('have.attr', 'role', 'navigation')

    // Check mobile menu button aria-label
    cy.get('.mobile-menu-toggle').should('have.attr', 'aria-label')

    // Check that links are focusable
    cy.get('.nav-links a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href')
    })
  })

  it('should be responsive', () => {
    mount(Navbar)

    // Desktop view - mobile menu button should be hidden
    cy.viewport(1024, 768)
    cy.get('.mobile-menu-toggle').should('not.be.visible')
    cy.get('.nav-links').should('be.visible')

    // Mobile view - mobile menu button should be visible
    cy.viewport(375, 667)
    cy.get('.mobile-menu-toggle').should('be.visible')
  })

  it('should close mobile menu when clicking outside', () => {
    mount(Navbar)
    cy.viewport(375, 667)

    // Open mobile menu
    cy.get('.mobile-menu-toggle').click()
    cy.get('.nav-links').should('have.class', 'nav-links-open')

    // Click outside the menu (on the navbar brand)
    cy.get('.brand-text').click()

    // Menu should close
    cy.get('.nav-links').should('not.have.class', 'nav-links-open')
  })

  it('should handle keyboard navigation', () => {
    mount(Navbar)

    // Tab through navigation links
    cy.get('.nav-links a').first().focus()
    cy.focused().should('contain.text', 'Home')

    // Press Tab to move to next link
cy.focused().trigger('keydown', { keyCode: 9 })
    cy.focused().should('contain.text', 'About')

    // Press Enter to activate link
    cy.focused().type('{enter}')
    cy.get('@scrollIntoView').should('have.been.called')
  })

  it('should maintain state during rapid interactions', () => {
    mount(Navbar)
    cy.viewport(375, 667)

    // Rapidly toggle mobile menu
    cy.get('.mobile-menu-toggle').click()
    cy.get('.mobile-menu-toggle').click()
    cy.get('.mobile-menu-toggle').click()

    // Should end up in closed state
    cy.get('.nav-links').should('not.have.class', 'nav-links-open')
  })
})
