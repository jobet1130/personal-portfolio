import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Timeline from '../components/Timeline.vue'

describe('Timeline.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(Timeline)
  })

  describe('Component Rendering', () => {
    it('renders the timeline component', () => {
      expect(wrapper.find('.timeline').exists()).toBe(true)
      expect(wrapper.find('.timeline-container').exists()).toBe(true)
    })

    it('renders the timeline header section', () => {
      expect(wrapper.find('.timeline-header').exists()).toBe(true)
      expect(wrapper.find('.timeline-title').text()).toBe('My Journey')
      expect(wrapper.find('.timeline-intro').text()).toBe('A timeline of my professional and educational milestones')
    })

    it('renders timeline content and items', () => {
      expect(wrapper.find('.timeline-content').exists()).toBe(true)
      expect(wrapper.findAll('.timeline-item').length).toBeGreaterThan(0)
    })
  })

  describe('Timeline Items', () => {
    it('displays timeline items with correct structure', () => {
      const timelineItems = wrapper.findAll('.timeline-item')
      expect(timelineItems.length).toBe(6) // Based on the timeline data

      // Check first item structure
      const firstItem = timelineItems[0]
      expect(firstItem.find('.timeline-marker').exists()).toBe(true)
      expect(firstItem.find('.timeline-icon').exists()).toBe(true)
      expect(firstItem.find('.timeline-card').exists()).toBe(true)
      expect(firstItem.find('.timeline-date').exists()).toBe(true)
      expect(firstItem.find('.timeline-title-item').exists()).toBe(true)
      expect(firstItem.find('.timeline-company').exists()).toBe(true)
      expect(firstItem.find('.timeline-description').exists()).toBe(true)
    })

    it('displays current job information correctly', () => {
      const timelineItems = wrapper.findAll('.timeline-item')
      const currentJob = timelineItems[0]
      
      expect(currentJob.find('.timeline-date').text()).toBe('2024 - Present')
      expect(currentJob.find('.timeline-title-item').text()).toBe('Junior Salesforce Administrator')
      expect(currentJob.find('.timeline-company').text()).toBe('Erietech')
      expect(currentJob.find('.timeline-description').text()).toContain('Currently working as a Junior Salesforce Administrator')
      expect(currentJob.find('.timeline-icon').text()).toBe('🔧')
    })

    it('displays education information correctly', () => {
      const timelineItems = wrapper.findAll('.timeline-item')
      const education = timelineItems[5] // Last item should be education
      
      expect(education.find('.timeline-date').text()).toBe('2018 - 2022')
      expect(education.find('.timeline-title-item').text()).toBe('Bachelor of Science in Information Technology')
      expect(education.find('.timeline-company').text()).toBe('University of Science and Technology of Southern Philippines - Panaon Campus')
      expect(education.find('.timeline-description').text()).toContain('Focused on software development')
      expect(education.find('.timeline-icon').text()).toBe('🎓')
    })

    it('displays internship information correctly', () => {
      const timelineItems = wrapper.findAll('.timeline-item')
      const internship = timelineItems[4] // Should be the internship
      
      expect(internship.find('.timeline-date').text()).toBe('May - July 2022')
      expect(internship.find('.timeline-title-item').text()).toBe('Java Application Developer Intern')
      expect(internship.find('.timeline-company').text()).toBe('USTP - Panaon Campus')
      expect(internship.find('.timeline-description').text()).toContain('3-month internship')
      expect(internship.find('.timeline-icon').text()).toBe('💻')
    })
  })

  describe('Skills Display', () => {
    it('displays skills for timeline items that have them', () => {
      const timelineItems = wrapper.findAll('.timeline-item')
      
      // Check that skills are displayed
      timelineItems.forEach(item => {
        const skillsSection = item.find('.timeline-skills')
        if (skillsSection.exists()) {
          const skillTags = item.findAll('.skill-tag')
          expect(skillTags.length).toBeGreaterThan(0)
        }
      })
    })

    it('displays correct skills for current job', () => {
      const timelineItems = wrapper.findAll('.timeline-item')
      const currentJob = timelineItems[0]
      const skillTags = currentJob.findAll('.skill-tag')
      
      expect(skillTags.length).toBe(4)
      expect(skillTags[0].text()).toBe('Salesforce Administration')
      expect(skillTags[1].text()).toBe('User Management')
      expect(skillTags[2].text()).toBe('Workflow Configuration')
      expect(skillTags[3].text()).toBe('Data Management')
    })

    it('displays correct skills for education', () => {
      const timelineItems = wrapper.findAll('.timeline-item')
      const education = timelineItems[5]
      const skillTags = education.findAll('.skill-tag')
      
      expect(skillTags.length).toBe(4)
      expect(skillTags[0].text()).toBe('Java')
      expect(skillTags[1].text()).toBe('Database Design')
      expect(skillTags[2].text()).toBe('Software Engineering')
      expect(skillTags[3].text()).toBe('System Architecture')
    })
  })

  describe('Timeline Data Structure', () => {
    it('contains all expected timeline entries', () => {
      const timelineItems = wrapper.findAll('.timeline-item')
      const expectedTitles = [
        'Junior Salesforce Administrator',
        'Junior Salesforce Developer',
        'Junior Developer',
        'Community Support (Part-time)',
        'Java Application Developer Intern',
        'Bachelor of Science in Information Technology'
      ]
      
      expectedTitles.forEach((title, index) => {
        expect(timelineItems[index].find('.timeline-title-item').text()).toBe(title)
      })
    })

    it('displays companies correctly', () => {
      const timelineItems = wrapper.findAll('.timeline-item')
      const expectedCompanies = [
        'Erietech',
        'Aether Global',
        'AlphaSys Pty Ltd',
        'StudevPH',
        'USTP - Panaon Campus',
        'University of Science and Technology of Southern Philippines - Panaon Campus'
      ]
      
      expectedCompanies.forEach((company, index) => {
        expect(timelineItems[index].find('.timeline-company').text()).toBe(company)
      })
    })

    it('displays dates in chronological order (newest first)', () => {
      const timelineItems = wrapper.findAll('.timeline-item')
      const dates = timelineItems.map(item => item.find('.timeline-date').text())
      
      expect(dates[0]).toBe('2024 - Present') // Current job
      expect(dates[1]).toBe('2024') // Previous Salesforce job
      expect(dates[2]).toBe('2023 - 2024') // Junior Developer
      expect(dates[3]).toBe('2023 - Present') // Part-time job
      expect(dates[4]).toBe('May - July 2022') // Internship
      expect(dates[5]).toBe('2018 - 2022') // Education
    })
  })

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      expect(wrapper.find('section').exists()).toBe(true)
      expect(wrapper.find('h2').exists()).toBe(true) // Main title
      expect(wrapper.findAll('h3').length).toBeGreaterThan(0) // Timeline item titles
      expect(wrapper.findAll('h4').length).toBeGreaterThan(0) // Company names
    })

    it('uses semantic HTML elements', () => {
      expect(wrapper.find('section.timeline').exists()).toBe(true)
      expect(wrapper.findAll('p').length).toBeGreaterThan(0) // Descriptions
    })
  })

  describe('CSS Classes', () => {
    it('has correct CSS classes for styling', () => {
      expect(wrapper.classes()).toContain('timeline')
      expect(wrapper.find('.timeline-container').exists()).toBe(true)
      expect(wrapper.find('.timeline-header').exists()).toBe(true)
      expect(wrapper.find('.timeline-content').exists()).toBe(true)
    })

    it('has timeline markers for visual timeline', () => {
      const timelineMarkers = wrapper.findAll('.timeline-marker')
      expect(timelineMarkers.length).toBe(6)
      
      timelineMarkers.forEach(marker => {
        expect(marker.find('.timeline-icon').exists()).toBe(true)
      })
    })
  })

  describe('Responsive Design Elements', () => {
    it('has responsive container structure', () => {
      expect(wrapper.find('.timeline-container').exists()).toBe(true)
      expect(wrapper.find('.timeline-content').exists()).toBe(true)
    })
  })
})