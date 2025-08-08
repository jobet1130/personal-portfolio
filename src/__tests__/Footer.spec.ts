import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../components/Footer.vue'

describe('Footer.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(Footer)
    expect(wrapper.find('.footer').exists()).toBe(true)
    expect(wrapper.find('.footer-content').exists()).toBe(true)
  })

  it('displays current year in copyright', () => {
    const currentYear = new Date().getFullYear()
    const wrapper = mount(Footer)
    const copyrightText = wrapper.find('.footer-content p')
    
    expect(copyrightText.exists()).toBe(true)
    expect(copyrightText.text()).toBe(`© ${currentYear} Portfolio. All rights reserved.`)
  })

  it('updates year dynamically', () => {
    // Mock Date to return a specific year
    const mockDate = new Date('2025-01-01')
    vi.spyOn(global, 'Date').mockImplementation(() => mockDate)
    
    const wrapper = mount(Footer)
    const copyrightText = wrapper.find('.footer-content p')
    
    expect(copyrightText.text()).toContain('2025')
    
    vi.restoreAllMocks()
  })

  it('renders social links', () => {
    const wrapper = mount(Footer)
    const socialLinks = wrapper.findAll('.social-links a')
    
    expect(socialLinks).toHaveLength(4)
  })

  it('has correct social link icons', () => {
    const wrapper = mount(Footer)
    const socialIcons = wrapper.findAll('.social-links a i')
    
    const expectedIcons = [
      'fab fa-github',
      'fab fa-linkedin', 
      'fas fa-envelope',
      'fab fa-twitter'
    ]
    
    socialIcons.forEach((icon, index) => {
      expect(icon.classes()).toEqual(expectedIcons[index].split(' '))
    })
  })

  it('has correct aria-labels for accessibility', () => {
    const wrapper = mount(Footer)
    const socialLinks = wrapper.findAll('.social-links a')
    
    const expectedLabels = ['GitHub', 'LinkedIn', 'Email', 'Twitter']
    
    socialLinks.forEach((link, index) => {
      expect(link.attributes('aria-label')).toBe(expectedLabels[index])
    })
  })

  it('has correct target and rel attributes for external links', () => {
    const wrapper = mount(Footer)
    const externalLinks = wrapper.findAll('.social-links a[target="_blank"]')
    
    // GitHub, LinkedIn, and Twitter should have target="_blank"
    expect(externalLinks).toHaveLength(3)
    
    externalLinks.forEach(link => {
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  it('email link does not have target blank', () => {
    const wrapper = mount(Footer)
    const emailLink = wrapper.find('.social-links a[aria-label="Email"]')
    
    expect(emailLink.exists()).toBe(true)
    expect(emailLink.attributes('target')).toBeUndefined()
    expect(emailLink.attributes('rel')).toBeUndefined()
  })

  it('has proper footer structure', () => {
    const wrapper = mount(Footer)
    const footer = wrapper.find('.footer')
    const footerContent = wrapper.find('.footer-content')
    const copyright = wrapper.find('.footer-content p')
    const socialLinks = wrapper.find('.social-links')
    
    expect(footer.exists()).toBe(true)
    expect(footerContent.exists()).toBe(true)
    expect(copyright.exists()).toBe(true)
    expect(socialLinks.exists()).toBe(true)
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(Footer)
    
    expect(wrapper.find('.footer').exists()).toBe(true)
    expect(wrapper.find('.footer-content').exists()).toBe(true)
    expect(wrapper.find('.social-links').exists()).toBe(true)
  })

  it('social links have proper structure', () => {
    const wrapper = mount(Footer)
    const socialLinksContainer = wrapper.find('.social-links')
    const socialLinks = wrapper.findAll('.social-links a')
    
    expect(socialLinksContainer.exists()).toBe(true)
    expect(socialLinks).toHaveLength(4)
    
    socialLinks.forEach(link => {
      expect(link.element.tagName.toLowerCase()).toBe('a')
    })
  })

  it('renders with correct semantic HTML', () => {
    const wrapper = mount(Footer)
    
    // Should be wrapped in footer tag
    expect(wrapper.element.tagName.toLowerCase()).toBe('footer')
    
    // Should have proper paragraph for copyright
    const copyright = wrapper.find('p')
    expect(copyright.exists()).toBe(true)
    
    // Social links should be anchor tags
    const socialLinks = wrapper.findAll('.social-links a')
    socialLinks.forEach(link => {
      expect(link.element.tagName.toLowerCase()).toBe('a')
    })
  })

  it('maintains responsive design structure', () => {
    const wrapper = mount(Footer)
    const footerContent = wrapper.find('.footer-content')
    
    // Should have flex layout structure
    expect(footerContent.exists()).toBe(true)
    
    // Should contain both copyright and social links
    expect(footerContent.find('p').exists()).toBe(true)
    expect(footerContent.find('.social-links').exists()).toBe(true)
  })
})