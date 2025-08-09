import { describe, it, expect, beforeEach } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Navbar from '../components/Navbar.vue'

// Create a mock router
const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: { template: '<div>Home</div>' } },
    { path: '/about', name: 'About', component: { template: '<div>About</div>' } },
    { path: '/projects', name: 'Projects', component: { template: '<div>Projects</div>' } },
    { path: '/blog', name: 'Blog', component: { template: '<div>Blog</div>' } },
    { path: '/resume', name: 'Resume', component: { template: '<div>Resume</div>' } },
  ],
})

describe('Navbar.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(Navbar, {
      global: {
        plugins: [mockRouter],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
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
    const navLinks = wrapper.findAllComponents(RouterLinkStub)
    expect(navLinks).toHaveLength(6) // 5 nav links + 1 brand link
    
    const navOnlyLinks = wrapper.findAll('.nav-links li')
    expect(navOnlyLinks).toHaveLength(5)
    
    const expectedLinks = ['Home', 'About', 'Projects', 'Blog', 'Resume']
    navOnlyLinks.forEach((link, index) => {
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

  it('has correct router-link destinations', () => {
    const navLinks = wrapper.findAll('.nav-links li')
    const expectedRoutes = ['/', '/about', '/projects', '/blog', '/resume']
    
    navLinks.forEach((link, index) => {
      const routerLink = link.findComponent(RouterLinkStub)
      expect(routerLink.props('to')).toBe(expectedRoutes[index])
    })
  })

  it('closes mobile menu when navigation link is clicked', async () => {
    const toggleButton = wrapper.find('.mobile-menu-toggle')
    const navLinks = wrapper.find('.nav-links')
    const homeLink = wrapper.findAll('.nav-links li').at(0)?.findComponent(RouterLinkStub)
    
    // Open mobile menu first
    await toggleButton.trigger('click')
    expect(navLinks.classes()).toContain('nav-links-open')
    
    // Click navigation link
    await homeLink?.trigger('click')
    expect(navLinks.classes()).not.toContain('nav-links-open')
  })

  it('navigates to correct route when router-link is clicked', async () => {
    const aboutLink = wrapper.findAll('.nav-links li').at(1)?.findComponent(RouterLinkStub)
    
    // Verify the router-link component is properly configured
    expect(aboutLink?.exists()).toBe(true)
    expect(aboutLink?.props('to')).toBe('/about')
  })

  it('has router-link components with correct attributes', () => {
    const navLinks = wrapper.findAll('.nav-links li')
    
    expect(navLinks.length).toBe(5)
    
    // Verify that router-links have 'to' props
    navLinks.forEach(link => {
      const routerLink = link.findComponent(RouterLinkStub)
      expect(routerLink.props('to')).toBeDefined()
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
