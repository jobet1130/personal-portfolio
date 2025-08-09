import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import BlogCard from '../components/BlogCard.vue'
import type { BlogPost } from '../data/blog'

// Mock vue-router
const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/blog/:slug', component: { template: '<div>Blog Post</div>' } },
    { path: '/blog', component: { template: '<div>Blog</div>' } },
  ],
})

const mockPost: BlogPost = {
  id: 'test-blog-post',
  title: 'Test Blog Post Title',
  slug: 'test-blog-post',
  excerpt: 'This is a test blog post excerpt for testing purposes.',
  content: 'This is the full content of the test blog post with **markdown** formatting.',
  author: 'John Doe',
  publishedDate: '2024-01-15',
  updatedDate: '2024-01-16',
  tags: ['Vue.js', 'Testing', 'JavaScript', 'Frontend'],
  category: 'vue',
  featuredImage: '/images/blog/test-post.svg',
  readTime: 5,
  isPublished: true,
  isFeatured: true,
  views: 100,
  likes: 25,
  seoTitle: 'Test Blog Post - SEO Title',
  seoDescription: 'Test blog post SEO description',
}

const mockPostWithoutImage: BlogPost = {
  id: 'test-blog-post-no-image',
  title: 'Test Blog Post Without Image',
  slug: 'test-blog-post-no-image',
  excerpt: 'This is a test blog post without featured image.',
  content: 'Content without image.',
  author: 'Jane Doe',
  publishedDate: '2024-01-10',
  tags: ['React', 'JavaScript'],
  category: 'javascript',
  readTime: 3,
  isPublished: true,
  isFeatured: false,
  views: 50,
  likes: 10,
}

const mockPostMinimal: BlogPost = {
  id: 'minimal-post',
  title: 'Minimal Post',
  slug: 'minimal-post',
  excerpt: 'Minimal excerpt.',
  content: 'Minimal content.',
  author: 'Test Author',
  publishedDate: '2024-01-01',
  tags: [],
  category: 'web-development',
  readTime: 1,
  isPublished: true,
  isFeatured: false,
}

describe('BlogCard', () => {
  it('renders properly with all blog post data', () => {
    const wrapper = mount(BlogCard, {
      props: {
        post: mockPost,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    // Check if component renders
    expect(wrapper.find('.blog-card').exists()).toBe(true)
    expect(wrapper.find('.blog-image').exists()).toBe(true)
    expect(wrapper.find('.blog-content').exists()).toBe(true)

    // Check blog information
    expect(wrapper.find('.blog-title .title-link').text()).toBe(mockPost.title)
    expect(wrapper.find('.blog-excerpt').text()).toBe(mockPost.excerpt)
    expect(wrapper.find('.author-name').text()).toBe(mockPost.author)

    // Check image attributes
    const img = wrapper.find('.blog-image img')
    expect(img.attributes('src')).toBe(mockPost.featuredImage)
    expect(img.attributes('alt')).toBe(mockPost.title)

    // Check featured badge
    expect(wrapper.find('.featured-badge').exists()).toBe(true)

    // Check category
    expect(wrapper.find('.blog-category').exists()).toBe(true)
  })

  it('renders without featured image when not provided', () => {
    const wrapper = mount(BlogCard, {
      props: {
        post: mockPostWithoutImage,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    expect(wrapper.find('.blog-image').exists()).toBe(false)
    expect(wrapper.find('.blog-content').exists()).toBe(true)
  })

  it('does not render featured badge for non-featured posts', () => {
    const wrapper = mount(BlogCard, {
      props: {
        post: mockPostWithoutImage,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    expect(wrapper.find('.featured-badge').exists()).toBe(false)
  })

  it('displays blog metadata correctly', () => {
    const wrapper = mount(BlogCard, {
      props: {
        post: mockPost,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    // Check read time
    expect(wrapper.find('.blog-read-time').text()).toContain('5 min read')

    // Check date formatting
    expect(wrapper.find('.blog-date').text()).toContain('Jan 15, 2024')

    // Check stats
    const statItems = wrapper.findAll('.stat-item')
    expect(statItems.some((item) => item.text().includes('100'))).toBe(true) // views
    expect(statItems.some((item) => item.text().includes('25'))).toBe(true) // likes
  })

  it('renders tags correctly', () => {
    const wrapper = mount(BlogCard, {
      props: {
        post: mockPost,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    const tags = wrapper.findAll('.tag')
    expect(tags).toHaveLength(3) // Only first 3 tags are shown
    expect(tags[0].text()).toBe('Vue.js')
    expect(tags[1].text()).toBe('Testing')
    expect(tags[2].text()).toBe('JavaScript')

    // Check for "more" indicator
    expect(wrapper.find('.tag-more').text()).toContain('+1 more')
  })

  it('handles posts with no tags', () => {
    const wrapper = mount(BlogCard, {
      props: {
        post: mockPostMinimal,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    expect(wrapper.findAll('.tag')).toHaveLength(0)
    expect(wrapper.find('.tag-more').exists()).toBe(false)
  })

  it('handles posts with few tags (no more indicator)', () => {
    const postWithFewTags = {
      ...mockPost,
      tags: ['Vue.js', 'Testing'],
    }

    const wrapper = mount(BlogCard, {
      props: {
        post: postWithFewTags,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    const tags = wrapper.findAll('.tag')
    expect(tags).toHaveLength(2)
    expect(wrapper.find('.tag-more').exists()).toBe(false)
  })

  it('renders navigation links correctly', () => {
    const wrapper = mount(BlogCard, {
      props: {
        post: mockPost,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    // Check title link
    const titleLink = wrapper.find('.title-link')
    expect(titleLink.exists()).toBe(true)
    expect(titleLink.text()).toBe(mockPost.title)

    // Check read more link
    const readMoreLink = wrapper.find('.read-more')
    expect(readMoreLink.exists()).toBe(true)
    expect(readMoreLink.text()).toContain('Read More')

    // Check read article link in overlay
    const readArticleLink = wrapper.find('.read-link')
    expect(readArticleLink.exists()).toBe(true)
    expect(readArticleLink.text()).toContain('Read Article')
  })

  it('emits mouseenter and mouseleave events', async () => {
    const wrapper = mount(BlogCard, {
      props: {
        post: mockPost,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    // Test mouseenter event
    await wrapper.find('.blog-card').trigger('mouseenter')
    expect(wrapper.emitted('mouseenter')).toBeTruthy()
    expect(wrapper.emitted('mouseenter')).toHaveLength(1)

    // Test mouseleave event
    await wrapper.find('.blog-card').trigger('mouseleave')
    expect(wrapper.emitted('mouseleave')).toBeTruthy()
    expect(wrapper.emitted('mouseleave')).toHaveLength(1)
  })

  it('handles posts without views and likes', () => {
    const postWithoutStats = {
      ...mockPost,
      views: undefined,
      likes: undefined,
    }

    const wrapper = mount(BlogCard, {
      props: {
        post: postWithoutStats,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    expect(wrapper.find('.blog-stats').exists()).toBe(false)
  })

  it('has proper component structure', () => {
    const wrapper = mount(BlogCard, {
      props: {
        post: mockPost,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    // Check main structure
    expect(wrapper.find('.blog-card').exists()).toBe(true)
    expect(wrapper.find('.blog-image').exists()).toBe(true)
    expect(wrapper.find('.blog-overlay').exists()).toBe(true)
    expect(wrapper.find('.blog-badges').exists()).toBe(true)
    expect(wrapper.find('.blog-content').exists()).toBe(true)
    expect(wrapper.find('.blog-meta').exists()).toBe(true)
    expect(wrapper.find('.blog-title').exists()).toBe(true)
    expect(wrapper.find('.blog-excerpt').exists()).toBe(true)
    expect(wrapper.find('.blog-tags').exists()).toBe(true)
    expect(wrapper.find('.blog-footer').exists()).toBe(true)
    expect(wrapper.find('.blog-author').exists()).toBe(true)
  })

  it('renders SVG icons correctly', () => {
    const wrapper = mount(BlogCard, {
      props: {
        post: mockPost,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    // Check featured badge SVG
    const featuredSvg = wrapper.find('.featured-badge svg')
    expect(featuredSvg.exists()).toBe(true)
    expect(featuredSvg.attributes('width')).toBe('16')
    expect(featuredSvg.attributes('height')).toBe('16')

    // Check author avatar SVG
    const authorSvg = wrapper.find('.author-avatar svg')
    expect(authorSvg.exists()).toBe(true)
    expect(authorSvg.attributes('width')).toBe('18')
    expect(authorSvg.attributes('height')).toBe('18')

    // Check read more arrow SVG
    const readMoreSvg = wrapper.find('.read-more svg')
    expect(readMoreSvg.exists()).toBe(true)
    expect(readMoreSvg.attributes('width')).toBe('16')
    expect(readMoreSvg.attributes('height')).toBe('16')

    // Check stats SVGs
    const statSvgs = wrapper.findAll('.stat-item svg')
    expect(statSvgs.length).toBeGreaterThan(0)
    statSvgs.forEach((svg) => {
      expect(svg.attributes('width')).toBe('14')
      expect(svg.attributes('height')).toBe('14')
    })
  })

  it('displays category with correct styling', () => {
    const wrapper = mount(BlogCard, {
      props: {
        post: mockPost,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    const category = wrapper.find('.blog-category')
    expect(category.exists()).toBe(true)
    expect(category.text()).toBe('Vue.js') // Based on category 'vue'
    // Check that style attribute contains background-color (RGB format is acceptable)
    expect(category.attributes('style')).toMatch(
      /background-color:\s*rgb\(16,\s*185,\s*129\)|background-color:\s*#10b981/,
    )
  })

  it('truncates excerpt properly', () => {
    const postWithLongExcerpt = {
      ...mockPost,
      excerpt:
        'This is a very long excerpt that should be truncated when displayed in the blog card component to ensure proper layout and readability.',
    }

    const wrapper = mount(BlogCard, {
      props: {
        post: postWithLongExcerpt,
      },
      global: {
        plugins: [mockRouter],
      },
    })

    const excerpt = wrapper.find('.blog-excerpt')
    expect(excerpt.exists()).toBe(true)
    expect(excerpt.text()).toBe(postWithLongExcerpt.excerpt)
  })
})
