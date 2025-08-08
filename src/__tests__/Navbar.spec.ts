import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Navbar from '../components/Navbar.vue'

// Mock scrollIntoView
Object.defineProperty(window, 'scrollIntoView', {
  value: vi.fn(),
  writable: true
})

describe('Navbar.vue', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(Navbar)
  })

  it('renders properly', () => {
    expect(wrapper.find('.header').exists()).toBe(true)
    expect(wrapper.find('.nav').exists()).toBe(true)
  })

  it('displays brand name', () => {
    const brand = wrapper.find('.nav-brand .brand-text')
    expect(brand.exists()).toBe(true)
    expect(brand.text()).toBe('Portfolio')
  })

  it('renders navigation links', () => {
    const navLinks = wrapper.findAll('.nav-links a')
    expect(navLinks).toHaveLength(5)
    
    const expectedLinks = ['Home', 'About', 'Skills', 'Projects', 'Contact']
    navLinks.forEach((link, index) => {
      expect(link.text()).toBe(expectedLinks[index])
    })
  })

  it('has mobile menu toggle button', () => {
    const toggleButton = wrapper.find('.mobile-menu-toggle')
    expect(toggleButton.exists()).toBe(true)
    expect(toggleButton.findAll('span')).toHaveLength(3)
  })

  it('toggles mobile menu when button is clicked', async () => {
    const toggleButton = wrapper.find('.mobile-menu-toggle')
    const navLinks = wrapper.find('.nav-links')
    
    // Initially mobile menu should be closed
    expect(navLinks.classes()).not.toContain('nav-links-open')
    expect(toggleButton.classes()).not.toContain('active')
    
    // Click to open
    await toggleButton.trigger('click')
    expect(navLinks.classes()).toContain('nav-links-open')
    expect(toggleButton.classes()).toContain('active')
    
    // Click to close
    await toggleButton.trigger('click')
    expect(navLinks.classes()).not.toContain('nav-links-open')
    expect(toggleButton.classes()).not.toContain('active')
  })

  it('calls scrollTo function when navigation link is clicked', async () => {
    // Mock getElementById
    const mockElement = {
      scrollIntoView: vi.fn()
    }
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as unknown as HTMLElement)
    
    const homeLink = wrapper.find('.nav-links a[href="#home"]')
    await homeLink.trigger('click')
    
    expect(document.getElementById).toHaveBeenCalledWith('home')
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('closes mobile menu when navigation link is clicked', async () => {
    const toggleButton = wrapper.find('.mobile-menu-toggle')
    const navLinks = wrapper.find('.nav-links')
    const homeLink = wrapper.find('.nav-links a[href="#home"]')
    
    // Open mobile menu first
    await toggleButton.trigger('click')
    expect(navLinks.classes()).toContain('nav-links-open')
    
    // Click navigation link
    await homeLink.trigger('click')
    expect(navLinks.classes()).not.toContain('nav-links-open')
  })

  it('handles scrollTo when element does not exist', async () => {
    vi.spyOn(document, 'getElementById').mockReturnValue(null)
    
    const homeLink = wrapper.find('.nav-links a[href="#home"]')
    
    // Should not throw error when element doesn't exist
    expect(async () => {
      await homeLink.trigger('click')
    }).not.toThrow()
  })

  it('has correct href attributes', () => {
    const links = wrapper.findAll('.nav-links a')
    const expectedHrefs = ['#home', '#about', '#skills', '#projects', '#contact']
    
    links.forEach((link, index) => {
      expect(link.attributes('href')).toBe(expectedHrefs[index])
    })
  })

  it('applies correct CSS classes for mobile menu states', async () => {
    const toggleButton = wrapper.find('.mobile-menu-toggle')
    const navLinks = wrapper.find('.nav-links')
    
    // Test initial state
    expect(navLinks.classes()).toContain('nav-links')
    expect(navLinks.classes()).not.toContain('nav-links-open')
    
    // Test open state
    await toggleButton.trigger('click')
    expect(navLinks.classes()).toContain('nav-links-open')
    expect(toggleButton.classes()).toContain('active')
  })
})