describe('Portfolio Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('body').should('be.visible')
  })

  it('should load the homepage successfully', () => {
    cy.title().should('contain', 'Personal Portfolio')
    cy.get('body').should('be.visible')
  })

  it('should display the main layout components', () => {
    // Check if navbar is present
    cy.get('nav', { timeout: 10000 }).should('be.visible')
    cy.get('.nav-brand').should('contain.text', 'Portfolio')

    // Check if main content area is present
    cy.get('main', { timeout: 10000 }).should('be.visible')

    // Check if footer is present
    cy.get('footer', { timeout: 10000 }).should('be.visible')
    cy.get('footer').should('contain.text', new Date().getFullYear().toString())
  })

  it('should have working navigation links', () => {
    // Test navigation links
    const navLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact']

    navLinks.forEach((link) => {
      cy.get('nav', { timeout: 10000 }).contains(link).should('be.visible')
    })
  })

  it('should have mobile menu toggle functionality', () => {
    // Set mobile viewport
    cy.viewport(375, 667)

    // Check mobile menu toggle exists
    cy.get('.mobile-menu-toggle', { timeout: 10000 }).should('be.visible')

    // Click to open mobile menu
    cy.get('.mobile-menu-toggle').click()
    cy.get('.nav-links', { timeout: 5000 }).should('have.class', 'nav-links-open')

    // Click to close mobile menu
    cy.get('.mobile-menu-toggle').click()
    cy.get('.nav-links', { timeout: 5000 }).should('not.have.class', 'nav-links-open')
  })

  it('should have accessible navigation', () => {
    // Check for proper ARIA labels and roles
    cy.get('nav', { timeout: 10000 }).should('exist')
    cy.get('nav a', { timeout: 10000 }).each(($link) => {
      cy.wrap($link).should('have.attr', 'href')
    })

    // Check mobile menu button accessibility
    cy.viewport(375, 667)
    cy.get('.mobile-menu-toggle', { timeout: 10000 }).should('be.visible')
  })

  it('should display social links in footer', () => {
    // Check for social links
    cy.get('footer .social-links', { timeout: 10000 }).should('be.visible')
    cy.get('footer .social-links a', { timeout: 10000 }).should('have.length.at.least', 1)

    // Check that social links have proper attributes
    cy.get('footer .social-links a').each(($link) => {
      cy.wrap($link).should('have.attr', 'aria-label')
    })
  })

  it('should be responsive', () => {
    // Test different viewport sizes
    const viewports = [
      { width: 320, height: 568 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1024, height: 768 }, // Desktop small
      { width: 1920, height: 1080 }, // Desktop large
    ]

    viewports.forEach((viewport) => {
      cy.viewport(viewport.width, viewport.height)
      cy.get('nav').should('be.visible')
      cy.get('main').should('be.visible')
      cy.get('footer').should('be.visible')
    })
  })
})
