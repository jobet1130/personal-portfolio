import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Projects from '../components/Projects.vue'

// Mock the projects data
vi.mock('../data/projects', () => ({
  projects: [
    {
      id: 1,
      title: 'Test Project 1',
      description: 'A test project description',
      technologies: ['Vue.js', 'TypeScript'],
      githubUrl: 'https://github.com/test/project1',
      liveUrl: 'https://project1.example.com',
      imageUrl: '/images/test1.jpg',
      featured: true,
    },
    {
      id: 2,
      title: 'Test Project 2',
      description: 'Another test project',
      technologies: ['React', 'JavaScript'],
      githubUrl: 'https://github.com/test/project2',
      liveUrl: 'https://project2.example.com',
      imageUrl: '/images/test2.jpg',
      featured: false,
    },
    {
      id: 3,
      title: 'Mobile App',
      description: 'A mobile application',
      technologies: ['React Native', 'TypeScript'],
      githubUrl: 'https://github.com/test/mobile-app',
      imageUrl: '/images/mobile.jpg',
      featured: false,
    },
  ],
  getFeaturedProjects: () => [
    {
      id: 1,
      title: 'Test Project 1',
      description: 'A test project description',
      technologies: ['Vue.js', 'TypeScript'],
      githubUrl: 'https://github.com/test/project1',
      liveUrl: 'https://project1.example.com',
      imageUrl: '/images/test1.jpg',
      featured: true,
    },
  ],
  getProjectsByTechnology: vi.fn(),
}))

describe('Projects Component', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(Projects)
  })

  describe('Component Rendering', () => {
    it('renders the component correctly', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('displays the section title', () => {
      const title = wrapper.find('.section-title')
      expect(title.exists()).toBe(true)
      expect(title.text()).toBe('My Projects')
    })

    it('displays the section subtitle', () => {
      const subtitle = wrapper.find('.section-subtitle')
      expect(subtitle.exists()).toBe(true)
      expect(subtitle.text()).toContain('Here are some of the projects')
    })

    it('renders filter buttons', () => {
      const filterButtons = wrapper.findAll('.filter-btn')
      expect(filterButtons).toHaveLength(4)

      const buttonTexts = filterButtons.map((btn) => btn.text())
      expect(buttonTexts).toEqual(['All Projects', 'Featured', 'Web Apps', 'Mobile'])
    })

    it('renders projects grid', () => {
      const projectsGrid = wrapper.find('.projects-grid')
      expect(projectsGrid.exists()).toBe(true)
    })
  })

  describe('Project Cards', () => {
    it('renders project cards with correct data', () => {
      const projectCards = wrapper.findAll('.project-card')
      expect(projectCards.length).toBeGreaterThan(0)
    })

    it('displays project title and description', () => {
      const firstCard = wrapper.find('.project-card')
      const title = firstCard.find('.project-title')
      const description = firstCard.find('.project-description')

      expect(title.exists()).toBe(true)
      expect(description.exists()).toBe(true)
    })

    it('displays technology tags', () => {
      const firstCard = wrapper.find('.project-card')
      const techTags = firstCard.findAll('.tech-tag')

      expect(techTags.length).toBeGreaterThan(0)
    })

    it('displays project image with correct attributes', () => {
      const firstCard = wrapper.find('.project-card')
      const image = firstCard.find('.project-image img')

      expect(image.exists()).toBe(true)
      expect(image.attributes('loading')).toBe('lazy')
      expect(image.attributes('alt')).toBeDefined()
    })

    it('shows featured badge for featured projects', () => {
      const featuredCards = wrapper.findAll('.project-card').filter((card) => {
        return card.find('.featured-badge').exists()
      })

      expect(featuredCards.length).toBeGreaterThan(0)
    })

    it('displays project links when available', () => {
      const firstCard = wrapper.find('.project-card')
      const projectLinks = firstCard.findAll('.project-link')

      expect(projectLinks.length).toBeGreaterThan(0)

      // Check if links have correct attributes
      projectLinks.forEach((link) => {
        expect(link.attributes('target')).toBe('_blank')
        expect(link.attributes('rel')).toBe('noopener noreferrer')
      })
    })
  })

  describe('Filtering Functionality', () => {
    it('has "All Projects" filter active by default', () => {
      const allProjectsBtn = wrapper.find('.filter-btn')
      expect(allProjectsBtn.classes()).toContain('active')
    })

    it('changes active filter when clicking filter buttons', async () => {
      const featuredBtn = wrapper.findAll('.filter-btn')[1] // Featured button

      await featuredBtn.trigger('click')

      expect(featuredBtn.classes()).toContain('active')

      // Check that other buttons are not active
      const allProjectsBtn = wrapper.findAll('.filter-btn')[0]
      expect(allProjectsBtn.classes()).not.toContain('active')
    })

    it('filters projects correctly when "Featured" is selected', async () => {
      const featuredBtn = wrapper.findAll('.filter-btn')[1]

      await featuredBtn.trigger('click')
      await wrapper.vm.$nextTick()

      // Should show only featured projects
      const projectCards = wrapper.findAll('.project-card')
      const featuredBadges = wrapper.findAll('.featured-badge')

      expect(featuredBadges.length).toBe(projectCards.length)
    })

    it('filters web projects correctly', async () => {
      const webBtn = wrapper.findAll('.filter-btn')[2]

      await webBtn.trigger('click')
      await wrapper.vm.$nextTick()

      // Should show projects with web technologies
      const projectCards = wrapper.findAll('.project-card')
      expect(projectCards.length).toBeGreaterThan(0)
    })

    it('filters mobile projects correctly', async () => {
      const mobileBtn = wrapper.findAll('.filter-btn')[3]

      await mobileBtn.trigger('click')
      await wrapper.vm.$nextTick()

      // Should show projects with mobile technologies
      const projectCards = wrapper.findAll('.project-card')
      expect(projectCards.length).toBeGreaterThan(0)
    })
  })

  describe('Hover Interactions', () => {
    it('handles card hover events', async () => {
      const firstCard = wrapper.find('.project-card')

      await firstCard.trigger('mouseenter')
      expect((wrapper.vm as unknown as { hoveredCard: number | null }).hoveredCard).toBe(1) // First project ID

      await firstCard.trigger('mouseleave')
      expect((wrapper.vm as unknown as { hoveredCard: number | null }).hoveredCard).toBe(null)
    })

    it('shows overlay on card hover', async () => {
      const firstCard = wrapper.find('.project-card')
      const overlay = firstCard.find('.project-overlay')

      expect(overlay.exists()).toBe(true)
    })
  })

  describe('Responsive Design', () => {
    it('has responsive classes', () => {
      const container = wrapper.find('.container')
      const projectsGrid = wrapper.find('.projects-grid')

      expect(container.exists()).toBe(true)
      expect(projectsGrid.exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes for links', () => {
      const projectLinks = wrapper.findAll('.project-link')

      projectLinks.forEach((link) => {
        expect(link.attributes('title')).toBeDefined()
      })
    })

    it('has proper alt text for images', () => {
      const images = wrapper.findAll('.project-image img')

      images.forEach((img) => {
        expect(img.attributes('alt')).toBeDefined()
        expect(img.attributes('alt')).not.toBe('')
      })
    })

    it('has semantic HTML structure', () => {
      const section = wrapper.find('section')
      expect(section.exists()).toBe(true)
      expect(section.attributes('id')).toBe('projects')
    })
  })

  describe('Performance', () => {
    it('uses lazy loading for images', () => {
      const images = wrapper.findAll('.project-image img')

      images.forEach((img) => {
        expect(img.attributes('loading')).toBe('lazy')
      })
    })
  })

  describe('Load More Functionality', () => {
    it('does not show load more button when hasMoreProjects is false', () => {
      const loadMoreSection = wrapper.find('.load-more')
      expect(loadMoreSection.exists()).toBe(false)
    })

    it('calls loadMoreProjects method when button is clicked', async () => {
      // Mock console.log to test the method call
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

      // Directly call the method since the button is not visible by default
      await (wrapper.vm as unknown as { loadMoreProjects: () => Promise<void> }).loadMoreProjects()

      expect(consoleSpy).toHaveBeenCalledWith('Loading more projects...')

      consoleSpy.mockRestore()
    })
  })

  describe('Data Integration', () => {
    it('uses projects data correctly', () => {
      expect(
        (wrapper.vm as unknown as { filteredProjects: unknown[] }).filteredProjects,
      ).toBeDefined()
      expect(
        Array.isArray((wrapper.vm as unknown as { filteredProjects: unknown[] }).filteredProjects),
      ).toBe(true)
    })

    it('computes filtered projects correctly', () => {
      const allProjects = (wrapper.vm as unknown as { filteredProjects: unknown[] })
        .filteredProjects
      expect(allProjects.length).toBeGreaterThan(0)
    })
  })
})
