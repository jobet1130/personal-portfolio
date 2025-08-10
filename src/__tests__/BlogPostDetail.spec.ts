import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import BlogPostDetail from '../BlogPage/components/BlogPostDetail.vue'
import { blogGraphQL } from '../BlogPage/services/graphql'

// Mock the GraphQL service
vi.mock('../BlogPage/services/graphql', () => ({
  blogGraphQL: {
    postBySlug: vi.fn(),
    incrementViews: vi.fn(),
    toggleLike: vi.fn(),
    getRelatedPosts: vi.fn(),
  },
}))

// Mock vue-router
const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/blog/:slug', component: BlogPostDetail },
    { path: '/blog', component: { template: '<div>Blog</div>' } },
  ],
})

// Mock navigator.share
Object.defineProperty(navigator, 'share', {
  value: vi.fn(),
  writable: true,
})

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
  writable: true,
})

// Mock window.alert
Object.defineProperty(window, 'alert', {
  value: vi.fn(),
  writable: true,
})

const mockPost = {
  id: '1',
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  excerpt: 'This is a test blog post excerpt',
  content: 'This is the full content of the test blog post with **markdown** formatting.',
  author: 'John Doe',
  publishedDate: '2024-01-15',
  updatedDate: '2024-01-16',
  tags: ['Vue', 'Testing', 'JavaScript'],
  category: 'frontend',
  featuredImage: '/images/blog/test-post.svg',
  readTime: 5,
  isPublished: true,
  isFeatured: true,
  views: 100,
  likes: 25,
  seoTitle: 'Test Blog Post - SEO Title',
  seoDescription: 'Test blog post SEO description',
}

const mockRelatedPosts = [
  {
    id: '2',
    title: 'Related Post 1',
    slug: 'related-post-1',
    excerpt: 'Related post excerpt',
    featuredImage: '/images/blog/related-1.svg',
    readTime: 3,
    publishedDate: '2024-01-10',
  },
  {
    id: '3',
    title: 'Related Post 2',
    slug: 'related-post-2',
    excerpt: 'Another related post',
    featuredImage: '/images/blog/related-2.svg',
    readTime: 4,
    publishedDate: '2024-01-12',
  },
]

describe('BlogPostDetail', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    await mockRouter.push('/blog/test-blog-post')
    await mockRouter.isReady()
  })

  it('renders loading state initially', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockImplementation(() => new Promise(() => {}))

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    expect(wrapper.find('.loading-container').exists()).toBe(true)
    expect(wrapper.text()).toContain('Loading article...')
  })

  it('renders post content when loaded successfully', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.getRelatedPosts).mockResolvedValue(
      mockRelatedPosts.map((post) => ({
        ...post,
        content: '',
        author: '',
        tags: [],
        category: '',
        updatedDate: '',
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        seoTitle: '',
        seoDescription: '',
      })),
    )
    vi.mocked(blogGraphQL.incrementViews).mockResolvedValue(mockPost)

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.article-title').text()).toBe(mockPost.title)
    expect(wrapper.find('.article-excerpt').text()).toBe(mockPost.excerpt)
    expect(wrapper.find('.author-name').text()).toBe(mockPost.author)
    expect(wrapper.find('.publish-date').text()).toContain('January 15, 2024')
  })

  it('renders error state when post not found', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(null)

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.error-container').exists()).toBe(true)
    expect(wrapper.text()).toContain('Article not found')
  })

  it('displays post metadata correctly', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.getRelatedPosts).mockResolvedValue(
      mockRelatedPosts.map((post) => ({
        ...post,
        content: '',
        author: '',
        tags: [],
        category: '',
        updatedDate: '',
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        seoTitle: '',
        seoDescription: '',
      })),
    )
    vi.mocked(blogGraphQL.incrementViews).mockResolvedValue(mockPost)

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.read-time').text()).toContain('5 min read')
    // Views and likes are displayed in the stat items
    const statItems = wrapper.findAll('.stat-item, .stat-button')
    expect(statItems.some((item) => item.text().includes('100'))).toBe(true) // views
    expect(statItems.some((item) => item.text().includes('25'))).toBe(true) // likes
  })

  it('renders tags correctly', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.getRelatedPosts).mockResolvedValue(
      mockRelatedPosts.map((post) => ({
        ...post,
        content: '',
        author: '',
        tags: [],
        category: '',
        updatedDate: '',
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        seoTitle: '',
        seoDescription: '',
      })),
    )
    vi.mocked(blogGraphQL.incrementViews).mockResolvedValue(mockPost)

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const tags = wrapper.findAll('.tag')
    expect(tags).toHaveLength(3)
    expect(tags[0].text()).toBe('Vue')
    expect(tags[1].text()).toBe('Testing')
    expect(tags[2].text()).toBe('JavaScript')
  })

  it('renders markdown content correctly', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.getRelatedPosts).mockResolvedValue(
      mockRelatedPosts.map((post) => ({
        ...post,
        content: '',
        author: '',
        views: 0,
        tags: [],
        category: '',
        updatedDate: '',
        isPublished: false,
        isFeatured: false,
        likes: 0,
        seoTitle: '',
        seoDescription: '',
      })),
    )
    vi.mocked(blogGraphQL.incrementViews).mockResolvedValue(mockPost)

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Check if content is rendered in the article section
    const article = wrapper.find('article')
    expect(article.exists()).toBe(true)
    expect(article.html()).toContain('<strong>markdown</strong>')
  })

  it('handles like button click', async () => {
    const updatedPost = { ...mockPost, likes: 26 }
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.getRelatedPosts).mockResolvedValue(
      mockRelatedPosts.map((post) => ({
        ...post,
        content: '',
        author: '',
        tags: [],
        category: '',
        updatedDate: '',
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        seoTitle: '',
        seoDescription: '',
      })),
    )
    vi.mocked(blogGraphQL.incrementViews).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.toggleLike).mockResolvedValue(updatedPost)

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const likeButton = wrapper.find('.stat-button')
    await likeButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(blogGraphQL.toggleLike).toHaveBeenCalledWith(mockPost.id)
  })

  it('handles share functionality with native share API', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.getRelatedPosts).mockResolvedValue(
      mockRelatedPosts.map((post) => ({
        ...post,
        content: '',
        author: '',
        tags: [],
        category: '',
        updatedDate: '',
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        seoTitle: '',
        seoDescription: '',
      })),
    )
    vi.mocked(blogGraphQL.incrementViews).mockResolvedValue(mockPost)

    const mockShare = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'share', {
      value: mockShare,
      writable: true,
    })

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const shareButton = wrapper.findAll('.action-button')[0] // First action button is share
    await shareButton.trigger('click')

    expect(mockShare).toHaveBeenCalledWith({
      title: mockPost.title,
      text: mockPost.excerpt,
      url: expect.stringContaining('/blog/test-blog-post'),
    })
  })

  it('handles copy link functionality when share API not available', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.getRelatedPosts).mockResolvedValue(
      mockRelatedPosts.map((post) => ({
        ...post,
        content: '',
        author: '',
        tags: [],
        category: '',
        updatedDate: '',
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        seoTitle: '',
        seoDescription: '',
      })),
    )
    vi.mocked(blogGraphQL.incrementViews).mockResolvedValue(mockPost)

    // Remove native share API
    Object.defineProperty(navigator, 'share', {
      value: undefined,
      writable: true,
    })

    const mockWriteText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    })

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const copyButton = wrapper.findAll('.action-button')[1] // Second action button is copy
    await copyButton.trigger('click')
    await wrapper.vm.$nextTick()

    expect(mockWriteText).toHaveBeenCalledWith(expect.stringContaining('/blog/test-blog-post'))
  })

  it('renders related posts section', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.getRelatedPosts).mockResolvedValue(
      mockRelatedPosts.map((post) => ({
        ...post,
        content: '',
        author: '',
        tags: [],
        category: '',
        updatedDate: '',
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        seoTitle: '',
        seoDescription: '',
      })),
    )
    vi.mocked(blogGraphQL.incrementViews).mockResolvedValue(mockPost)

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const relatedSection = wrapper.find('.related-posts')
    expect(relatedSection.exists()).toBe(true)

    const relatedPostCards = wrapper.findAll('.related-post-card')
    expect(relatedPostCards).toHaveLength(2)
    expect(relatedPostCards[0].text()).toContain('Related Post 1')
    expect(relatedPostCards[1].text()).toContain('Related Post 2')
  })

  it('handles navigation back to blog', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.getRelatedPosts).mockResolvedValue(
      mockRelatedPosts.map((post) => ({
        ...post,
        content: '',
        author: '',
        tags: [],
        category: '',
        updatedDate: '',
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        seoTitle: '',
        seoDescription: '',
      })),
    )
    vi.mocked(blogGraphQL.incrementViews).mockResolvedValue(mockPost)

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const backButton = wrapper.find('.nav-button')
    expect(backButton.exists()).toBe(true)
    // Check if it's a router-link with correct 'to' attribute
    expect(backButton.element.tagName.toLowerCase()).toBe('a')
    expect(backButton.text()).toContain('Back to Blog')
  })

  it('increments views on mount', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.getRelatedPosts).mockResolvedValue(
      mockRelatedPosts.map((post) => ({
        ...post,
        content: '',
        author: '',
        tags: [],
        category: '',
        updatedDate: '',
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        seoTitle: '',
        seoDescription: '',
      })),
    )
    vi.mocked(blogGraphQL.incrementViews).mockResolvedValue(mockPost)

    mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(blogGraphQL.incrementViews).toHaveBeenCalledWith(mockPost.id)
  })

  it('handles error when loading post fails', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockRejectedValue(new Error('Network error'))

    await mockRouter.isReady()
    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(wrapper.find('.error-container').exists()).toBe(true)
    expect(wrapper.text()).toContain('Failed to load article')
  })

  it('displays author avatar placeholder correctly', async () => {
    vi.mocked(blogGraphQL.postBySlug).mockResolvedValue(mockPost)
    vi.mocked(blogGraphQL.getRelatedPosts).mockResolvedValue(
      mockRelatedPosts.map((post) => ({
        ...post,
        content: '',
        author: '',
        tags: [],
        category: '',
        updatedDate: '',
        isPublished: false,
        isFeatured: false,
        views: 0,
        likes: 0,
        seoTitle: '',
        seoDescription: '',
      })),
    )
    vi.mocked(blogGraphQL.incrementViews).mockResolvedValue(mockPost)

    const wrapper = mount(BlogPostDetail, {
      global: {
        plugins: [mockRouter],
      },
    })

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 100))

    const avatarPlaceholder = wrapper.find('.avatar-placeholder')
    expect(avatarPlaceholder.exists()).toBe(true)
    expect(avatarPlaceholder.text()).toBe('J') // First letter of John
  })
})
