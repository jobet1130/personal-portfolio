import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Home from '../pages/Home.vue'

describe('App', () => {
  it('mounts renders properly', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', component: Home }
      ]
    })
    
    router.push('/')
    await router.isReady()
    
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })
    
    await wrapper.vm.$nextTick()
    
    expect(wrapper.text()).toContain('Jobet P. Casquejo')
    expect(wrapper.text()).toContain('Salesforce Developer')
  })
})
