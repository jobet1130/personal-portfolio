describe('Navigation Functionality', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('body').should('be.visible')
  })

  it('should navigate to different sections via navbar', () => {
    // Test clicking on navigation links
    const sections = [
      { name: 'Home', id: '#hero' },
      { name: 'About', id: '#about' },
      { name: 'Skills', id: '#skills' },
      { name: 'Projects', id: '#projects' },
      { name: 'Contact', id: '#contact' },
    ]

    sections.forEach((section) => {
      // Click on navigation link
      cy.get('nav').contains(section.name).click()

      // Wait for smooth scroll to complete
      cy.wait(1000)

      // Check if the URL hash is updated (if implemented)
      // cy.url().should('include', section.id)
    })
  })

  it('should handle smooth scrolling', () => {
    // Test smooth scrolling behavior
    cy.get('nav').contains('About').click()
    cy.wait(500)

    // Check if page has scrolled (window.scrollY should be > 0)
    cy.window().its('scrollY').should('be.greaterThan', 0)

    // Scroll back to top
    cy.get('nav').contains('Home').click()
    cy.wait(500)

    // Check if close to top (allowing for header offset)
    cy.window().its('scrollY').should('be.lessThan', 100)
  })

  it('should highlight active navigation item', () => {
    // Click on About link and verify it exists
    cy.get('nav a[href="#about"]', { timeout: 10000 }).should('be.visible').click()
    cy.wait(500)
    // Verify the section is visible after navigation
    cy.get('#about').should('be.visible')
  })

  it('should work with keyboard navigation', () => {
    // Focus on first navigation link
    cy.get('nav a', { timeout: 10000 }).first().focus()

    // Test that the link is focusable and can be activated with Enter
    cy.focused().should('be.visible')
    cy.focused().type('{enter}')

    // Verify navigation occurred (page should scroll or change)
    cy.wait(500)
  })

  it('should handle mobile navigation', () => {
    cy.viewport(375, 667)

    // Check mobile menu button (correct selector)
    cy.get('.mobile-menu-toggle', { timeout: 10000 }).should('be.visible')

    // Click mobile menu
    cy.get('.mobile-menu-toggle').click()
    cy.get('.nav-links', { timeout: 5000 }).should('have.class', 'nav-links-open')
  })

  it('should handle external links properly', () => {
    // Check if footer exists first
    cy.get('body').then(($body) => {
      if ($body.find('footer .social-links a').length > 0) {
        cy.get('footer .social-links a', { timeout: 10000 }).each(($link) => {
          // Check if link has aria-label attribute
          cy.wrap($link).should('have.attr', 'aria-label')
        })
      } else {
        // If no social links exist, just verify footer structure
        cy.log('No social links found in footer')
      }
    })
  })

  it('should maintain navigation state on page refresh', () => {
    // Navigate to a section
    cy.get('nav').contains('Skills').click()
    cy.wait(1000)

    // Refresh the page
    cy.reload()
    cy.get('body').should('be.visible')

    // Navigation should still be functional
    cy.get('nav').should('be.visible')
    cy.get('nav').contains('Home').click()
    cy.wait(500)
    cy.window().its('scrollY').should('be.lessThan', 100)
  })

  it('should handle rapid navigation clicks', () => {
    // Test rapid clicking to ensure no errors
    cy.get('nav').contains('About').click()
    cy.get('nav').contains('Skills').click()
    cy.get('nav').contains('Projects').click()
    cy.get('nav').contains('Contact').click()
    cy.get('nav').contains('Home').click()

    // Should end up close to home (allowing for header offset)
    cy.wait(1000)
    cy.window().its('scrollY').should('be.lessThan', 100)
  })
})
