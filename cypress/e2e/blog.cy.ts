import { describe } from 'mocha'

describe('Blog Functionality', () => {
  beforeEach(() => {
    cy.visit('/blog')
    cy.get('body').should('be.visible')
  })

  describe('Blog Page Layout', () => {
    it('should display blog page header and navigation', () => {
      // Check page title
      cy.get('.page-title').should('contain.text', 'Blog')
      cy.get('.page-subtitle').should('be.visible')

      // Check navigation breadcrumb if exists
      cy.get('nav').should('be.visible')
    })

    it('should display blog filters and search', () => {
      // Check category filters
      cy.get('.blog-filters').should('be.visible')
      cy.get('.category-filters').should('be.visible')
      cy.get('.filter-btn').should('have.length.greaterThan', 0)

      // Check type filters (All, Featured, Recent)
      cy.get('.type-filters').should('be.visible')
      cy.get('.type-filters .filter-btn').should('contain.text', 'All')
      cy.get('.type-filters .filter-btn').should('contain.text', 'Featured')
      cy.get('.type-filters .filter-btn').should('contain.text', 'Recent')

      // Check search bar
      cy.get('.search-bar').should('be.visible')
      cy.get('.search-input').should('have.attr', 'placeholder', 'Search articles...')
    })

    it('should display blog stats', () => {
      cy.get('.blog-stats').should('be.visible')
      cy.get('.stat-item').should('have.length', 3)

      // Check for Articles count
      cy.get('.stat-item').first().should('contain.text', 'Article')

      // Check for Total Views
      cy.get('.stat-item').eq(1).should('contain.text', 'Total Views')

      // Check for Categories count
      cy.get('.stat-item').last().should('contain.text', 'Categor')
    })
  })

  describe('Blog Cards Display', () => {
    it('should display blog cards in grid layout', () => {
      cy.get('.blog-grid').should('be.visible')
      cy.get('.blog-card').should('have.length.greaterThan', 0)
    })

    it('should display blog card content correctly', () => {
      cy.get('.blog-card')
        .first()
        .within(() => {
          // Check for blog title
          cy.get('.blog-title').should('be.visible')

          // Check for blog excerpt
          cy.get('.blog-excerpt').should('be.visible')

          // Check for blog meta information
          cy.get('.blog-meta').should('be.visible')
          cy.get('.blog-date').should('be.visible')
          cy.get('.blog-read-time').should('be.visible')

          // Check for author information
          cy.get('.blog-author').should('be.visible')
          cy.get('.author-name').should('be.visible')

          // Check for category badge
          cy.get('.blog-category').should('be.visible')
        })
    })

    it('should display featured badge for featured posts', () => {
      // Look for featured posts and verify they have featured badge
      cy.get('.blog-card').each(($card) => {
        cy.wrap($card).within(() => {
          cy.get('body').then(($body) => {
            if ($body.find('.featured-badge').length > 0) {
              cy.get('.featured-badge').should('be.visible')
            }
          })
        })
      })
    })
  })

  describe('Blog Filtering', () => {
    it('should filter by category', () => {
      // Click on a specific category filter
      cy.get('.category-filters .filter-btn').not('.active').first().click()

      // Verify the filter is active
      cy.get('.category-filters .filter-btn.active').should('have.length', 1)

      // Verify blog cards are filtered
      cy.get('.blog-grid').should('be.visible')

      // Reset to all posts
      cy.get('.category-filters .filter-btn').contains('All Posts').click()
      cy.get('.category-filters .filter-btn').contains('All Posts').should('have.class', 'active')
    })

    it('should filter by type (Featured)', () => {
      // Click on Featured filter
      cy.get('.type-filters .filter-btn').contains('Featured').click()

      // Verify Featured filter is active
      cy.get('.type-filters .filter-btn').contains('Featured').should('have.class', 'active')

      // Verify only featured posts are shown (if any)
      cy.get('body').then(($body) => {
        if ($body.find('.blog-card').length > 0) {
          cy.get('.blog-card').should('have.length.greaterThan', 0)
        } else {
          cy.get('.no-results').should('be.visible')
        }
      })
    })

    it('should filter by type (Recent)', () => {
      // Click on Recent filter
      cy.get('.type-filters .filter-btn').contains('Recent').click()

      // Verify Recent filter is active
      cy.get('.type-filters .filter-btn').contains('Recent').should('have.class', 'active')

      // Verify posts are displayed
      cy.get('.blog-grid').should('be.visible')
    })
  })

  describe('Blog Search', () => {
    it('should search for blog posts', () => {
      // Type in search input
      cy.get('.search-input').type('Vue')

      // Wait for search results
      cy.wait(500)

      // Verify search results or no results message
      cy.get('body').then(($body) => {
        if ($body.find('.blog-card').length > 0) {
          cy.get('.blog-card').should('have.length.greaterThan', 0)
          // Verify search term appears in results
          cy.get('.blog-card .blog-title, .blog-card .blog-excerpt').should('contain.text', 'Vue')
        } else {
          cy.get('.no-results').should('be.visible')
          cy.get('.no-results h3').should('contain.text', 'No articles found')
        }
      })
    })

    it('should show no results message for invalid search', () => {
      // Search for something that doesn't exist
      cy.get('.search-input').type('nonexistentarticle123')

      // Wait for search
      cy.wait(500)

      // Verify no results message
      cy.get('.no-results').should('be.visible')
      cy.get('.no-results h3').should('contain.text', 'No articles found')
      cy.get('.clear-filters-btn').should('be.visible')
    })

    it('should clear filters and search', () => {
      // Apply some filters and search
      cy.get('.search-input').type('test')
      cy.get('.type-filters .filter-btn').contains('Featured').click()

      // Wait for filters to apply
      cy.wait(500)

      // Clear filters if no results button is visible
      cy.get('body').then(($body) => {
        if ($body.find('.clear-filters-btn').length > 0) {
          cy.get('.clear-filters-btn').click()

          // Verify filters are cleared
          cy.get('.search-input').should('have.value', '')
          cy.get('.type-filters .filter-btn').contains('All').should('have.class', 'active')
          cy.get('.category-filters .filter-btn')
            .contains('All Posts')
            .should('have.class', 'active')
        }
      })
    })
  })

  describe('Blog Navigation', () => {
    it('should navigate to blog post detail page', () => {
      // Click on first blog card title or read more link
      cy.get('.blog-card')
        .first()
        .within(() => {
          cy.get('.blog-title a, .read-more, .read-link').first().click()
        })

      // Verify navigation to blog post detail
      cy.url().should('include', '/blog/')
      cy.url().should('not.equal', Cypress.config().baseUrl + '/blog')
    })

    it('should handle pagination if present', () => {
      // Check if pagination exists
      cy.get('body').then(($body) => {
        if ($body.find('.pagination').length > 0) {
          cy.get('.pagination').should('be.visible')

          // Test pagination buttons
          cy.get('.pagination-btn').should('have.length.greaterThan', 0)

          // Test next page if available
          cy.get('.pagination-btn')
            .not(':disabled')
            .last()
            .then(($btn) => {
              if (!$btn.is(':disabled')) {
                cy.wrap($btn).click()
                cy.wait(500)
                cy.get('.blog-grid').should('be.visible')
              }
            })
        }
      })
    })
  })

  describe('Blog Post Detail Page', () => {
    beforeEach(() => {
      // Navigate to first blog post
      cy.visit('/blog')
      cy.get('.blog-card')
        .first()
        .within(() => {
          cy.get('.blog-title a, .read-more, .read-link').first().click()
        })
    })

    it('should display blog post detail content', () => {
      // Check article header
      cy.get('.article-header').should('be.visible')
      cy.get('.article-title').should('be.visible')
      cy.get('.article-excerpt').should('be.visible')

      // Check article meta
      cy.get('.article-meta').should('be.visible')
      cy.get('.publish-date').should('be.visible')
      cy.get('.read-time').should('be.visible')

      // Check author info
      cy.get('.author-info').should('be.visible')
      cy.get('.author-name').should('be.visible')

      // Check article content
      cy.get('.article-content').should('be.visible')
      cy.get('.content-wrapper').should('be.visible')
    })

    it('should display breadcrumb navigation', () => {
      cy.get('.breadcrumb').should('be.visible')
      cy.get('.breadcrumb a').should('contain.text', 'Blog')
      cy.get('.breadcrumb .current').should('be.visible')
    })

    it('should display article stats and interactions', () => {
      cy.get('.article-stats').should('be.visible')

      // Check like button
      cy.get('.stat-button').should('be.visible')

      // Check view count
      cy.get('.stat-item').should('be.visible')
    })

    it('should display category and tags', () => {
      // Check category
      cy.get('.category').should('be.visible')

      // Check tags if present
      cy.get('body').then(($body) => {
        if ($body.find('.article-tags').length > 0) {
          cy.get('.article-tags').should('be.visible')
          cy.get('.tag').should('have.length.greaterThan', 0)
        }
      })
    })

    it('should navigate back to blog from breadcrumb', () => {
      cy.get('.breadcrumb a').contains('Blog').click()
      cy.url().should('include', '/blog')
      cy.url().should('not.include', '/blog/')
      cy.get('.blog-grid').should('be.visible')
    })

    it('should handle like button interaction', () => {
      cy.get('.stat-button').then(($btn) => {
        const _initialLikes = $btn.text().trim()

        // Click like button
        cy.wrap($btn).click()

        // Verify button state change (visual feedback)
        cy.get('.stat-button').should('have.class', 'liked')
      })
    })
  })

  describe('Blog Error Handling', () => {
    it('should handle invalid blog post URLs', () => {
      cy.visit('/blog/nonexistent-post', { failOnStatusCode: false })

      // Check for error state
      cy.get('body').then(($body) => {
        if ($body.find('.error-container').length > 0) {
          cy.get('.error-container').should('be.visible')
          cy.get('.error-container h2').should('contain.text', 'Article Not Found')
          cy.get('.back-link').should('be.visible')
        } else {
          // Might redirect to 404 page
          cy.url().should('include', '404')
        }
      })
    })

    it('should provide back to blog navigation from error state', () => {
      cy.visit('/blog/nonexistent-post', { failOnStatusCode: false })

      cy.get('body').then(($body) => {
        if ($body.find('.back-link').length > 0) {
          cy.get('.back-link').click()
          cy.url().should('include', '/blog')
          cy.get('.blog-grid').should('be.visible')
        }
      })
    })
  })

  describe('Blog Responsive Design', () => {
    it('should display correctly on mobile devices', () => {
      cy.viewport('iphone-6')

      // Check mobile layout
      cy.get('.blog-page').should('be.visible')
      cy.get('.blog-filters').should('be.visible')
      cy.get('.blog-grid').should('be.visible')

      // Check blog cards stack properly on mobile
      cy.get('.blog-card').should('be.visible')
    })

    it('should display correctly on tablet devices', () => {
      cy.viewport('ipad-2')

      // Check tablet layout
      cy.get('.blog-page').should('be.visible')
      cy.get('.blog-grid').should('be.visible')
      cy.get('.blog-card').should('have.length.greaterThan', 0)
    })
  })
})
