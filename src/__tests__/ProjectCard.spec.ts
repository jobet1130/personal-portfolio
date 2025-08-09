import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '../components/ProjectCard.vue'

// Mock vue-router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

const mockProject = {
  id: 1,
  title: 'Test Project',
  description: 'This is a test project description for testing purposes.',
  imageUrl: '/images/projects/test-project.jpg',
  technologies: ['Vue.js', 'TypeScript', 'Vitest'],
  liveUrl: 'https://test-project.example.com',
  githubUrl: 'https://github.com/test/project',
  featured: true
}

const mockProjectWithoutImage = {
  id: 2,
  title: 'Project Without Image',
  description: 'This project has no image URL.',
  technologies: ['React', 'JavaScript'],
  liveUrl: 'https://no-image-project.example.com',
  featured: false
}

const mockProjectMinimal = {
  id: 3,
  title: 'Minimal Project',
  description: 'This project has minimal information.',
  technologies: ['HTML', 'CSS'],
  featured: false
}

describe('ProjectCard', () => {
  it('renders properly with all project data', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject
      }
    })

    // Check if component renders
    expect(wrapper.find('.project-card').exists()).toBe(true)
    expect(wrapper.find('.project-image').exists()).toBe(true)
    expect(wrapper.find('.project-content').exists()).toBe(true)

    // Check project information
    expect(wrapper.find('.project-title').text()).toBe(mockProject.title)
    expect(wrapper.find('.project-description').text()).toBe(mockProject.description)

    // Check image attributes
    const img = wrapper.find('.project-image img')
    expect(img.attributes('src')).toBe(mockProject.imageUrl)
    expect(img.attributes('alt')).toBe(mockProject.title)

    // Check technologies
    const techTags = wrapper.findAll('.tech-tag')
    expect(techTags).toHaveLength(mockProject.technologies.length)
    mockProject.technologies.forEach((tech, index) => {
      expect(techTags[index].text()).toBe(tech)
    })

    // Check featured badge
    expect(wrapper.find('.featured-badge').exists()).toBe(true)
  })

  it('renders with placeholder image when imageUrl is not provided', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProjectWithoutImage
      }
    })

    const img = wrapper.find('.project-image img')
    expect(img.attributes('src')).toBe('/images/projects/placeholder.svg')
    expect(img.attributes('alt')).toBe(mockProjectWithoutImage.title)
  })

  it('does not render featured badge for non-featured projects', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProjectWithoutImage
      }
    })

    expect(wrapper.find('.featured-badge').exists()).toBe(false)
  })

  it('renders project links when URLs are provided', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject
      }
    })

    const links = wrapper.findAll('.project-link')
    expect(links).toHaveLength(3) // View Details button + Live Demo + GitHub

    // Check View Details button
    const viewDetailsButton = links[0]
    expect(viewDetailsButton.element.tagName).toBe('BUTTON')
    expect(viewDetailsButton.classes()).toContain('view-details')
    expect(viewDetailsButton.attributes('title')).toBe('View Project Details')
    expect(viewDetailsButton.attributes('aria-label')).toBe('View Project Details')

    // Check live URL link
    const liveLink = links[1]
    expect(liveLink.attributes('href')).toBe(mockProject.liveUrl)
    expect(liveLink.attributes('target')).toBe('_blank')
    expect(liveLink.attributes('rel')).toBe('noopener noreferrer')
    expect(liveLink.attributes('title')).toBe('View Live Demo')
    expect(liveLink.attributes('aria-label')).toBe('View Live Demo')

    // Check GitHub link
    const githubLink = links[2]
    expect(githubLink.attributes('href')).toBe(mockProject.githubUrl)
    expect(githubLink.attributes('target')).toBe('_blank')
    expect(githubLink.attributes('rel')).toBe('noopener noreferrer')
    expect(githubLink.attributes('title')).toBe('View Source Code')
    expect(githubLink.attributes('aria-label')).toBe('View Source Code')
  })

  it('renders only View Details button when URLs are not provided', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProjectMinimal
      }
    })

    const links = wrapper.findAll('.project-link')
    expect(links).toHaveLength(1) // Only View Details button
    expect(links[0].classes()).toContain('view-details')
  })

  it('renders View Details button and live URL link when GitHub URL is not provided', () => {
    const projectWithOnlyLiveUrl = {
      ...mockProjectMinimal,
      liveUrl: 'https://example.com'
    }

    const wrapper = mount(ProjectCard, {
      props: {
        project: projectWithOnlyLiveUrl
      }
    })

    const links = wrapper.findAll('.project-link')
    expect(links).toHaveLength(2) // View Details button + Live Demo
    expect(links[0].classes()).toContain('view-details')
    expect(links[1].attributes('href')).toBe(projectWithOnlyLiveUrl.liveUrl)
  })

  it('renders View Details button and GitHub link when live URL is not provided', () => {
    const projectWithOnlyGithubUrl = {
      ...mockProjectMinimal,
      githubUrl: 'https://github.com/user/repo'
    }

    const wrapper = mount(ProjectCard, {
      props: {
        project: projectWithOnlyGithubUrl
      }
    })

    const links = wrapper.findAll('.project-link')
    expect(links).toHaveLength(2) // View Details button + GitHub
    expect(links[0].classes()).toContain('view-details')
    expect(links[1].attributes('href')).toBe(projectWithOnlyGithubUrl.githubUrl)
  })

  it('handles empty technologies array', () => {
    const projectWithNoTech = {
      ...mockProjectMinimal,
      technologies: []
    }

    const wrapper = mount(ProjectCard, {
      props: {
        project: projectWithNoTech
      }
    })

    expect(wrapper.findAll('.tech-tag')).toHaveLength(0)
  })

  it('renders correct number of technology tags', () => {
    const projectWithManyTech = {
      ...mockProject,
      technologies: ['Vue.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'Node.js', 'Express']
    }

    const wrapper = mount(ProjectCard, {
      props: {
        project: projectWithManyTech
      }
    })

    const techTags = wrapper.findAll('.tech-tag')
    expect(techTags).toHaveLength(projectWithManyTech.technologies.length)
  })

  it('has proper component structure', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject
      }
    })

    // Check main structure
    expect(wrapper.find('.project-card').exists()).toBe(true)
    expect(wrapper.find('.project-image').exists()).toBe(true)
    expect(wrapper.find('.project-overlay').exists()).toBe(true)
    expect(wrapper.find('.project-links').exists()).toBe(true)
    expect(wrapper.find('.project-content').exists()).toBe(true)
    expect(wrapper.find('.project-technologies').exists()).toBe(true)
  })

  it('renders SVG icons correctly', () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject
      }
    })

    // Check featured badge SVG
    const featuredSvg = wrapper.find('.featured-badge svg')
    expect(featuredSvg.exists()).toBe(true)
    expect(featuredSvg.attributes('width')).toBe('16')
    expect(featuredSvg.attributes('height')).toBe('16')

    // Check link SVGs
    const linkSvgs = wrapper.findAll('.project-link svg')
    expect(linkSvgs).toHaveLength(3) // View Details + Live Demo + GitHub
    linkSvgs.forEach(svg => {
      expect(svg.attributes('width')).toBe('20')
      expect(svg.attributes('height')).toBe('20')
    })
  })

  it('navigates to project detail page when View Details button is clicked', async () => {
    const wrapper = mount(ProjectCard, {
      props: {
        project: mockProject
      }
    })

    const viewDetailsButton = wrapper.find('.view-details')
    await viewDetailsButton.trigger('click')

    expect(mockPush).toHaveBeenCalledWith(`/project/${mockProject.id}`)
  })
})