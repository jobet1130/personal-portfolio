import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../components/Layout.vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

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

describe('Layout.vue', () => {
  const mountOptions = {
    global: {
      plugins: [mockRouter],
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  }

  it('renders properly', () => {
    const wrapper = mount(Layout, mountOptions)
    expect(wrapper.find('.layout').exists()).toBe(true)
  })

  it('contains Navbar component', () => {
    const wrapper = mount(Layout, mountOptions)
    expect(wrapper.findComponent(Navbar).exists()).toBe(true)
  })

  it('contains Footer component', () => {
    const wrapper = mount(Layout, mountOptions)
    expect(wrapper.findComponent(Footer).exists()).toBe(true)
  })

  it('has main content area', () => {
    const wrapper = mount(Layout, mountOptions)
    expect(wrapper.find('.main-content').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const slotContent = '<div class="test-content">Test Content</div>'
    const wrapper = mount(Layout, {
      ...mountOptions,
      slots: {
        default: slotContent
      }
    })
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('Test Content')
  })

  it('has correct layout structure', () => {
    const wrapper = mount(Layout, mountOptions)
    const layout = wrapper.find('.layout')
    
    // Check if layout uses flexbox
    expect(layout.classes()).toContain('layout')
    
    // Check order of elements
    const children = layout.element.children
    expect(children[0].tagName.toLowerCase()).toBe('header') // Navbar
    expect(children[1].tagName.toLowerCase()).toBe('main')   // Main content
    expect(children[2].tagName.toLowerCase()).toBe('footer') // Footer
  })

  it('applies correct CSS classes', () => {
    const wrapper = mount(Layout, mountOptions)
    expect(wrapper.find('.layout').exists()).toBe(true)
    expect(wrapper.find('.main-content').exists()).toBe(true)
  })
})