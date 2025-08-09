import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Blog from '../pages/Blog.vue'
import Resume from '../pages/Resume.vue'
import NotFound from '../pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume
  },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ],
})

export default router
