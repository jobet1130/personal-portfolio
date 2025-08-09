import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import AboutPage from '../pages/AboutPage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import BlogPage from '../pages/BlogPage.vue'
import ResumePage from '../pages/ResumePage.vue'
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
      path: '/about',
      name: 'About',
      component: AboutPage
    },
    {
      path: '/projects',
      name: 'Projects',
      component: ProjectsPage
    },
    {
      path: '/blog',
      name: 'Blog',
      component: BlogPage
    },
    {
      path: '/resume-page',
      name: 'ResumePage',
      component: ResumePage
    },
    {
      path: '/resume',
      name: 'Resume',
      component: ResumePage
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
