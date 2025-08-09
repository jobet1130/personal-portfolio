describe('Contact Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('body').should('be.visible')
  })

  it('should navigate to contact section from homepage', () => {
    // Click on contact navigation link
    cy.get('nav').contains('Contact').click()

    // Check that contact section is visible
    cy.get('.contact', { timeout: 10000 }).should('be.visible')
    cy.get('.section-title').should('contain.text', 'Get In Touch')
  })

  it('should display all contact information correctly', () => {
    // Navigate to contact section
    cy.get('#contact').scrollIntoView()
    
    // Check contact items
    cy.get('.contact-item').should('have.length', 3)
    
    // Check email contact
    cy.get('.contact-item').eq(0)
      .should('contain.text', 'Email')
      .and('contain.text', 'jobetcasquejo221@gmail.com')
    
    // Check location contact
    cy.get('.contact-item').eq(1)
      .should('contain.text', 'Location')
      .and('contain.text', 'Philippines')
    
    // Check resume contact
    cy.get('.contact-item').eq(2)
      .should('contain.text', 'Resume')
      .and('contain.text', 'Download my latest resume')
  })

  it('should navigate to 404 page when resume is clicked', () => {
    // Navigate to contact section
    cy.get('nav').contains('Contact').click()
    cy.get('.contact', { timeout: 10000 }).should('be.visible')

    // Click on resume item
    cy.get('.contact-item.clickable').click()

    // Check that we're on 404 page
    cy.url().should('include', '/404')
    cy.get('h1').should('contain.text', 'Page Not Found')

    // Check 404 page content
    cy.get('.error-description').should('contain.text', "The page you're looking for doesn't exist")

    // Check navigation buttons
    cy.get('.error-actions .btn-primary').should('contain.text', 'Go Home')
    cy.get('.error-actions .btn-secondary').should('contain.text', 'Go Back')
  })

  it('should return to homepage from 404 page', () => {
    // Navigate to contact and click resume
    cy.get('nav').contains('Contact').click()
    cy.get('.contact', { timeout: 10000 }).should('be.visible')
    cy.get('.contact-item.clickable').click()

    // Verify we're on 404 page
    cy.url().should('include', '/404')

    // Click Go Home button
    cy.get('.error-actions .btn-primary').click()

    // Verify we're back on homepage
    cy.url().should('not.include', '/404')
    cy.get('.hero', { timeout: 10000 }).should('be.visible')
  })

  it('should display and interact with contact form', () => {
    // Navigate to contact section
    cy.get('nav').contains('Contact').click()
    cy.get('.contact', { timeout: 10000 }).should('be.visible')

    // Check contact form is visible
    cy.get('.contact-form').should('be.visible')
    cy.get('.form-title').should('contain.text', 'Send me a message')

    // Check all form fields are present
    cy.get('#name').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#subject').should('be.visible')
    cy.get('#message').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should interact with contact form', () => {
    // Navigate to contact section
    cy.get('#contact').scrollIntoView()
    
    // Check form exists
    cy.get('form').should('be.visible')
    
    // Fill form with valid data
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john@example.com')
    cy.get('#subject').type('Test Subject')
    cy.get('#message').type('This is a test message with sufficient length for validation.')
    
    // Check submit button exists
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should submit contact form successfully', () => {
    // Navigate to contact section
    cy.get('nav').contains('Contact').click()
    cy.get('.contact', { timeout: 10000 }).should('be.visible')

    // Fill out the form
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john.doe@example.com')
    cy.get('#subject').type('Test Message from Cypress')
    cy.get('#message').type(
      'This is a test message sent from Cypress e2e testing. It contains enough characters to pass validation.',
    )

    // Submit the form
    cy.get('button[type="submit"]').click()

    // Check loading state
    cy.get('button[type="submit"]').should('be.disabled')
    cy.get('.spinner').should('be.visible')

    // Wait for success message
    cy.get('.success-message', { timeout: 5000 }).should('be.visible')
    cy.get('.success-message').should('contain.text', 'Message sent successfully!')

    // Check form is reset
    cy.get('#name').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#subject').should('have.value', '')
    cy.get('#message').should('have.value', '')
  })

  it('should work correctly on mobile devices', () => {
    // Set mobile viewport
    cy.viewport(375, 667)

    // Navigate to contact section
    cy.get('.mobile-menu-toggle').click()
    cy.get('.nav-links').contains('Contact').click()

    // Check contact section is visible on mobile
    cy.get('.contact', { timeout: 10000 }).should('be.visible')

    // Check contact items are properly displayed
    cy.get('.contact-item').should('be.visible')

    // Check form is usable on mobile
    cy.get('.contact-form').should('be.visible')
    cy.get('#name').type('Mobile User')
    cy.get('#name').should('have.value', 'Mobile User')
  })

  it('should have proper accessibility features', () => {
    // Navigate to contact section
    cy.get('nav').contains('Contact').click()
    cy.get('.contact', { timeout: 10000 }).should('be.visible')

    // Check heading structure
    cy.get('.section-title').should('have.prop', 'tagName', 'H2')

    // Check form labels are properly associated
    cy.get('label[for="name"]').should('exist')
    cy.get('label[for="email"]').should('exist')
    cy.get('label[for="subject"]').should('exist')
    cy.get('label[for="message"]').should('exist')

    // Check required attributes
    cy.get('#name').should('have.attr', 'required')
    cy.get('#email').should('have.attr', 'required')
    cy.get('#subject').should('have.attr', 'required')
    cy.get('#message').should('have.attr', 'required')
  })

  it('should have accessible form fields', () => {
    // Navigate to contact section
    cy.get('#contact').scrollIntoView()
    
    // Check form fields are accessible
    cy.get('#name').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#subject').should('be.visible')
    cy.get('#message').should('be.visible')
    
    // Check labels exist
    cy.get('label[for="name"]').should('exist')
    cy.get('label[for="email"]').should('exist')
  })

  it('should have working navigation to contact section', () => {
    // Check contact section is accessible
    cy.get('#contact').should('exist')
    
    // Navigate to contact section
    cy.get('#contact').scrollIntoView()
    
    // Check section is visible
    cy.get('.contact').should('be.visible')
    cy.get('.section-title').should('contain.text', 'Get In Touch')
  })
})
