import { mount } from 'cypress/vue'
import Contact from '../../src/components/Contact.vue'
import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../../src/pages/NotFound.vue'

// Mock router for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/404', name: 'NotFound', component: NotFound },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

describe('Contact Component', () => {
  beforeEach(() => {
    mount(Contact, {
      global: {
        plugins: [router]
      }
    })
  })

  it('should render contact section with all elements', () => {
    // Check main contact section
    cy.get('.contact').should('be.visible')
    cy.get('.container').should('be.visible')
    cy.get('.contact-content').should('be.visible')
  })

  it('should display section title and description', () => {
    // Check section title
    cy.get('.section-title').should('contain.text', 'Get In Touch')
    
    // Check section description
    cy.get('.section-subtitle')
      .should('contain.text', 'Ready to discuss your next Salesforce project')
      .and('contain.text', 'connect')
  })

  it('should display all contact information items', () => {
    // Check that contact items are present
    cy.get('.contact-item').should('have.length', 3)
    
    // Check email contact item
    cy.get('.contact-item').eq(0)
      .should('contain.text', 'Email')
      .and('contain.text', 'jobetcasquejo221@gmail.com')
    
    // Check location contact item
    cy.get('.contact-item').eq(1)
      .should('contain.text', 'Location')
      .and('contain.text', 'Philippines')
    
    // Check resume contact item
    cy.get('.contact-item').eq(2)
      .should('contain.text', 'Resume')
      .and('contain.text', 'Download my latest resume')
  })

  it('should have contact icons for each item', () => {
    // Check that contact icons exist
    cy.get('.contact-icon').should('have.length', 3)
    cy.get('.contact-icon svg').should('have.length', 3)
  })

  it('should make resume item clickable with proper styling', () => {
    // Check resume item has clickable class
    cy.get('.contact-item.clickable').should('exist')
    
    // Check it's the resume item
    cy.get('.contact-item.clickable').should('contain.text', 'Resume')
  })

  it('should have clickable resume item', () => {
    // Check resume item is clickable
    cy.get('.contact-item.clickable').should('exist')
    cy.get('.contact-item.clickable').should('contain.text', 'Resume')
  })

  it('should render ContactForm component', () => {
    // Check that ContactForm is rendered
    cy.get('.contact-form').should('be.visible')
    cy.get('.form-title').should('contain.text', 'Send me a message')
  })

  it('should have proper layout structure', () => {
    // Check layout structure
    cy.get('.contact-content').should('exist')
    cy.get('.contact-info').should('exist')
    cy.get('.section-header').should('exist')
  })

  it('should have proper accessibility attributes', () => {
    // Check section has proper heading structure
    cy.get('.section-title').should('have.prop', 'tagName', 'H2')
    
    // Check contact items have proper structure
    cy.get('.contact-item').each(($item) => {
      cy.wrap($item).find('.contact-details h3').should('exist')
      cy.wrap($item).find('.contact-details p').should('exist')
    })
  })

  it('should display ContactForm component', () => {
    // Check that ContactForm component is rendered
    cy.get('form').should('exist')
  })

  it('should have hover effects on resume item', () => {
    // Hover over resume item
    cy.get('.contact-item.clickable').trigger('mouseover')
    
    // Check that hover state is applied (this might need adjustment based on actual CSS)
    cy.get('.contact-item.clickable').should('have.css', 'cursor', 'pointer')
  })

  it('should have proper section structure', () => {
    // Check section structure
    cy.get('#contact').should('exist')
    cy.get('.contact').should('exist')
    cy.get('.container').should('exist')
  })
})