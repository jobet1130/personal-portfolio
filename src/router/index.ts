import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import AboutPage from '../pages/AboutPage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import BlogPage from '../pages/BlogPage.vue'
import ResumePage from '../pages/ResumePage.vue'
import NotFound from '../pages/NotFound.vue'
import BlogPostDetail from '../BlogPage/components/BlogPostDetail.vue'
import GraphQLTest from '../BlogPage/components/GraphQLTest.vue'

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
      path: '/blog/:slug',
      name: 'BlogPostDetail',
      component: BlogPostDetail
    },
    {
      path: '/test-graphql',
      name: 'GraphQLTest',
      component: GraphQLTest
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
      path: '/project/:id',
      name: 'ProjectDetail',
      component: () => import('../pages/ProjectDetail.vue')
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
