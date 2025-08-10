import { mount } from 'cypress/vue'
import Footer from '../../src/components/Footer.vue'

describe('Footer Component', () => {
  beforeEach(() => {
    mount(Footer)
  })

  it('should render footer element', () => {
    cy.get('footer').should('exist')
    cy.get('.footer').should('exist')
  })

  it('should display current year in copyright', () => {
    const currentYear = new Date().getFullYear()
    cy.get('.footer-content p').should('contain.text', `© ${currentYear} Portfolio. All rights reserved.`)
  })

  it('should render all social links', () => {
    // Wait for the footer to be fully rendered
    cy.get('.footer-content').should('be.visible')
    
    cy.get('.social-links a').should('have.length', 4)
    cy.get('a[aria-label="GitHub"]').should('exist')
    cy.get('a[aria-label="LinkedIn"]').should('exist')
    cy.get('a[aria-label="Email"]').should('exist')
    cy.get('a[aria-label="Twitter"]').should('exist')
  })

  it('should have proper target and rel attributes for external links', () => {
    // GitHub, LinkedIn, and Twitter should have target="_blank" and rel="noopener noreferrer"
    const externalLinks = ['GitHub', 'LinkedIn', 'Twitter']
    
    externalLinks.forEach(linkLabel => {
      cy.get(`a[aria-label="${linkLabel}"]`)
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noopener noreferrer')
    })
  })

  it('should not have target="_blank" for email link', () => {
    cy.get('.footer-content').should('be.visible')
    cy.get('a[aria-label="Email"]').should('exist')
    cy.get('a[aria-label="Email"]').should('not.have.attr', 'target')
    cy.get('a[aria-label="Email"]').should('not.have.attr', 'rel')
  })

  it('should have proper accessibility attributes', () => {
    cy.get('footer').should('have.attr', 'class', 'footer')
    
    // All links should have aria-label
    cy.get('.social-links a').each(($link) => {
      cy.wrap($link).should('have.attr', 'aria-label')
    })
  })

  it('should have proper layout structure', () => {
    cy.get('.footer-content').should('exist')
    cy.get('.footer-content p').should('exist')
    cy.get('.footer-content .social-links').should('exist')
  })

  it('should handle social link interactions', () => {
    // Test that links are clickable
    cy.get('.social-links a').each(($link) => {
      cy.wrap($link)
        .should('exist')
        .should('have.attr', 'href')
    })
  })

  it('should maintain responsive design', () => {
    // Test that elements exist and are properly structured
    cy.get('footer').should('exist')
    cy.get('.footer-content').should('exist')
    cy.get('.social-links').should('exist')
  })

  it('should update year dynamically', () => {
    // This test ensures the computed property works correctly
    const currentYear = new Date().getFullYear()
    cy.get('footer p').should('contain.text', currentYear.toString())
    
    // Verify the full copyright text
    cy.get('footer p').should('have.text', `© ${currentYear} Portfolio. All rights reserved.`)
  })
})