import { mount } from 'cypress/vue'
import Layout from '../../src/components/Layout.vue'

describe('Layout Component', () => {
  it('should render the layout structure', () => {
    mount(Layout)
    
    cy.get('.layout').should('be.visible')
    cy.get('.main-content').should('be.visible')
  })

  it('should render Navbar component', () => {
    mount(Layout)
    cy.viewport(1280, 720)
    
    // Check if Navbar is rendered
    cy.get('header').should('be.visible')
    cy.get('nav').should('be.visible')
    cy.get('.nav-brand').should('be.visible')
    cy.get('.nav-links').should('be.visible')
  })

  it('should render Footer component', () => {
    mount(Layout)
    
    // Check if Footer is rendered
    cy.get('footer').should('be.visible')
    cy.get('.footer-content').should('be.visible')
    cy.get('.social-links').should('be.visible')
  })

  it('should render slot content', () => {
    const slotContent = '<div data-cy="test-content">Test Content</div>'
    
    mount(Layout, {
      slots: {
        default: slotContent
      }
    })
    
    cy.get('[data-cy="test-content"]')
      .should('be.visible')
      .should('contain.text', 'Test Content')
  })

  it('should have proper layout structure with flexbox', () => {
    mount(Layout)
    
    cy.get('.layout')
      .should('have.css', 'display', 'flex')
      .should('have.css', 'flex-direction', 'column')
      .should('have.css', 'min-height')
  })

  it('should have proper main content styling', () => {
    mount(Layout)
    
    cy.get('.main-content')
      .should('have.css', 'flex', '1 1 0%')
      .should('have.css', 'margin-top', '80px')
  })

  it('should maintain proper component order', () => {
    mount(Layout)
    
    cy.get('.layout').within(() => {
      // Navbar should be first
      cy.get('header').should('exist')
      
      // Main content should be second
      cy.get('.main-content').should('exist')
      
      // Footer should be last
      cy.get('footer').should('exist')
    })
    
    // Verify the order by checking DOM structure
    cy.get('.layout').children().should('have.length', 3)
    cy.get('.layout').children().eq(0).should('match', 'header')
    cy.get('.layout').children().eq(1).should('have.class', 'main-content')
    cy.get('.layout').children().eq(2).should('match', 'footer')
  })

  it('should handle complex slot content', () => {
    const complexSlotContent = `
      <section id="hero">
        <h1>Hero Section</h1>
      </section>
      <section id="about">
        <h2>About Section</h2>
        <p>About content</p>
      </section>
    `
    
    mount(Layout, {
      slots: {
        default: complexSlotContent
      }
    })
    
    cy.get('#hero').should('be.visible').should('contain.text', 'Hero Section')
    cy.get('#about').should('be.visible').should('contain.text', 'About Section')
  })

  it('should maintain responsive design', () => {
    mount(Layout)
    
    // Test mobile viewport
    cy.viewport(375, 667)
    cy.get('.layout').should('be.visible')
    cy.get('header').should('be.visible')
    cy.get('.main-content').should('be.visible')
    cy.get('footer').should('be.visible')
    
    // Test tablet viewport
    cy.viewport(768, 1024)
    cy.get('.layout').should('be.visible')
    cy.get('header').should('be.visible')
    cy.get('.main-content').should('be.visible')
    cy.get('footer').should('be.visible')
    
    // Test desktop viewport
    cy.viewport(1200, 800)
    cy.get('.layout').should('be.visible')
    cy.get('header').should('be.visible')
    cy.get('.main-content').should('be.visible')
    cy.get('footer').should('be.visible')
  })

  it('should handle navigation functionality within layout', () => {
    mount(Layout)
    
    // Test mobile menu toggle
    cy.viewport(375, 667)
    cy.get('.mobile-menu-toggle').should('be.visible').click()
    cy.get('.nav-links').should('have.class', 'nav-links-open')
    
    // Close mobile menu
    cy.get('.mobile-menu-toggle').click()
    cy.get('.nav-links').should('not.have.class', 'nav-links-open')
  })

  it('should have proper accessibility structure', () => {
    mount(Layout)
    
    // Check semantic HTML structure
    cy.get('header').should('exist')
    cy.get('main').should('exist')
    cy.get('footer').should('exist')
    
    // Check navigation accessibility
    cy.get('nav[role="navigation"]').should('exist')
    cy.get('nav[aria-label="Main navigation"]').should('exist')
  })

  it('should handle empty slot gracefully', () => {
    mount(Layout)
    
    // Layout should still render properly even with empty slot
    cy.get('.layout').should('be.visible')
    cy.get('header').should('be.visible')
    cy.get('.main-content').should('be.visible')
    cy.get('footer').should('be.visible')
  })

  it('should maintain proper z-index layering', () => {
    mount(Layout)
    
    // Header should have high z-index for fixed positioning
    cy.get('header').should('have.css', 'position', 'fixed')
    cy.get('header').should('have.css', 'z-index', '1000')
  })
})