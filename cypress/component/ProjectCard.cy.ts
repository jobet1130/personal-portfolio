import { mount } from 'cypress/vue'
import ProjectCard from '../../src/components/ProjectCard.vue'

const mockProject = {
  id: 1,
  title: 'Test Project',
  description: 'This is a test project description for testing purposes.',
  imageUrl: '/images/projects/test-project.jpg',
  technologies: ['Vue.js', 'TypeScript', 'Cypress'],
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

describe('ProjectCard Component', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
  })

  it('should render project card with all information', () => {
    mount(ProjectCard, {
      props: {
        project: mockProject
      }
    })

    // Check basic structure
    cy.get('.project-card').should('be.visible')
    cy.get('.project-image').should('be.visible')
    cy.get('.project-content').should('be.visible')

    // Check project information
    cy.get('.project-title').should('contain.text', mockProject.title)
    cy.get('.project-description').should('contain.text', mockProject.description)
    
    // Check image
    cy.get('.project-image img')
      .should('have.attr', 'src', mockProject.imageUrl)
      .should('have.attr', 'alt', mockProject.title)

    // Check technologies
    mockProject.technologies.forEach(tech => {
      cy.get('.tech-tag').should('contain.text', tech)
    })

    // Check featured badge
    cy.get('.featured-badge').should('be.visible')
  })

  it('should render project card without image using placeholder', () => {
    mount(ProjectCard, {
      props: {
        project: mockProjectWithoutImage
      }
    })

    // Check placeholder image is used
    cy.get('.project-image img')
      .should('have.attr', 'src', '/images/projects/placeholder.jpg')
      .should('have.attr', 'alt', mockProjectWithoutImage.title)

    // Check no featured badge
    cy.get('.featured-badge').should('not.exist')
  })

  it('should show overlay with links on hover', () => {
    mount(ProjectCard, {
      props: {
        project: mockProject
      }
    })

    // Initially overlay should not be visible
    cy.get('.project-overlay').should('not.be.visible')

    // Hover over the card
    cy.get('.project-card').trigger('mouseenter')
    
    // Overlay should become visible
    cy.get('.project-overlay').should('be.visible')
    
    // Check links are present
    cy.get('.project-links').should('be.visible')
    cy.get('.project-link').should('have.length', 2)

    // Check live URL link
    cy.get('.project-link').first()
      .should('have.attr', 'href', mockProject.liveUrl)
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')

    // Check GitHub link
    cy.get('.project-link').last()
      .should('have.attr', 'href', mockProject.githubUrl)
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noopener noreferrer')
  })

  it('should handle project without optional URLs', () => {
    mount(ProjectCard, {
      props: {
        project: mockProjectMinimal
      }
    })

    // Hover to show overlay
    cy.get('.project-card').trigger('mouseenter')
    
    // No links should be present
    cy.get('.project-link').should('not.exist')
  })

  it('should display correct number of technology tags', () => {
    mount(ProjectCard, {
      props: {
        project: mockProject
      }
    })

    cy.get('.tech-tag').should('have.length', mockProject.technologies.length)
    
    // Verify each technology is displayed
    mockProject.technologies.forEach((tech, index) => {
      cy.get('.tech-tag').eq(index).should('contain.text', tech)
    })
  })

  it('should have proper accessibility attributes', () => {
    mount(ProjectCard, {
      props: {
        project: mockProject
      }
    })

    // Check image alt text
    cy.get('.project-image img')
      .should('have.attr', 'alt', mockProject.title)

    // Check link accessibility
    cy.get('.project-card').trigger('mouseenter')
    
    cy.get('.project-link').first()
      .should('have.attr', 'title', 'View Live Demo')
      .should('have.attr', 'aria-label', 'View Live Demo')

    cy.get('.project-link').last()
      .should('have.attr', 'title', 'View Source Code')
      .should('have.attr', 'aria-label', 'View Source Code')
  })

  it('should handle hover states correctly', () => {
    mount(ProjectCard, {
      props: {
        project: mockProject
      }
    })

    // Test mouse enter
    cy.get('.project-card').trigger('mouseenter')
    cy.get('.project-overlay').should('be.visible')

    // Test mouse leave
    cy.get('.project-card').trigger('mouseleave')
    cy.get('.project-overlay').should('not.be.visible')
  })

  it('should render featured badge only for featured projects', () => {
    // Test featured project
    mount(ProjectCard, {
      props: {
        project: { ...mockProject, featured: true }
      }
    })
    cy.get('.featured-badge').should('be.visible')

    // Test non-featured project
    mount(ProjectCard, {
      props: {
        project: { ...mockProject, featured: false }
      }
    })
    cy.get('.featured-badge').should('not.exist')
  })

  it('should have responsive design', () => {
    mount(ProjectCard, {
      props: {
        project: mockProject
      }
    })

    // Test mobile viewport
    cy.viewport(375, 667)
    cy.get('.project-card').should('be.visible')
    cy.get('.project-content').should('be.visible')
    
    // Test tablet viewport
    cy.viewport(768, 1024)
    cy.get('.project-card').should('be.visible')
    cy.get('.project-content').should('be.visible')
    
    // Test desktop viewport
    cy.viewport(1920, 1080)
    cy.get('.project-card').should('be.visible')
    cy.get('.project-content').should('be.visible')
  })
})