describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('body').should('be.visible')
  })

  it('should have proper heading hierarchy', () => {
    // Check for h1 tag (should be only one)
    cy.get('h1').should('have.length', 1)

    // Check heading hierarchy (h1 -> h2 -> h3, etc.)
    cy.get('h1, h2, h3, h4, h5, h6').then(($headings) => {
      const headings = Array.from($headings).map((h) => parseInt(h.tagName.charAt(1)))

      // Verify heading levels don't skip (e.g., h1 -> h3 without h2)
      for (let i = 1; i < headings.length; i++) {
        const current = headings[i]
        const previous = headings[i - 1]
        expect(current - previous).to.be.at.most(1)
      }
    })
  })

  it('should have proper alt text for images', () => {
    cy.get('body').then(($body) => {
      if ($body.find('img').length > 0) {
        cy.get('img').each(($img) => {
          cy.wrap($img).should('have.attr', 'alt')
          cy.wrap($img).invoke('attr', 'alt').should('not.be.empty')
        })
      } else {
        // No images found, test passes
        cy.log('No images found on the page')
      }
    })
  })

  it('should have proper form labels', () => {
    cy.get('body').then(($body) => {
      if ($body.find('input, textarea, select').length > 0) {
        // Check that all form inputs have associated labels
        cy.get('input, textarea, select').each(($input) => {
          const id = $input.attr('id')
          const ariaLabel = $input.attr('aria-label')
          const ariaLabelledBy = $input.attr('aria-labelledby')

          // Input should have either an id with corresponding label, aria-label, or aria-labelledby
          if (id) {
            cy.get(`label[for="${id}"]`).should('exist')
          } else {
            expect(ariaLabel || ariaLabelledBy).to.exist
          }
        })
      } else {
        // No form elements found, test passes
        cy.log('No form elements found on the page')
      }
    })
  })

  it('should have proper link accessibility', () => {
    cy.get('a').each(($link) => {
      // Links should have meaningful text or aria-label
      const text = $link.text().trim()
      const ariaLabel = $link.attr('aria-label')
      const title = $link.attr('title')

      expect(text || ariaLabel || title).to.not.be.empty

      // External links should have proper attributes
      const href = $link.attr('href')
      if (href && (href.startsWith('http') || href.startsWith('//'))) {
        cy.wrap($link)
          .should('have.attr', 'target', '_blank')
          .should('have.attr', 'rel')
          .invoke('attr', 'rel')
          .should('include', 'noopener')
      }
    })
  })

  it('should have proper button accessibility', () => {
    cy.get('button').each(($button) => {
      // Buttons should have text content or aria-label
      cy.wrap($button).then(($btn) => {
        const text = $btn.text().trim()
        const ariaLabel = $btn.attr('aria-label')

        expect(text || ariaLabel).to.not.be.empty

        // Buttons should be focusable
        cy.wrap($btn).should('not.have.attr', 'tabindex', '-1')
      })
    })
  })

  it('should have proper color contrast', () => {
    // Test key elements for color contrast
    const elementsToTest = ['nav a', 'button', 'h1, h2, h3', 'p']

    elementsToTest.forEach((selector) => {
      cy.get('body').then(($body) => {
        if ($body.find(selector).length > 0) {
          cy.get(selector)
            .first()
            .then(($el) => {
              const element = $el[0]
              const styles = window.getComputedStyle(element)
              const color = styles.color
              const backgroundColor = styles.backgroundColor

              // Basic check that colors are defined
              expect(color).to.not.equal('rgba(0, 0, 0, 0)')
              expect(backgroundColor).to.exist
            })
        }
      })
    })
  })

  it('should be keyboard navigable', () => {
    // Test that focusable elements can be focused
    cy.get('a').first().focus()
    cy.focused().should('be.visible')

    // Test navigation through links
    cy.get('a').each(($el, index) => {
      if (index < 3) {
        // Test first 3 links
        cy.wrap($el).focus()
        cy.focused().should('be.visible')
      }
    })

    // Test that Enter key works on buttons and links
    cy.get('button, a').first().focus()
    cy.focused().type('{enter}')
  })

  it('should have proper ARIA landmarks', () => {
    // Check for main landmarks
    cy.get('nav, footer').should('exist')

    // Navigation should have proper role
    cy.get('nav').should('have.attr', 'role', 'navigation')

    // Footer should be identifiable
    cy.get('footer').should('exist')
  })

  it('should handle focus management', () => {
    // Test focus trap in mobile menu
    cy.viewport(375, 667)

    // Open mobile menu
    cy.get('.mobile-menu-toggle').click()

    // Focus should move to menu
    cy.get('.nav-links a').first().should('be.visible')

    // Focus on menu items
    cy.get('.nav-links a').first().focus()
    cy.focused().should('be.visible')

    // Test that menu items are focusable
    cy.get('.nav-links a').each(($el, index) => {
      if (index < 2) {
        // Test first 2 menu items
        cy.wrap($el).focus()
        cy.focused().should('be.visible')
      }
    })

    // Close menu and focus should return
    cy.get('.mobile-menu-toggle').click()
    cy.get('.mobile-menu-toggle').should('be.focused')
  })

  it('should have proper page title and meta information', () => {
    // Check page title
    cy.title().should('not.be.empty')
    cy.title().should('contain', 'Personal Portfolio')

    // Check viewport meta tag (meta description is optional)
    cy.get('meta[name="viewport"]').should('exist')

    // Check if meta description exists, and if so, it should not be empty
    cy.get('head').then(($head) => {
      if ($head.find('meta[name="description"]').length > 0) {
        cy.get('meta[name="description"]').invoke('attr', 'content').should('not.be.empty')
      }
    })
  })

  it('should handle reduced motion preferences', () => {
    // Test with reduced motion preference
    cy.window().then((win) => {
      // Mock prefers-reduced-motion
      const mediaQuery = win.matchMedia('(prefers-reduced-motion: reduce)')

      // If user prefers reduced motion, animations should be minimal
      if (mediaQuery.matches) {
        cy.get('*').should('have.css', 'animation-duration', '0s')
      }
    })
  })
})
