import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import About from '../components/About.vue'

describe('About.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(About)
  })

  it('renders properly', () => {
    expect(wrapper.find('.about').exists()).toBe(true)
    expect(wrapper.find('.about-container').exists()).toBe(true)
    expect(wrapper.find('.about-header').exists()).toBe(true)
    expect(wrapper.find('.about-content').exists()).toBe(true)
  })

  it('displays the correct title and intro', () => {
    const title = wrapper.find('.about-title')
    const intro = wrapper.find('.about-intro')
    
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('About Me')
    expect(intro.exists()).toBe(true)
    expect(intro.text()).toBe('Get to know more about my background and expertise')
  })

  it('displays the about description paragraphs', () => {
    const description = wrapper.find('.about-description')
    const paragraphs = description.findAll('p')
    
    expect(description.exists()).toBe(true)
    expect(paragraphs).toHaveLength(2)
    expect(paragraphs[0].text()).toContain('Salesforce Developer')
    expect(paragraphs[0].text()).toContain('2 years of experience')
    expect(paragraphs[1].text()).toContain('transforming complex business requirements')
  })

  it('renders all highlight items', () => {
    const highlights = wrapper.findAll('.highlight-item')
    
    expect(highlights).toHaveLength(3)
    
    // Check first highlight
    expect(highlights[0].find('.highlight-icon').text()).toBe('💡')
    expect(highlights[0].find('h3').text()).toBe('Innovation Driven')
    expect(highlights[0].find('p').text()).toContain('exploring new technologies')
    
    // Check second highlight
    expect(highlights[1].find('.highlight-icon').text()).toBe('🎯')
    expect(highlights[1].find('h3').text()).toBe('Results Focused')
    expect(highlights[1].find('p').text()).toContain('high-quality solutions')
    
    // Check third highlight
    expect(highlights[2].find('.highlight-icon').text()).toBe('🤝')
    expect(highlights[2].find('h3').text()).toBe('Collaborative')
    expect(highlights[2].find('p').text()).toContain('team player')
  })

  it('renders all statistics cards', () => {
    const statCards = wrapper.findAll('.stat-card')
    
    expect(statCards).toHaveLength(3)
    
    // Check Projects Completed stat
    expect(statCards[0].find('.stat-number').text()).toBe('50+')
    expect(statCards[0].find('.stat-label').text()).toBe('Projects Completed')
    
    // Check Years Experience stat
    expect(statCards[1].find('.stat-number').text()).toBe('2')
    expect(statCards[1].find('.stat-label').text()).toBe('Years Experience')
    
    // Check Technologies Used stat
    expect(statCards[2].find('.stat-number').text()).toBe('10+')
    expect(statCards[2].find('.stat-label').text()).toBe('Technologies Used')
  })

  it('has proper semantic structure', () => {
    const section = wrapper.find('section')
    const heading2 = wrapper.find('h2')
    const heading3s = wrapper.findAll('h3')
    const paragraphs = wrapper.findAll('p')
    
    expect(section.exists()).toBe(true)
    expect(section.attributes('id')).toBe('about')
    expect(heading2.exists()).toBe(true)
    expect(heading3s).toHaveLength(3) // Three highlight headings
    expect(paragraphs.length).toBeGreaterThan(0)
  })

  it('applies correct CSS classes for styling', () => {
    expect(wrapper.find('.about').classes()).toContain('about')
    expect(wrapper.find('.about-container').classes()).toContain('about-container')
    expect(wrapper.find('.about-header').classes()).toContain('about-header')
    expect(wrapper.find('.about-content').classes()).toContain('about-content')
    expect(wrapper.find('.about-text').classes()).toContain('about-text')
    expect(wrapper.find('.about-stats').classes()).toContain('about-stats')
  })

  it('has proper grid layout structure', () => {
    const aboutText = wrapper.find('.about-text')
    const aboutStats = wrapper.find('.about-stats')
    
    expect(aboutText.exists()).toBe(true)
    expect(aboutStats.exists()).toBe(true)
  })

  it('contains highlight icons and content', () => {
    const highlightIcons = wrapper.findAll('.highlight-icon')
    const highlightContents = wrapper.findAll('.highlight-content')
    
    expect(highlightIcons).toHaveLength(3)
    expect(highlightContents).toHaveLength(3)
    
    highlightContents.forEach(content => {
      expect(content.find('h3').exists()).toBe(true)
      expect(content.find('p').exists()).toBe(true)
    })
  })

  it('renders without errors', () => {
    expect(() => mount(About)).not.toThrow()
  })

  it('has responsive structure elements', () => {
    const aboutContent = wrapper.find('.about-content')
    const aboutText = wrapper.find('.about-text')
    const aboutStats = wrapper.find('.about-stats')
    const aboutDescription = wrapper.find('.about-description')
    const aboutHighlights = wrapper.find('.about-highlights')
    
    expect(aboutContent.exists()).toBe(true)
    expect(aboutText.exists()).toBe(true)
    expect(aboutStats.exists()).toBe(true)
    expect(aboutDescription.exists()).toBe(true)
    expect(aboutHighlights.exists()).toBe(true)
  })

  it('has correct content structure for accessibility', () => {
    const section = wrapper.find('section')
    const title = wrapper.find('h2')
    const highlights = wrapper.findAll('h3')
    
    expect(section.exists()).toBe(true)
    expect(title.exists()).toBe(true)
    expect(highlights).toHaveLength(3)
    
    // Check that each highlight has proper heading structure
    highlights.forEach(highlight => {
      expect(highlight.text()).toBeTruthy()
    })
  })

  it('displays experience information correctly', () => {
    const description = wrapper.find('.about-description')
    const experienceStat = wrapper.findAll('.stat-card')[1]
    
    expect(description.text()).toContain('2 years of experience')
    expect(experienceStat.find('.stat-number').text()).toBe('2')
    expect(experienceStat.find('.stat-label').text()).toBe('Years Experience')
  })

  it('contains Salesforce-related content', () => {
    const description = wrapper.find('.about-description')
    
    expect(description.text()).toContain('Salesforce')
    expect(description.text()).toContain('Apex')
    expect(description.text()).toContain('Lightning Web Components')
    expect(description.text()).toContain('CRM solutions')
  })
})