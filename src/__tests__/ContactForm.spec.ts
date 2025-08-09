import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ContactForm from '../components/ContactForm.vue'

describe('ContactForm.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(ContactForm)
  })

  it('renders form fields correctly', () => {
    expect(wrapper.find('h3').text()).toBe('Send me a message')

    // Check all form fields exist
    expect(wrapper.find('input[placeholder="Your full name"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="your.email@example.com"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="What\'s this about?"]').exists()).toBe(true)
    expect(
      wrapper
        .find('textarea[placeholder="Tell me about your project or how I can help you..."]')
        .exists(),
    ).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('has form title', () => {
    expect(wrapper.find('.form-title').exists()).toBe(true)
    expect(wrapper.text()).toContain('Send me a message')
  })

  it('has proper form structure', () => {
    // Check form exists
    expect(wrapper.find('form').exists()).toBe(true)
    
    // Check all required form groups exist
    expect(wrapper.findAll('.form-group')).toHaveLength(4)
    
    // Check labels are properly associated
    expect(wrapper.find('label[for="name"]').exists()).toBe(true)
    expect(wrapper.find('label[for="email"]').exists()).toBe(true)
    expect(wrapper.find('label[for="subject"]').exists()).toBe(true)
    expect(wrapper.find('label[for="message"]').exists()).toBe(true)
  })

  it('allows form input', async () => {
    // Test that form inputs work correctly
    const nameInput = wrapper.find('input[placeholder="Your full name"]')
    const emailInput = wrapper.find('input[type="email"]')
    const subjectInput = wrapper.find('input[placeholder="What\'s this about?"]')
    const messageTextarea = wrapper.find('textarea')

    await nameInput.setValue('John Doe')
    await emailInput.setValue('john@example.com')
    await subjectInput.setValue('Test Subject')
    await messageTextarea.setValue('Test message')

    expect((nameInput.element as HTMLInputElement).value).toBe('John Doe')
    expect((emailInput.element as HTMLInputElement).value).toBe('john@example.com')
    expect((subjectInput.element as HTMLInputElement).value).toBe('Test Subject')
    expect((messageTextarea.element as HTMLTextAreaElement).value).toBe('Test message')
  })

  it('shows form structure correctly', async () => {
    // Check that all form elements are present
    expect(wrapper.find('input[placeholder="Your full name"]').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="What\'s this about?"]').exists()).toBe(true)
    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    
    // Check form labels
    expect(wrapper.text()).toContain('Name *')
    expect(wrapper.text()).toContain('Email *')
    expect(wrapper.text()).toContain('Subject *')
    expect(wrapper.text()).toContain('Message *')
  })

  it('has submit button', async () => {
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.exists()).toBe(true)
    expect(submitButton.text()).toContain('Send Message')
  })

  it('has proper form structure and accessibility', () => {
    const form = wrapper.find('form')
    expect(form.exists()).toBe(true)

    // Check that all inputs have proper labels or placeholders
    const inputs = wrapper.findAll('input, textarea')
    inputs.forEach((input) => {
      expect(input.attributes('placeholder')).toBeDefined()
    })

    // Check submit button
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.exists()).toBe(true)
    expect(submitButton.text()).toContain('Send Message')
  })

  it('applies correct CSS classes', () => {
    expect(wrapper.find('.contact-form').exists()).toBe(true)
    expect(wrapper.find('.form-group').exists()).toBe(true)
    expect(wrapper.find('.form-input').exists()).toBe(true)
    expect(wrapper.find('.submit-btn').exists()).toBe(true)
  })
})
