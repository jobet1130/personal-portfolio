import { mount } from 'cypress/vue'
import ContactForm from '../../src/components/ContactForm.vue'

describe('ContactForm Component', () => {
  beforeEach(() => {
    mount(ContactForm)
  })

  it('should render contact form with all elements', () => {
    // Check main form container
    cy.get('.contact-form').should('be.visible')
    cy.get('.form-title').should('contain.text', 'Send me a message')
    cy.get('form').should('be.visible')
  })

  it('should display all form fields with proper labels', () => {
    // Check form groups
    cy.get('.form-group').should('have.length', 4)
    
    // Check name field
    cy.get('label[for="name"]').should('contain.text', 'Name *')
    cy.get('#name').should('have.attr', 'placeholder', 'Your full name')
    
    // Check email field
    cy.get('label[for="email"]').should('contain.text', 'Email *')
    cy.get('#email').should('have.attr', 'type', 'email')
    cy.get('#email').should('have.attr', 'placeholder', 'your.email@example.com')
    
    // Check subject field
    cy.get('label[for="subject"]').should('contain.text', 'Subject *')
    cy.get('#subject').should('have.attr', 'placeholder', "What's this about?")
    
    // Check message field
    cy.get('label[for="message"]').should('contain.text', 'Message *')
    cy.get('#message').should('have.attr', 'placeholder', 'Tell me about your project or how I can help you...')
  })

  it('should allow user input in all form fields', () => {
    // Test name input
    cy.get('#name').type('John Doe')
    cy.get('#name').should('have.value', 'John Doe')
    
    // Test email input
    cy.get('#email').type('john@example.com')
    cy.get('#email').should('have.value', 'john@example.com')
    
    // Test subject input
    cy.get('#subject').type('Test Subject')
    cy.get('#subject').should('have.value', 'Test Subject')
    
    // Test message textarea
    cy.get('#message').type('This is a test message for the contact form.')
    cy.get('#message').should('have.value', 'This is a test message for the contact form.')
  })

  it('should have a submit button', () => {
    // Check submit button
    cy.get('button[type="submit"]').should('be.visible')
    cy.get('button[type="submit"]').should('contain.text', 'Send Message')
  })

  it('should have form validation structure', () => {
    // Check that form has validation structure
    cy.get('form').should('exist')
    cy.get('button[type="submit"]').should('exist')
    
    // Check that required fields exist
    cy.get('input[required]').should('have.length.at.least', 1)
  })

  it('should have email input field', () => {
    // Check email field exists and has proper type
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="email"]').should('have.attr', 'type', 'email')
  })

  it('should validate minimum character requirements', () => {
    // Fill form with short values
    cy.get('#name').type('A')
    cy.get('#email').type('test@example.com')
    cy.get('#subject').type('Hi')
    cy.get('#message').type('Short')
    
    // Submit form
    cy.get('button[type="submit"]').click()
    
    // Check for validation errors
    cy.get('.error-message').should('contain.text', 'Name must be at least 2 characters')
    cy.get('.error-message').should('contain.text', 'Subject must be at least 3 characters')
    cy.get('.error-message').should('contain.text', 'Message must be at least 10 characters')
  })

  it('should show loading state during form submission', () => {
    // Fill form with valid data
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john@example.com')
    cy.get('#subject').type('Test Subject')
    cy.get('#message').type('This is a test message with enough characters for validation.')
    
    // Submit form
    cy.get('button[type="submit"]').click()
    
    // Check loading state
    cy.get('button[type="submit"]').should('be.disabled')
    cy.get('button[type="submit"]').should('have.class', 'submitting')
    cy.get('.spinner').should('be.visible')
    cy.get('button[type="submit"]').should('contain.text', 'Sending...')
  })

  it('should show success message after successful submission', () => {
    // Fill form with valid data
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john@example.com')
    cy.get('#subject').type('Test Subject')
    cy.get('#message').type('This is a test message with enough characters for validation.')
    
    // Submit form
    cy.get('button[type="submit"]').click()
    
    // Wait for submission to complete and check success message
    cy.get('.success-message', { timeout: 5000 }).should('be.visible')
    cy.get('.success-message').should('contain.text', 'Message sent successfully!')
    cy.get('.success-message').should('contain.text', "Thank you for reaching out. I'll get back to you soon.")
  })

  it('should reset form after successful submission', () => {
    // Fill form with valid data
    cy.get('#name').type('John Doe')
    cy.get('#email').type('john@example.com')
    cy.get('#subject').type('Test Subject')
    cy.get('#message').type('This is a test message with enough characters for validation.')
    
    // Submit form
    cy.get('button[type="submit"]').click()
    
    // Wait for submission to complete
    cy.get('.success-message', { timeout: 5000 }).should('be.visible')
    
    // Check that form fields are reset
    cy.get('#name').should('have.value', '')
    cy.get('#email').should('have.value', '')
    cy.get('#subject').should('have.value', '')
    cy.get('#message').should('have.value', '')
  })

  it('should have proper form accessibility', () => {
    // Check that labels are properly associated with inputs
    cy.get('label[for="name"]').should('exist')
    cy.get('label[for="email"]').should('exist')
    cy.get('label[for="subject"]').should('exist')
    cy.get('label[for="message"]').should('exist')
    
    // Check that required fields are marked
    cy.get('#name').should('have.attr', 'required')
    cy.get('#email').should('have.attr', 'required')
    cy.get('#subject').should('have.attr', 'required')
    cy.get('#message').should('have.attr', 'required')
  })

  it('should have proper form styling', () => {
    // Check that form has proper styling classes
    cy.get('.contact-form').should('exist')
    cy.get('.form-group').should('have.length.at.least', 1)
  })

  it('should handle mobile viewport correctly', () => {
    // Set mobile viewport
    cy.viewport(375, 667)
    
    // Check that form is still usable on mobile
    cy.get('.contact-form').should('be.visible')
    cy.get('.form-group').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
    
    // Test form interaction on mobile
    cy.get('#name').type('Mobile Test')
    cy.get('#name').should('have.value', 'Mobile Test')
  })

  it('should have proper CSS classes for styling', () => {
    // Check main container classes
    cy.get('.contact-form').should('exist')
    cy.get('.form-title').should('exist')
    cy.get('.form').should('exist')
    
    // Check form element classes
    cy.get('.form-group').should('exist')
    cy.get('.form-label').should('exist')
    cy.get('.form-input').should('exist')
    cy.get('.form-textarea').should('exist')
    cy.get('.submit-btn').should('exist')
  })
})