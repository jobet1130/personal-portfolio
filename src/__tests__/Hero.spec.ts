import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Hero from '../components/Hero.vue'

describe('Hero.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(Hero)
  })

  it('renders properly', () => {
    expect(wrapper.find('.hero').exists()).toBe(true)
    expect(wrapper.find('.hero-container').exists()).toBe(true)
    expect(wrapper.find('.hero-content').exists()).toBe(true)
  })

  it('displays the correct name and title', () => {
    const title = wrapper.find('.hero-title')
    const subtitle = wrapper.find('.hero-subtitle')
    
    expect(title.exists()).toBe(true)
    expect(title.text()).toContain('Jobet P. Casquejo')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toBe('Salesforce Developer & CRM Solutions Expert')
  })

  it('displays the hero description', () => {
    const description = wrapper.find('.hero-description')
    
    expect(description.exists()).toBe(true)
    expect(description.text()).toContain('CRM solutions')
    expect(description.text()).toContain('Salesforce')
    expect(description.text()).toContain('Apex')
    expect(description.text()).toContain('Lightning Web Components')
  })

  it('renders action buttons', () => {
    const actionButtons = wrapper.findAll('.btn')
    
    expect(actionButtons).toHaveLength(2)
    expect(actionButtons[0].text()).toBe('Explore My Projects')
    expect(actionButtons[1].text()).toBe("Let's Connect")
  })

  it('has correct button classes', () => {
    const primaryButton = wrapper.find('.btn-primary')
    const secondaryButton = wrapper.find('.btn-secondary')
    
    expect(primaryButton.exists()).toBe(true)
    expect(secondaryButton.exists()).toBe(true)
    expect(primaryButton.text()).toBe('Explore My Projects')
    expect(secondaryButton.text()).toBe("Let's Connect")
  })

  it('renders hero image placeholder', () => {
    const heroImage = wrapper.find('.hero-image')
    const imagePlaceholder = wrapper.find('.image-placeholder')
    
    expect(heroImage.exists()).toBe(true)
    expect(imagePlaceholder.exists()).toBe(true)
  })

  it('has proper semantic structure', () => {
    const section = wrapper.find('section')
    const heading1 = wrapper.find('h1')
    const heading2 = wrapper.find('h2')
    const paragraph = wrapper.find('p')
    
    expect(section.exists()).toBe(true)
    expect(heading1.exists()).toBe(true)
    expect(heading2.exists()).toBe(true)
    expect(paragraph.exists()).toBe(true)
  })

  it('applies correct CSS classes for styling', () => {
    expect(wrapper.find('.hero').classes()).toContain('hero')
    expect(wrapper.find('.hero-container').classes()).toContain('hero-container')
    expect(wrapper.find('.hero-content').classes()).toContain('hero-content')
    expect(wrapper.find('.hero-actions').classes()).toContain('hero-actions')
  })

  it('has highlight span for name', () => {
    const highlight = wrapper.find('.highlight')
    
    expect(highlight.exists()).toBe(true)
    expect(highlight.text()).toBe('Jobet P. Casquejo')
  })

  it('contains scroll indicator for visual enhancement', () => {
    const scrollIndicator = wrapper.find('.scroll-indicator')
    const scrollArrow = wrapper.find('.scroll-arrow')
    
    expect(scrollIndicator.exists()).toBe(true)
    expect(scrollArrow.exists()).toBe(true)
  })

  it('has proper semantic structure for accessibility', () => {
    const section = wrapper.find('section')
    
    expect(section.exists()).toBe(true)
    expect(section.attributes('id')).toBe('home')
  })

  it('renders without errors', () => {
    expect(() => mount(Hero)).not.toThrow()
  })

  it('has responsive structure', () => {
    const heroContainer = wrapper.find('.hero-container')
    const heroContent = wrapper.find('.hero-content')
    const heroImage = wrapper.find('.hero-image')
    
    expect(heroContainer.exists()).toBe(true)
    expect(heroContent.exists()).toBe(true)
    expect(heroImage.exists()).toBe(true)
  })
})