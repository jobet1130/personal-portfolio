import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Resume from '../components/Resume.vue'

describe('Resume.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(Resume)
  })

  describe('Component Rendering', () => {
    it('renders the resume component', () => {
      expect(wrapper.find('.resume').exists()).toBe(true)
      expect(wrapper.find('.container').exists()).toBe(true)
    })

    it('renders the resume header section', () => {
      expect(wrapper.find('.resume-header').exists()).toBe(true)
      expect(wrapper.find('.profile-section').exists()).toBe(true)
      expect(wrapper.find('.contact-info').exists()).toBe(true)
    })

    it('renders the resume content sections', () => {
      expect(wrapper.find('.resume-content').exists()).toBe(true)
      expect(wrapper.findAll('.resume-section')).toHaveLength(3) // Experience, Education, Skills
    })

    it('renders action buttons', () => {
      expect(wrapper.find('.resume-actions').exists()).toBe(true)
      expect(wrapper.find('.download-btn').exists()).toBe(true)
      expect(wrapper.find('.print-btn').exists()).toBe(true)
    })
  })

  describe('Personal Information', () => {
    it('displays personal information correctly', () => {
      expect(wrapper.find('.name').text()).toBe('Jobet Casquejo')
      expect(wrapper.find('.title').text()).toBe('Junior Salesforce Developer/Administrator')
      expect(wrapper.find('.summary').text()).toContain('Salesforce Engineer with 2+ years of experience')
    })

    it('displays profile image with correct attributes', () => {
      const profileImg = wrapper.find('.profile-img')
      expect(profileImg.exists()).toBe(true)
      expect(profileImg.attributes('src')).toBe('/images/profile.jpg')
      expect(profileImg.attributes('alt')).toBe('Profile')
    })

    it('displays contact information', () => {
      const contactItems = wrapper.findAll('.contact-item')
      expect(contactItems).toHaveLength(4) // email, phone, location, linkedin
      
      expect(wrapper.text()).toContain('jobetcasquejo221@gmail.com')
      expect(wrapper.text()).toContain('+639817153118')
      expect(wrapper.text()).toContain('Misamis Occidental, Philippines')
      expect(wrapper.text()).toContain('LinkedIn')
    })

    it('renders LinkedIn as a clickable link', () => {
      const linkedinLink = wrapper.find('a[href="https://www.linkedin.com/in/jobet-casquejo-921840232/"]')
      expect(linkedinLink.exists()).toBe(true)
      expect(linkedinLink.attributes('target')).toBe('_blank')
      expect(linkedinLink.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  describe('Professional Experience Section', () => {
    it('renders experience section with correct title', () => {
      const experienceSection = wrapper.findAll('.resume-section')[0]
      expect(experienceSection.find('.section-title').text()).toContain('Professional Experience')
    })

    it('displays timeline structure', () => {
      expect(wrapper.find('.timeline').exists()).toBe(true)
      expect(wrapper.findAll('.timeline-item')).toHaveLength(5) // 5 jobs
    })

    it('displays job information correctly', () => {
      const firstJob = wrapper.findAll('.timeline-item')[0]
      expect(firstJob.find('.job-title').text()).toBe('Junior Salesforce Developer/Administrator')
      expect(firstJob.find('.job-company').text()).toContain('Erie Management Service')
      expect(firstJob.find('.job-location').text()).toBe('Remote')
      expect(firstJob.find('.job-period').text()).toBe('Sep 2024 - Present')
    })

    it('displays job achievements and technologies', () => {
      const firstJob = wrapper.findAll('.timeline-item')[0]
      const achievements = firstJob.findAll('.job-achievements li')
      expect(achievements.length).toBeGreaterThan(0)
      
      const techTags = firstJob.findAll('.tech-tag')
      expect(techTags.length).toBeGreaterThan(0)
      expect(techTags[0].text()).toBe('Salesforce')
    })

    it('handles current job (no end date)', () => {
      const firstJob = wrapper.findAll('.timeline-item')[0]
      expect(firstJob.find('.job-period').text()).toContain('Present')
    })
  })

  describe('Education Section', () => {
    it('renders education section with correct title', () => {
      const educationSection = wrapper.findAll('.resume-section')[1]
      expect(educationSection.find('.section-title').text()).toContain('Education')
    })

    it('displays education information correctly', () => {
      const education = wrapper.find('.education-item')
      expect(education.find('.education-degree').text()).toBe('Bachelor\'s Degree')
      expect(education.find('.education-school').text()).toContain('University of Science and Technology of Southern Philippines')
      expect(education.find('.education-location').text()).toBe('Philippines')
      expect(education.find('.education-period').text()).toBe('Jun 2018 - Sep 2022')
    })

    it('displays education description and achievements', () => {
      const education = wrapper.find('.education-item')
      expect(education.find('.education-description').text()).toContain('Completed Bachelor\'s degree with focus on technology')
      
      const achievements = education.findAll('.education-achievements li')
      expect(achievements.length).toBe(0) // No achievements listed
    })
  })

  describe('Skills Section', () => {
    it('renders skills section with correct title', () => {
      const skillsSection = wrapper.findAll('.resume-section')[2]
      expect(skillsSection.find('.section-title').text()).toContain('Technical Skills')
    })

    it('displays skill categories', () => {
      const skillCategories = wrapper.findAll('.skill-category')
      expect(skillCategories).toHaveLength(4) // 4 skill categories
      
      const categoryTitles = skillCategories.map(cat => cat.find('.skill-category-title').text())
      expect(categoryTitles).toContain('Salesforce')
      expect(categoryTitles).toContain('Programming Languages')
      expect(categoryTitles).toContain('Development Tools')
      expect(categoryTitles).toContain('Soft Skills')
    })

    it('displays skill items with progress bars', () => {
      const firstCategory = wrapper.findAll('.skill-category')[0]
      const skillItems = firstCategory.findAll('.skill-item')
      expect(skillItems.length).toBeGreaterThan(0)
      
      const firstSkill = skillItems[0]
      expect(firstSkill.find('.skill-name').text()).toBe('Salesforce')
      expect(firstSkill.find('.skill-level').text()).toBe('95%')
      expect(firstSkill.find('.skill-progress').exists()).toBe(true)
    })

    it('sets correct width for skill progress bars', () => {
      const firstSkill = wrapper.find('.skill-item .skill-progress')
      expect(firstSkill.attributes('style')).toContain('width: 95%')
    })
  })

  describe('Action Buttons', () => {
    it('renders download and print buttons with correct text', () => {
      expect(wrapper.find('.download-btn').text()).toContain('Download PDF Resume')
      expect(wrapper.find('.print-btn').text()).toContain('Print Resume')
    })

    it('includes SVG icons in buttons', () => {
      expect(wrapper.find('.download-btn svg').exists()).toBe(true)
      expect(wrapper.find('.print-btn svg').exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      expect(wrapper.find('h1').exists()).toBe(true) // Name
      expect(wrapper.find('h2').exists()).toBe(true) // Title
      expect(wrapper.findAll('h3')).toHaveLength(3) // Section titles
      expect(wrapper.findAll('h4').length).toBeGreaterThan(0) // Job titles, education
    })

    it('has proper ARIA attributes for external links', () => {
      const linkedinLink = wrapper.find('a[href="https://www.linkedin.com/in/jobet-casquejo-921840232/"]')
      expect(linkedinLink.attributes('rel')).toBe('noopener noreferrer')
    })

    it('uses semantic HTML elements', () => {
      expect(wrapper.findAll('section')).toHaveLength(3)
      expect(wrapper.findAll('ul').length).toBeGreaterThan(0)
      expect(wrapper.findAll('li').length).toBeGreaterThan(0)
    })
  })

  describe('CSS Classes', () => {
    it('has correct CSS classes for styling', () => {
      expect(wrapper.classes()).toContain('resume')
      expect(wrapper.find('.container').exists()).toBe(true)
      expect(wrapper.find('.resume-header').exists()).toBe(true)
      expect(wrapper.find('.resume-content').exists()).toBe(true)
      expect(wrapper.find('.resume-actions').exists()).toBe(true)
    })

    it('has timeline markers for experience items', () => {
      const timelineMarkers = wrapper.findAll('.timeline-marker')
      expect(timelineMarkers).toHaveLength(5)
    })
  })

  describe('Responsive Design Elements', () => {
    it('has grid layout for resume header', () => {
      expect(wrapper.find('.resume-header').exists()).toBe(true)
      expect(wrapper.find('.profile-section').exists()).toBe(true)
      expect(wrapper.find('.contact-info').exists()).toBe(true)
    })

    it('has skills grid layout', () => {
      expect(wrapper.find('.skills-grid').exists()).toBe(true)
    })
  })
})