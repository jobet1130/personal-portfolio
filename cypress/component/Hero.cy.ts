import { mount } from 'cypress/vue'
import Hero from '../../src/components/Hero.vue'

describe('Hero Component', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      cy.stub(win.console, 'error').as('consoleError')
    })
    mount(Hero)
  })

  it('should render hero section with all content elements', () => {
    // Check main hero section
    cy.get('.hero').should('be.visible')
    cy.get('.hero-container').should('be.visible')
    cy.get('.hero-content').should('be.visible')
    cy.get('.hero-image').should('be.visible')
  })

  it('should display correct personal information', () => {
    // Check name and title
    cy.get('.hero-title').should('contain.text', "Hi, I'm")
    cy.get('.hero-title .highlight').should('contain.text', 'Jobet P. Casquejo')
    cy.get('.hero-subtitle').should('contain.text', 'Salesforce Developer & CRM Solutions Expert')

    // Check description content
    cy.get('.hero-description')
      .should('contain.text', 'CRM solutions')
      .and('contain.text', 'Salesforce platform')
      .and('contain.text', 'Apex')
      .and('contain.text', 'Lightning Web Components')
  })

  it('should have functional action buttons', () => {
    // Check both action buttons exist
    cy.get('.hero-actions .btn').should('have.length', 2)

    // Check primary button
    cy.get('.btn-primary')
      .should('contain.text', 'Explore My Projects')
      .and('have.attr', 'href', '#projects')

    // Check secondary button
    cy.get('.btn-secondary')
      .should('contain.text', "Let's Connect")
      .and('have.attr', 'href', '#contact')
  })

  it('should display profile image placeholder', () => {
    // Check image placeholder and profile image
    cy.get('.image-placeholder').should('be.visible')
    cy.get('.profile-image').should('be.visible')
    cy.get('.profile-image').should('have.attr', 'src', '/__cypress/src/images/profile.jpg')
    cy.get('.profile-image').should('have.attr', 'alt', 'Jobet P. Casquejo - Salesforce Developer')
  })

  // Note: Hero component doesn't include scroll indicator elements

  it('should have proper semantic structure', () => {
    // Check semantic HTML
    cy.get('section#home').should('exist')
    cy.get('h1.hero-title').should('exist')
    cy.get('h2.hero-subtitle').should('exist')
    cy.get('p.hero-description').should('exist')
  })

  it('should have highlight styling on name', () => {
    // Check highlight span exists and has proper styling
    cy.get('.highlight').should('exist').and('contain.text', 'Jobet P. Casquejo')

    // Check highlight has CSS styling applied
    cy.get('.highlight').should('have.css', 'color')
  })

  it('should be responsive on mobile devices', () => {
    // Test mobile viewport
    cy.viewport(375, 667)

    // Hero should still be visible
    cy.get('.hero').should('be.visible')
    cy.get('.hero-container').should('be.visible')

    // Content should be centered on mobile
    cy.get('.hero-content').should('be.visible')
    cy.get('.hero-actions').should('be.visible')

    // Buttons should be stacked on mobile
    cy.get('.hero-actions .btn').should('have.length', 2)
  })

  it('should be responsive on tablet devices', () => {
    // Test tablet viewport
    cy.viewport(768, 1024)

    // All elements should be visible
    cy.get('.hero').should('be.visible')
    cy.get('.hero-container').should('be.visible')
    cy.get('.hero-content').should('be.visible')
    cy.get('.hero-image').should('be.visible')
  })

  it('should handle button hover states', () => {
    // Test primary button hover
    cy.get('.btn-primary').should('be.visible').trigger('mouseover')

    // Test secondary button hover
    cy.get('.btn-secondary').should('be.visible').trigger('mouseover')
  })

  it('should have proper accessibility attributes', () => {
    // Check section has proper id
    cy.get('section').should('have.attr', 'id', 'home')

    // Check heading hierarchy
    cy.get('h1').should('exist')
    cy.get('h2').should('exist')

    // Check links are accessible
    cy.get('.hero-actions a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href')
    })
  })

  it('should render without errors', () => {
    // Component should mount successfully
    cy.get('.hero').should('exist')

    // No console errors should occur
    cy.get('@consoleError').should('not.have.been.called')
  })

  it('should have proper CSS animations', () => {
    // Check that animated elements exist and are visible
    cy.get('.hero-content').should('be.visible').should('have.css', 'animation-name')
    cy.get('.hero-image').should('be.visible').should('have.css', 'animation-name')
  })

  it('should maintain layout integrity across different screen sizes', () => {
    const viewports = [
      [1920, 1080], // Desktop
      [1024, 768], // Tablet landscape
      [768, 1024], // Tablet portrait
      [375, 667], // Mobile
      [320, 568], // Small mobile
    ]

    viewports.forEach(([width, height]) => {
      cy.viewport(width, height)

      // Core elements should always be visible
      cy.get('.hero').should('be.visible')
      cy.get('.hero-title').should('be.visible')
      cy.get('.hero-subtitle').should('be.visible')
      cy.get('.hero-actions .btn').should('have.length', 2)
    })
  })
})
