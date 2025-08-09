import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Contact from '../components/Contact.vue'
import ContactForm from '../components/ContactForm.vue'
import Home from '../pages/Home.vue'
import NotFound from '../pages/NotFound.vue'
import Resume from '../pages/Resume.vue'

// Mock ContactForm component
vi.mock('../components/ContactForm.vue', () => ({
  default: {
    name: 'ContactForm',
    template: '<div data-testid="contact-form">Contact Form</div>',
  },
}))

const createTestRouter = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', name: 'Home', component: Home },
      { path: '/resume', name: 'Resume', component: Resume },
      { path: '/404', name: '404', component: NotFound },
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    ],
  })
}

describe('Contact.vue', () => {
  let router: ReturnType<typeof createTestRouter>
  let wrapper: ReturnType<typeof mount>

  beforeEach(async () => {
    router = createTestRouter()
    await router.push('/')

    wrapper = mount(Contact, {
      global: {
        plugins: [router],
      },
    })
  })

  it('renders contact information correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Get In Touch')
    expect(wrapper.text()).toContain('jobetcasquejo221@gmail.com')
    expect(wrapper.text()).toContain('Philippines')
    expect(wrapper.text()).toContain('Resume')
    expect(wrapper.text()).toContain('Download my latest resume')
  })

  it('displays all contact items', () => {
    const contactItems = wrapper.findAll('.contact-item')
    expect(contactItems).toHaveLength(3)

    // Check email contact item
    expect(contactItems[0].text()).toContain('Email')
    expect(contactItems[0].text()).toContain('jobetcasquejo221@gmail.com')
    
    // Check location contact item
    expect(contactItems[1].text()).toContain('Location')
    expect(contactItems[1].text()).toContain('Philippines')

    // Check resume contact item
    expect(contactItems[2].text()).toContain('Resume')
    expect(contactItems[2].text()).toContain('Download my latest resume')
  })

  it('renders ContactForm component', () => {
    expect(wrapper.findComponent(ContactForm).exists()).toBe(true)
  })

  it('makes resume item clickable with proper styling', () => {
    const resumeItem = wrapper.findAll('.contact-item')[2]
    expect(resumeItem.classes()).toContain('clickable')
  })

  it('navigates to resume page when resume item is clicked', async () => {
    const routerPushSpy = vi.spyOn(router, 'push')

    const resumeItem = wrapper.findAll('.contact-item')[2]
    await resumeItem.trigger('click')

    expect(routerPushSpy).toHaveBeenCalledWith('/resume')
  })

  it('has proper accessibility attributes', () => {
    const resumeItem = wrapper.findAll('.contact-item')[2]
    expect(resumeItem.attributes('role')).toBeFalsy() // No specific role needed for clickable div

    // Check that SVG icons have proper structure
    const svgIcons = wrapper.findAll('svg')
    expect(svgIcons.length).toBeGreaterThan(0)
    svgIcons.forEach((svg) => {
      expect(svg.attributes('viewBox')).toBeDefined()
    })
  })

  it('displays contact icons correctly', () => {
    const contactIcons = wrapper.findAll('.contact-icon')
    expect(contactIcons).toHaveLength(3)

    contactIcons.forEach((icon) => {
      expect(icon.find('svg').exists()).toBe(true)
    })
  })

  it('has responsive design classes', () => {
    expect(wrapper.find('.contact').exists()).toBe(true)
    expect(wrapper.find('.contact-content').exists()).toBe(true)
    expect(wrapper.find('.contact-info').exists()).toBe(true)
  })
})
