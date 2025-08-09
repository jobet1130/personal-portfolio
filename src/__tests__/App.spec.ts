import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '../App.vue'
import Home from '../pages/Home.vue'
import AboutPage from '../pages/AboutPage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import BlogPage from '../pages/BlogPage.vue'
import ResumePage from '../pages/ResumePage.vue'
import NotFound from '../pages/NotFound.vue'

describe('App', () => {
  it('mounts renders properly', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: Home },
        { path: '/about', component: AboutPage },
        { path: '/projects', component: ProjectsPage },
        { path: '/blog', component: BlogPage },
        { path: '/resume', component: ResumePage },
        { path: '/:pathMatch(.*)*', component: NotFound }
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
