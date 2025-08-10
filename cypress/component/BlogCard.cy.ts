import { mount } from 'cypress/vue'
import BlogCard from '../../src/components/BlogCard.vue'
import { createRouter, createWebHistory } from 'vue-router'

const mockBlogPost = {
  id: 'test-blog-post',
  title: 'Test Blog Post Title',
  slug: 'test-blog-post',
  excerpt: 'This is a test blog post excerpt that describes the content of the article.',
  content: 'Full content of the blog post...',
  author: 'John Doe',
  publishedDate: '2024-01-15',
  updatedDate: '2024-01-20',
  tags: ['Vue.js', 'TypeScript', 'Testing', 'Cypress'],
  category: 'vue',
  featuredImage: '/images/blog/test-post.svg',
  readTime: 8,
  isPublished: true,
  isFeatured: true,
  views: 1250,
  likes: 89,
  seoTitle: 'Test Blog Post SEO Title',
  seoDescription: 'Test blog post SEO description'
}

const mockBlogPostWithoutImage = {
  id: 'test-blog-post-no-image',
  title: 'Blog Post Without Image',
  slug: 'blog-post-without-image',
  excerpt: 'This blog post has no featured image.',
  content: 'Content without image...',
  author: 'Jane Smith',
  publishedDate: '2024-01-10',
  tags: ['JavaScript', 'Web Development'],
  category: 'javascript',
  readTime: 5,
  isPublished: true,
  isFeatured: false,
  views: 500,
  likes: 25
}

const mockBlogPostMinimal = {
  id: 'minimal-blog-post',
  title: 'Minimal Blog Post',
  slug: 'minimal-blog-post',
  excerpt: 'A minimal blog post with basic information.',
  content: 'Minimal content...',
  author: 'Test Author',
  publishedDate: '2024-01-05',
  tags: [],
  category: 'tutorials',
  readTime: 3,
  isPublished: true,
  isFeatured: false
}

const mockBlogPostManyTags = {
  id: 'many-tags-post',
  title: 'Post with Many Tags',
  slug: 'post-with-many-tags',
  excerpt: 'This post has many tags to test tag truncation.',
  content: 'Content with many tags...',
  author: 'Tag Master',
  publishedDate: '2024-01-12',
  tags: ['Vue.js', 'React', 'Angular', 'JavaScript', 'TypeScript', 'CSS', 'HTML'],
  category: 'web-development',
  featuredImage: '/images/blog/many-tags.svg',
  readTime: 10,
  isPublished: true,
  isFeatured: false,
  views: 800,
  likes: 45
}

// Mock router for testing navigation
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/blog/:slug', name: 'BlogPost', component: { template: '<div>Blog Post</div>' } }
  ]
})

describe('BlogCard Component', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
  })

  it('should render blog card with all information', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check basic structure
    cy.get('.blog-card').should('be.visible')
    cy.get('.blog-image').should('be.visible')
    cy.get('.blog-content').should('be.visible')

    // Check blog information
    cy.get('.blog-title').should('contain.text', mockBlogPost.title)
    cy.get('.blog-excerpt').should('contain.text', mockBlogPost.excerpt)
    cy.get('.author-name').should('contain.text', mockBlogPost.author)
    
    // Check meta information
    cy.get('.blog-date').should('be.visible')
    cy.get('.blog-read-time').should('contain.text', `${mockBlogPost.readTime} min read`)
    
    // Check featured image
    cy.get('.blog-image img').should('have.attr', 'src', mockBlogPost.featuredImage)
    cy.get('.blog-image img').should('have.attr', 'alt', mockBlogPost.title)
  })

  it('should render blog card without featured image', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPostWithoutImage
      },
      global: {
        plugins: [router]
      }
    })

    // Check that image section is not rendered
    cy.get('.blog-image').should('not.exist')
    
    // Check that content is still visible
    cy.get('.blog-content').should('be.visible')
    cy.get('.blog-title').should('contain.text', mockBlogPostWithoutImage.title)
    cy.get('.blog-excerpt').should('contain.text', mockBlogPostWithoutImage.excerpt)
  })

  it('should display featured badge for featured posts', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check featured badge
    cy.get('.featured-badge').should('be.visible')
    cy.get('.featured-badge svg').should('be.visible')
  })

  it('should not display featured badge for non-featured posts', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPostWithoutImage
      },
      global: {
        plugins: [router]
      }
    })

    // Check that featured badge is not present
    cy.get('.featured-badge').should('not.exist')
  })

  it('should display category badge with correct styling', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check category badge
    cy.get('.blog-category').should('be.visible')
    cy.get('.blog-category').should('contain.text', 'Vue.js')
    
    // Check that category has background color styling
    cy.get('.blog-category').should('have.attr', 'style')
    cy.get('.blog-category').invoke('attr', 'style').should('include', 'background-color')
  })

  it('should display blog stats when views and likes are present', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check stats section
    cy.get('.blog-stats').should('be.visible')
    
    // Check views
    cy.get('.blog-stats .stat-item').first().should('contain.text', mockBlogPost.views)
    
    // Check likes
    cy.get('.blog-stats .stat-item').last().should('contain.text', mockBlogPost.likes)
    
    // Check SVG icons
    cy.get('.blog-stats .stat-item svg').should('have.length', 2)
  })

  it('should not display blog stats when views and likes are absent', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPostMinimal
      },
      global: {
        plugins: [router]
      }
    })

    // Check that stats section is not present
    cy.get('.blog-stats').should('not.exist')
  })

  it('should display tags correctly', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check tags section
    cy.get('.blog-tags').should('be.visible')
    
    // Check individual tags (should show first 3)
    cy.get('.blog-tags .tag').should('have.length', 3) // Only the actual tag elements
    cy.get('.blog-tags .tag').first().should('contain.text', 'Vue.js')
    cy.get('.blog-tags .tag').eq(1).should('contain.text', 'TypeScript')
    cy.get('.blog-tags .tag').eq(2).should('contain.text', 'Testing')
    
    // Check "more" indicator
    cy.get('.tag-more').should('contain.text', '+1 more')
  })

  it('should display many tags with truncation', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPostManyTags
      },
      global: {
        plugins: [router]
      }
    })

    // Check that only 3 tags are shown plus "more" indicator
    cy.get('.blog-tags .tag').should('have.length', 3) // Only the actual tag elements
    
    // Check "more" indicator shows correct count
    cy.get('.tag-more').should('contain.text', '+4 more')
  })

  it('should not display tags section when no tags are present', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPostMinimal
      },
      global: {
        plugins: [router]
      }
    })

    // Check that tags section is not present
    cy.get('.blog-tags').should('not.exist')
  })

  it('should display author information with avatar', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check author section
    cy.get('.blog-author').should('be.visible')
    cy.get('.author-avatar').should('be.visible')
    cy.get('.author-avatar svg').should('be.visible')
    cy.get('.author-name').should('contain.text', mockBlogPost.author)
  })

  it('should have navigation links', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check title link
    cy.get('.title-link').should('be.visible')
    cy.get('.title-link').should('have.attr', 'href').and('include', `/blog/${mockBlogPost.slug}`)
    
    // Check read more link
    cy.get('.read-more').should('be.visible')
    cy.get('.read-more').should('contain.text', 'Read More')
    cy.get('.read-more').should('have.attr', 'href').and('include', `/blog/${mockBlogPost.slug}`)
  })

  it('should have read article link in image overlay', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Hover over the blog card to show the overlay
    cy.get('.blog-card').trigger('mouseenter')
    cy.get('.blog-card').trigger('mouseover')
    
    // Wait for the overlay to become visible
    cy.get('.blog-overlay').should('be.visible')
    
    // Check read article link in overlay
    cy.get('.read-link').should('be.visible')
    cy.get('.read-link').should('contain.text', 'Read Article')
    cy.get('.read-link').should('have.attr', 'href').and('include', `/blog/${mockBlogPost.slug}`)
    cy.get('.read-link svg').should('be.visible')
  })

  it('should emit mouse events', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Test mouseenter event
    cy.get('.blog-card').trigger('mouseenter')
    
    // Test mouseleave event
    cy.get('.blog-card').trigger('mouseleave')
  })

  it('should format date correctly', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check that date is formatted (should be "Jan 15, 2024" format)
    cy.get('.blog-date').should('be.visible')
    cy.get('.blog-date').invoke('text').should('match', /^[A-Za-z]{3} \d{1,2}, \d{4}$/)
  })

  it('should handle long excerpts gracefully', () => {
    const longExcerptPost = {
      ...mockBlogPost,
      excerpt: 'This is a very long excerpt that should be handled gracefully by the component. It contains a lot of text to test how the component handles longer content descriptions and whether it truncates or displays them properly.'
    }

    mount(BlogCard, {
      props: {
        post: longExcerptPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check that excerpt is displayed
    cy.get('.blog-excerpt').should('be.visible')
    cy.get('.blog-excerpt').should('contain.text', longExcerptPost.excerpt)
  })

  it('should handle long titles gracefully', () => {
    const longTitlePost = {
      ...mockBlogPost,
      title: 'This is a Very Long Blog Post Title That Should Be Handled Gracefully by the Component'
    }

    mount(BlogCard, {
      props: {
        post: longTitlePost
      },
      global: {
        plugins: [router]
      }
    })

    // Check that title is displayed
    cy.get('.blog-title').should('be.visible')
    cy.get('.blog-title').should('contain.text', longTitlePost.title)
  })

  it('should be responsive on mobile devices', () => {
    cy.viewport('iphone-6')
    
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check that component is visible and functional on mobile
    cy.get('.blog-card').should('be.visible')
    cy.get('.blog-title').should('be.visible')
    cy.get('.blog-excerpt').should('be.visible')
    cy.get('.blog-author').should('be.visible')
  })

  it('should be responsive on tablet devices', () => {
    cy.viewport('ipad-2')
    
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check that component is visible and functional on tablet
    cy.get('.blog-card').should('be.visible')
    cy.get('.blog-image').should('be.visible')
    cy.get('.blog-content').should('be.visible')
  })

  it('should have proper accessibility attributes', () => {
    mount(BlogCard, {
      props: {
        post: mockBlogPost
      },
      global: {
        plugins: [router]
      }
    })

    // Check semantic HTML structure
    cy.get('article.blog-card').should('exist')
    
    // Check image alt text
    cy.get('.blog-image img').should('have.attr', 'alt', mockBlogPost.title)
    
    // Check aria-label on read link
    cy.get('.read-link').should('have.attr', 'aria-label', 'Read Article')
    
    // Check that links have proper titles
    cy.get('.read-link').should('have.attr', 'title', 'Read Article')
  })
})