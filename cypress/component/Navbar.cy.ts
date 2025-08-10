import { mount } from 'cypress/vue'
import { createRouter, createWebHistory } from 'vue-router'
import Navbar from '../../src/components/Navbar.vue'

describe('Navbar Component', () => {
  let router

  beforeEach(() => {
    // Prevent Vue DevTools errors from failing tests
    cy.on('uncaught:exception', (err, _runnable) => {
      if (err.message.includes('VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD')) {
        return false
      }
      return true
    })

    // Create router instance for testing
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: { template: '<div>Home</div>' } },
        { path: '/about', component: { template: '<div>About</div>' } },
        { path: '/projects', component: { template: '<div>Projects</div>' } },
        { path: '/blog', component: { template: '<div>Blog</div>' } },
        { path: '/resume', component: { template: '<div>Resume</div>' } }
      ]
    })

    // No additional setup needed for basic navigation tests
  })

  it('should render navbar with brand and navigation links', () => {
    mount(Navbar, {
      global: {
        plugins: [router]
      }
    })
    cy.viewport(1280, 720)

    // Check brand
    cy.get('.brand-text').should('contain.text', 'Portfolio')

    // Check navigation links
    const expectedLinks = ['Home', 'About', 'Projects', 'Blog', 'Resume']
    expectedLinks.forEach((link) => {
      cy.get('.nav-links').contains(link).should('be.visible')
    })
  })

  it('should toggle mobile menu', () => {
    mount(Navbar, {
      global: {
        plugins: [router]
      }
    })
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

  it('should navigate when navigation links are clicked', () => {
    mount(Navbar, {
      global: {
        plugins: [router]
      }
    })
    cy.viewport(1280, 720)

    // Click on About link
    cy.get('.nav-links').contains('About').click()

    // Check if navigation occurred (URL should change)
    cy.url().should('include', '/about')
  })

  it('should have proper accessibility attributes', () => {
    mount(Navbar, {
      global: {
        plugins: [router]
      }
    })

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
    mount(Navbar, {
      global: {
        plugins: [router]
      }
    })

    // Desktop view - mobile menu button should be hidden
    cy.viewport(1024, 768)
    cy.get('.mobile-menu-toggle').should('not.be.visible')
    cy.get('.nav-links').should('be.visible')

    // Mobile view - mobile menu button should be visible
    cy.viewport(375, 667)
    cy.get('.mobile-menu-toggle').should('be.visible')
  })

  it('should close mobile menu when clicking navigation links', () => {
    mount(Navbar, {
      global: {
        plugins: [router]
      }
    })
    cy.viewport(375, 667)

    // Open mobile menu
    cy.get('.mobile-menu-toggle').click()
    cy.get('.nav-links').should('have.class', 'nav-links-open')

    // Click on a navigation link
    cy.get('.nav-links a').contains('About').click()

    // Menu should close
    cy.get('.nav-links').should('not.have.class', 'nav-links-open')
  })

  it('should handle navigation accessibility', () => {
    mount(Navbar, {
      global: {
        plugins: [router]
      }
    })
    cy.viewport(1280, 720) // Desktop viewport for visible nav links

    // Verify navigation links are accessible and contain correct text
    cy.get('.nav-links a').first().should('contain.text', 'Home')
    cy.get('.nav-links a').eq(1).should('contain.text', 'About')

    // Test navigation by clicking the About link
    cy.get('.nav-links a').contains('About').click()
    cy.url().should('include', '/about')
  })

  it('should maintain state during rapid interactions', () => {
    mount(Navbar, {
      global: {
        plugins: [router]
      }
    })
    cy.viewport(375, 667)

    // Rapidly toggle mobile menu
    cy.get('.mobile-menu-toggle').click()
    cy.wait(50)
    cy.get('.mobile-menu-toggle').click()
    cy.wait(50)
    cy.get('.mobile-menu-toggle').click()
    cy.wait(50)
    cy.get('.mobile-menu-toggle').click()
    cy.wait(100) // Allow time for final state update

    // Should end up in closed state (even number of clicks)
    cy.get('.nav-links').should('not.have.class', 'nav-links-open')
  })
})
