export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedDate: string
  updatedDate?: string
  tags: string[]
  category: string
  featuredImage?: string
  readTime: number // in minutes
  isPublished: boolean
  isFeatured: boolean
  views?: number
  likes?: number
  seoTitle?: string
  seoDescription?: string
}

export interface BlogCategory {
  id: string
  name: string
  description: string
  color: string
  icon: string
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Articles about modern web development techniques and frameworks',
    color: '#3b82f6',
    icon: 'code'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Deep dives into JavaScript concepts and best practices',
    color: '#f59e0b',
    icon: 'javascript'
  },
  {
    id: 'vue',
    name: 'Vue.js',
    description: 'Vue.js tutorials, tips, and advanced techniques',
    color: '#10b981',
    icon: 'vue'
  },
  {
    id: 'career',
    name: 'Career',
    description: 'Professional development and career advice for developers',
    color: '#8b5cf6',
    icon: 'briefcase'
  },
  {
    id: 'tutorials',
    name: 'Tutorials',
    description: 'Step-by-step guides and how-to articles',
    color: '#ef4444',
    icon: 'book'
  },
  {
    id: 'tools',
    name: 'Tools & Tips',
    description: 'Developer tools, productivity tips, and workflow optimization',
    color: '#06b6d4',
    icon: 'wrench'
  }
]

export const blogPosts: BlogPost[] = [
  {
    id: 'vue3-composition-api-guide',
    title: 'Mastering Vue 3 Composition API: A Complete Guide',
    slug: 'vue3-composition-api-guide',
    excerpt: 'Learn how to leverage the power of Vue 3 Composition API to write more maintainable and reusable code.',
    content: `# Mastering Vue 3 Composition API: A Complete Guide

The Vue 3 Composition API represents a paradigm shift in how we write Vue applications. In this comprehensive guide, we'll explore everything you need to know to master this powerful feature.

## What is the Composition API?

The Composition API is a new way to write Vue components that provides better logic reuse, more flexible code organization, and improved TypeScript support.

## Key Benefits

1. **Better Logic Reuse**: Extract and reuse stateful logic between components
2. **Improved TypeScript Support**: Better type inference and IDE support
3. **More Flexible Code Organization**: Group related code together

## Getting Started

\`\`\`javascript
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      console.log('Component mounted!')
    })
    
    return {
      count,
      doubleCount,
      increment
    }
  }
}
\`\`\`

This is just the beginning of what you can achieve with the Composition API!`,
    author: 'John Doe',
    publishedDate: '2024-01-15',
    updatedDate: '2024-01-20',
    tags: ['Vue.js', 'Composition API', 'JavaScript', 'Frontend'],
    category: 'vue',
    featuredImage: '/images/blog/vue3-composition-api.jpg',
    readTime: 8,
    isPublished: true,
    isFeatured: true,
    views: 1250,
    likes: 89,
    seoTitle: 'Vue 3 Composition API Guide - Master Modern Vue Development',
    seoDescription: 'Complete guide to Vue 3 Composition API with examples, best practices, and real-world use cases.'
  },
  {
    id: 'javascript-async-patterns',
    title: 'Modern JavaScript Async Patterns: Promises, Async/Await, and Beyond',
    slug: 'javascript-async-patterns',
    excerpt: 'Explore modern asynchronous programming patterns in JavaScript and learn when to use each approach.',
    content: `# Modern JavaScript Async Patterns

Asynchronous programming is at the heart of modern JavaScript development. Let's explore the evolution and best practices of async patterns.

## The Evolution of Async JavaScript

1. **Callbacks** - The original async pattern
2. **Promises** - A more elegant solution
3. **Async/Await** - Synchronous-looking async code
4. **Modern Patterns** - Advanced techniques

## Promises vs Async/Await

\`\`\`javascript
// Promise-based approach
fetchUserData()
  .then(user => fetchUserPosts(user.id))
  .then(posts => displayPosts(posts))
  .catch(error => handleError(error))

// Async/Await approach
try {
  const user = await fetchUserData()
  const posts = await fetchUserPosts(user.id)
  displayPosts(posts)
} catch (error) {
  handleError(error)
}
\`\`\`

Both approaches have their place in modern JavaScript development.`,
    author: 'John Doe',
    publishedDate: '2024-01-10',
    tags: ['JavaScript', 'Async', 'Promises', 'ES6+'],
    category: 'javascript',
    featuredImage: '/images/blog/js-async-patterns.jpg',
    readTime: 12,
    isPublished: true,
    isFeatured: true,
    views: 2100,
    likes: 156
  },
  {
    id: 'developer-productivity-tips',
    title: '10 Productivity Tips Every Developer Should Know',
    slug: 'developer-productivity-tips',
    excerpt: 'Boost your development productivity with these proven tips and techniques used by senior developers.',
    content: `# 10 Productivity Tips Every Developer Should Know

Productivity is crucial for developers. Here are 10 proven tips to help you code more efficiently.

## 1. Master Your IDE

Learn keyboard shortcuts and customize your development environment.

## 2. Use Code Snippets

Create reusable code snippets for common patterns.

## 3. Automate Repetitive Tasks

Use scripts and tools to automate boring tasks.

## 4. Practice Test-Driven Development

Write tests first to clarify requirements and catch bugs early.

## 5. Use Version Control Effectively

Master Git workflows and commit best practices.

And 5 more tips that will transform your development workflow!`,
    author: 'John Doe',
    publishedDate: '2024-01-05',
    tags: ['Productivity', 'Development', 'Tips', 'Workflow'],
    category: 'career',
    featuredImage: '/images/blog/productivity-tips.jpg',
    readTime: 6,
    isPublished: true,
    isFeatured: false,
    views: 890,
    likes: 67
  },
  {
    id: 'building-responsive-layouts',
    title: 'Building Responsive Layouts with CSS Grid and Flexbox',
    slug: 'building-responsive-layouts',
    excerpt: 'Learn how to create flexible, responsive layouts using modern CSS techniques.',
    content: `# Building Responsive Layouts with CSS Grid and Flexbox

Modern CSS provides powerful tools for creating responsive layouts. Let's explore CSS Grid and Flexbox.

## When to Use Grid vs Flexbox

- **CSS Grid**: For 2D layouts (rows and columns)
- **Flexbox**: For 1D layouts (single direction)

## CSS Grid Example

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
\`\`\`

## Flexbox Example

\`\`\`css
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-item {
  flex: 1 1 300px;
}
\`\`\`

Combining both techniques gives you ultimate layout flexibility.`,
    author: 'John Doe',
    publishedDate: '2023-12-28',
    tags: ['CSS', 'Grid', 'Flexbox', 'Responsive Design'],
    category: 'web-development',
    featuredImage: '/images/blog/css-layouts.jpg',
    readTime: 10,
    isPublished: true,
    isFeatured: false,
    views: 1450,
    likes: 98
  },
  {
    id: 'typescript-best-practices',
    title: 'TypeScript Best Practices for Large Applications',
    slug: 'typescript-best-practices',
    excerpt: 'Essential TypeScript patterns and practices for building maintainable large-scale applications.',
    content: `# TypeScript Best Practices for Large Applications

TypeScript shines in large applications. Here are the best practices I've learned from years of experience.

## Type Safety First

Always prefer strict type checking and avoid \`any\` types.

## Interface vs Type Aliases

\`\`\`typescript
// Use interfaces for object shapes
interface User {
  id: string
  name: string
  email: string
}

// Use type aliases for unions and computed types
type Status = 'loading' | 'success' | 'error'
type UserWithStatus = User & { status: Status }
\`\`\`

## Generic Constraints

\`\`\`typescript
function updateEntity<T extends { id: string }>(entity: T, updates: Partial<T>): T {
  return { ...entity, ...updates }
}
\`\`\`

These patterns will make your TypeScript code more maintainable and robust.`,
    author: 'John Doe',
    publishedDate: '2023-12-20',
    tags: ['TypeScript', 'Best Practices', 'Large Scale', 'Architecture'],
    category: 'web-development',
    readTime: 15,
    isPublished: true,
    isFeatured: false,
    views: 1890,
    likes: 134
  }
]

// Utility functions
export const getPublishedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.isPublished)
}

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.isFeatured && post.isPublished)
}

export const getPostsByCategory = (categoryId: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === categoryId && post.isPublished)
}

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase()) && post.isPublished
  )
}

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug && post.isPublished)
}

export const getPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id)
}

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return getPublishedPosts()
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit)
}

export const getPopularPosts = (limit: number = 5): BlogPost[] => {
  return getPublishedPosts()
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit)
}

export const getAllTags = (): string[] => {
  const tags = new Set<string>()
  getPublishedPosts().forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export const getCategoryById = (id: string): BlogCategory | undefined => {
  return blogCategories.find(category => category.id === id)
}

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase()
  return getPublishedPosts().filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export default blogPosts