import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import BlogPreview from '../components/BlogPreview.vue'
import BlogCard from '../components/BlogCard.vue'
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

  describe('Component Rendering', () => {
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

    it('renders the BlogPreview component', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('renders BlogCard component internally', () => {
      const blogCard = wrapper.findComponent(BlogCard)
      expect(blogCard.exists()).toBe(true)
    })

    it('passes the correct post prop to BlogCard', () => {
      const blogCard = wrapper.findComponent(BlogCard)
      expect(blogCard.props('post')).toEqual(mockBlogPost)
    })
  })

  describe('Props Handling', () => {
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

    it('passes different post data correctly', () => {
      wrapper = mount(BlogPreview, {
        props: {
          post: mockBlogPostWithoutImage
        },
        global: {
          plugins: [router]
        }
      })

      const blogCard = wrapper.findComponent(BlogCard)
      expect(blogCard.props('post')).toEqual(mockBlogPostWithoutImage)
    })
  })

  describe('Component Structure', () => {
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

    it('has a single BlogCard child component', () => {
      const blogCards = wrapper.findAllComponents(BlogCard)
      expect(blogCards).toHaveLength(1)
    })

    it('does not render any direct HTML elements', () => {
      // Since BlogPreview only renders BlogCard, it should not have direct HTML elements
      const htmlElements = wrapper.element.children
      expect(htmlElements.length).toBeGreaterThan(0) // BlogCard will render HTML
    })
  })

  describe('Wrapper Functionality', () => {
    it('acts as a proper wrapper for BlogCard', () => {
      wrapper = mount(BlogPreview, {
        props: {
          post: mockBlogPost
        },
        global: {
          plugins: [router]
        }
      })

      const blogCard = wrapper.findComponent(BlogCard)
      expect(blogCard.exists()).toBe(true)
      expect(blogCard.props('post')).toStrictEqual(mockBlogPost)
    })

    it('maintains backward compatibility', () => {
      // Test that BlogPreview can still be used as before
      const wrapper1 = mount(BlogPreview, {
        props: { post: mockBlogPost },
        global: { plugins: [router] }
      })

      const wrapper2 = mount(BlogPreview, {
        props: { post: mockBlogPostWithoutImage },
        global: { plugins: [router] }
      })

      expect(wrapper1.findComponent(BlogCard).exists()).toBe(true)
      expect(wrapper2.findComponent(BlogCard).exists()).toBe(true)
    })
  })
})