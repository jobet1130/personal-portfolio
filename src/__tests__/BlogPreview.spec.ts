import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import BlogPreview from '../components/BlogPreview.vue'
import type { BlogPost } from '../data/blog'

// Mock blog post data for testing
const mockBlogPost: BlogPost = {
  id: 'test-post-1',
  title: 'Test Blog Post Title',
  slug: 'test-blog-post-title',
  excerpt: 'This is a test excerpt for the blog post that should be displayed in the preview.',
  content: 'Full content of the blog post...',
  author: 'John Doe',
  publishedDate: '2024-01-15',
  updatedDate: '2024-01-20',
  tags: ['Vue.js', 'Testing', 'JavaScript', 'Frontend', 'Development'],
  category: 'web-development',
  featuredImage: '/images/blog/test-image.jpg',
  readTime: 8,
  isPublished: true,
  isFeatured: true,
  views: 1250,
  likes: 89,
  seoTitle: 'Test Blog Post - SEO Title',
  seoDescription: 'Test blog post SEO description'
}

const mockBlogPostWithoutImage: BlogPost = {
  ...mockBlogPost,
  id: 'test-post-2',
  featuredImage: undefined,
  isFeatured: false,
  views: undefined,
  likes: undefined
}

const createTestRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
      { path: '/blog/:slug', name: 'BlogPost', component: { template: '<div>Blog Post</div>' } }
    ]
  })
}

describe('BlogPreview.vue', () => {
  let router: ReturnType<typeof createTestRouter>
  let wrapper: ReturnType<typeof mount>

  beforeEach(async () => {
    router = createTestRouter()
    await router.push('/')
  })

  describe('Component Rendering with Featured Image', () => {
    beforeEach(() => {
      wrapper = mount(BlogPreview, {
        props: {
          post: mockBlogPost
        },
        global: {
          plugins: [router]
        }
      })
    })

    it('renders the blog preview component', () => {
      expect(wrapper.find('.blog-preview').exists()).toBe(true)
      expect(wrapper.find('article').exists()).toBe(true)
    })

    it('renders blog image when featuredImage is provided', () => {
      expect(wrapper.find('.blog-image').exists()).toBe(true)
      const img = wrapper.find('.blog-image img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('/images/blog/test-image.jpg')
      expect(img.attributes('alt')).toBe('Test Blog Post Title')
    })

    it('displays blog overlay with category and featured badge', () => {
      expect(wrapper.find('.blog-overlay').exists()).toBe(true)
      expect(wrapper.find('.blog-category').exists()).toBe(true)
      expect(wrapper.find('.featured-badge').exists()).toBe(true)
      expect(wrapper.find('.featured-badge').text()).toContain('Featured')
    })

    it('displays correct category name and color', () => {
      const category = wrapper.find('.blog-category')
      expect(category.text()).toBe('Web Development')
      expect(category.attributes('style')).toContain('background-color')
    })
  })

  describe('Component Rendering without Featured Image', () => {
    beforeEach(() => {
      wrapper = mount(BlogPreview, {
        props: {
          post: mockBlogPostWithoutImage
        },
        global: {
          plugins: [router]
        }
      })
    })

    it('does not render blog image when featuredImage is not provided', () => {
      expect(wrapper.find('.blog-image').exists()).toBe(false)
    })

    it('does not display featured badge when post is not featured', () => {
      expect(wrapper.find('.featured-badge').exists()).toBe(false)
    })
  })

  describe('Blog Content', () => {
    beforeEach(() => {
      wrapper = mount(BlogPreview, {
        props: {
          post: mockBlogPost
        },
        global: {
          plugins: [router]
        }
      })
    })

    it('displays blog meta information', () => {
      expect(wrapper.find('.blog-meta').exists()).toBe(true)
      expect(wrapper.find('.blog-date').text()).toBe('January 15, 2024')
      expect(wrapper.find('.blog-read-time').text()).toBe('8 min read')
    })

    it('displays blog stats when available', () => {
      expect(wrapper.find('.blog-stats').exists()).toBe(true)
      const statItems = wrapper.findAll('.stat-item')
      expect(statItems).toHaveLength(2) // views and likes
      expect(statItems[0].text()).toBe('1250')
      expect(statItems[1].text()).toBe('89')
    })

    it('displays blog title as a router link', () => {
      const titleLink = wrapper.find('.title-link')
      expect(titleLink.exists()).toBe(true)
      expect(titleLink.text()).toBe('Test Blog Post Title')
      // Router link 'to' prop is handled by Vue Router
      expect(titleLink.element.tagName.toLowerCase()).toBe('a')
    })

    it('displays blog excerpt', () => {
      expect(wrapper.find('.blog-excerpt').text()).toBe('This is a test excerpt for the blog post that should be displayed in the preview.')
    })

    it('displays blog tags (limited to 3)', () => {
      const tags = wrapper.findAll('.tag')
      expect(tags).toHaveLength(3) // Only first 3 tags
      expect(tags[0].text()).toBe('Vue.js')
      expect(tags[1].text()).toBe('Testing')
      expect(tags[2].text()).toBe('JavaScript')
    })

    it('shows "more" indicator when there are more than 3 tags', () => {
      const moreTag = wrapper.find('.tag-more')
      expect(moreTag.exists()).toBe(true)
      expect(moreTag.text()).toBe('+2 more')
    })

    it('displays author information', () => {
      expect(wrapper.find('.blog-author').exists()).toBe(true)
      expect(wrapper.find('.author-name').text()).toBe('John Doe')
      expect(wrapper.find('.author-avatar svg').exists()).toBe(true)
    })

    it('displays read more link', () => {
      const readMoreLink = wrapper.find('.read-more')
      expect(readMoreLink.exists()).toBe(true)
      expect(readMoreLink.text()).toContain('Read More')
      expect(readMoreLink.element.tagName.toLowerCase()).toBe('a')
    })
  })

  describe('Blog Stats Conditional Rendering', () => {
    beforeEach(() => {
      wrapper = mount(BlogPreview, {
        props: {
          post: mockBlogPostWithoutImage
        },
        global: {
          plugins: [router]
        }
      })
    })

    it('does not display blog stats when views and likes are not available', () => {
      expect(wrapper.find('.blog-stats').exists()).toBe(false)
    })
  })

  describe('Date Formatting', () => {
    beforeEach(() => {
      wrapper = mount(BlogPreview, {
        props: {
          post: mockBlogPost
        },
        global: {
          plugins: [router]
        }
      })
    })

    it('formats date correctly', () => {
      expect(wrapper.find('.blog-date').text()).toBe('January 15, 2024')
    })
  })

  describe('Category Handling', () => {
    it('handles unknown category gracefully', () => {
      const postWithUnknownCategory = {
        ...mockBlogPost,
        category: 'unknown-category'
      }

      wrapper = mount(BlogPreview, {
        props: {
          post: postWithUnknownCategory
        },
        global: {
          plugins: [router]
        }
      })

      const category = wrapper.find('.blog-category')
      expect(category.text()).toBe('unknown-category')
      expect(category.attributes('style')).toContain('background-color')
    })
  })

  describe('Tags Handling', () => {
    it('handles posts with no tags', () => {
      const postWithNoTags = {
        ...mockBlogPost,
        tags: []
      }

      wrapper = mount(BlogPreview, {
        props: {
          post: postWithNoTags
        },
        global: {
          plugins: [router]
        }
      })

      expect(wrapper.find('.blog-tags').exists()).toBe(false)
    })

    it('handles posts with exactly 3 tags', () => {
      const postWithThreeTags = {
        ...mockBlogPost,
        tags: ['Tag1', 'Tag2', 'Tag3']
      }

      wrapper = mount(BlogPreview, {
        props: {
          post: postWithThreeTags
        },
        global: {
          plugins: [router]
        }
      })

      const tags = wrapper.findAll('.tag')
      expect(tags).toHaveLength(3)
      expect(wrapper.find('.tag-more').exists()).toBe(false)
    })

    it('handles posts with less than 3 tags', () => {
      const postWithTwoTags = {
        ...mockBlogPost,
        tags: ['Tag1', 'Tag2']
      }

      wrapper = mount(BlogPreview, {
        props: {
          post: postWithTwoTags
        },
        global: {
          plugins: [router]
        }
      })

      const tags = wrapper.findAll('.tag')
      expect(tags).toHaveLength(2)
      expect(wrapper.find('.tag-more').exists()).toBe(false)
    })
  })

  describe('Hover Effects', () => {
    beforeEach(() => {
      wrapper = mount(BlogPreview, {
        props: {
          post: mockBlogPost
        },
        global: {
          plugins: [router]
        }
      })
    })

    it('has hover effect classes', () => {
      expect(wrapper.find('.blog-preview').exists()).toBe(true)
      // Note: CSS hover effects are tested through CSS classes presence
      // Actual hover behavior would need integration tests
    })
  })

  describe('Accessibility', () => {
    beforeEach(() => {
      wrapper = mount(BlogPreview, {
        props: {
          post: mockBlogPost
        },
        global: {
          plugins: [router]
        }
      })
    })

    it('uses semantic HTML elements', () => {
      expect(wrapper.find('article').exists()).toBe(true)
      expect(wrapper.find('h3').exists()).toBe(true)
    })

    it('has proper image alt text', () => {
      const img = wrapper.find('.blog-image img')
      expect(img.attributes('alt')).toBe('Test Blog Post Title')
    })

    it('has proper link structure for navigation', () => {
      const titleLink = wrapper.find('.title-link')
      const readMoreLink = wrapper.find('.read-more')
      
      expect(titleLink.exists()).toBe(true)
      expect(readMoreLink.exists()).toBe(true)
      expect(titleLink.element.tagName.toLowerCase()).toBe('a')
      expect(readMoreLink.element.tagName.toLowerCase()).toBe('a')
    })
  })

  describe('Props Validation', () => {
    it('accepts valid BlogPost prop', () => {
      expect(() => {
        mount(BlogPreview, {
          props: {
            post: mockBlogPost
          },
          global: {
            plugins: [router]
          }
        })
      }).not.toThrow()
    })
  })

  describe('SVG Icons', () => {
    beforeEach(() => {
      wrapper = mount(BlogPreview, {
        props: {
          post: mockBlogPost
        },
        global: {
          plugins: [router]
        }
      })
    })

    it('renders SVG icons for stats', () => {
      expect(wrapper.find('.stat-item svg').exists()).toBe(true)
    })

    it('renders SVG icon for featured badge', () => {
      expect(wrapper.find('.featured-badge svg').exists()).toBe(true)
    })

    it('renders SVG icon for author avatar', () => {
      expect(wrapper.find('.author-avatar svg').exists()).toBe(true)
    })

    it('renders SVG icon for read more link', () => {
      expect(wrapper.find('.read-more svg').exists()).toBe(true)
    })
  })
})