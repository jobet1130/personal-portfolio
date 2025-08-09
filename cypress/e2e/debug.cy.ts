describe('Debug Test', () => {
  it('should show what elements are on the page', () => {
    cy.visit('/')
    cy.waitForPageLoad()
    
    // Check for nav element
    cy.get('nav', { timeout: 10000 }).should('exist')
    
    // Check for footer element
    cy.get('footer', { timeout: 10000 }).should('exist')
    
    // Check for main element
    cy.get('main', { timeout: 10000 }).should('exist')
    
    // Check for navigation links
    cy.get('nav a[href="#home"]').should('exist')
    cy.get('nav a[href="#about"]').should('exist')
    cy.get('nav a[href="#skills"]').should('exist')
    cy.get('nav a[href="#projects"]').should('exist')
    cy.get('nav a[href="#contact"]').should('exist')
    
    // Check for social links in footer
    cy.get('footer .social-links a').should('have.length.at.least', 1)
    
    // Check for mobile menu toggle
    cy.get('.mobile-menu-toggle').should('exist')
  })
})