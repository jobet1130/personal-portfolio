import blogData from '../data/blogData.json'

// Types
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
  featuredImage: string
  readTime: number
  isPublished: boolean
  isFeatured: boolean
  views: number
  likes: number
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

export interface BlogData {
  posts: BlogPost[]
  categories: BlogCategory[]
}

// GraphQL-like query functions
class BlogGraphQL {
  private data: BlogData

  constructor() {
    this.data = blogData as BlogData
  }

  // Query: Get all posts
  async posts(): Promise<BlogPost[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.posts.filter(post => post.isPublished))
      }, 100) // Simulate network delay
    })
  }

  // Query: Get post by ID
  async post(id: string): Promise<BlogPost | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = this.data.posts.find(p => p.id === id && p.isPublished)
        resolve(post || null)
      }, 100)
    })
  }

  // Query: Get post by slug
  async postBySlug(slug: string): Promise<BlogPost | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = this.data.posts.find(p => p.slug === slug && p.isPublished)
        resolve(post || null)
      }, 100)
    })
  }

  // Query: Get all categories
  async categories(): Promise<BlogCategory[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.categories)
      }, 50)
    })
  }

  // Query: Get featured posts
  async featuredPosts(): Promise<BlogPost[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.posts.filter(post => post.isFeatured && post.isPublished))
      }, 100)
    })
  }

  // Query: Get posts by category
  async postsByCategory(categoryId: string): Promise<BlogPost[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.posts.filter(post => post.category === categoryId && post.isPublished))
      }, 100)
    })
  }

  // Query: Search posts
  async searchPosts(query: string): Promise<BlogPost[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const searchTerm = query.toLowerCase()
        const results = this.data.posts.filter(post => {
          if (!post.isPublished) return false
          
          return (
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
            post.author.toLowerCase().includes(searchTerm)
          )
        })
        resolve(results)
      }, 150)
    })
  }

  // Mutation: Increment views
  async incrementViews(id: string): Promise<BlogPost | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = this.data.posts.find(p => p.id === id)
        if (post) {
          post.views += 1
          resolve(post)
        } else {
          resolve(null)
        }
      }, 50)
    })
  }

  // Mutation: Toggle like
  async toggleLike(id: string): Promise<BlogPost | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const post = this.data.posts.find(p => p.id === id)
        if (post) {
          // In a real app, you'd track user likes
          // For demo purposes, we'll just increment
          post.likes += 1
          resolve(post)
        } else {
          resolve(null)
        }
      }, 50)
    })
  }

  // Helper: Get related posts
  async getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentPost = this.data.posts.find(p => p.id === postId)
        if (!currentPost) {
          resolve([])
          return
        }

        // Find posts with similar tags or same category
        const relatedPosts = this.data.posts
          .filter(post => {
            if (post.id === postId || !post.isPublished) return false
            
            // Same category or shared tags
            return (
              post.category === currentPost.category ||
              post.tags.some(tag => currentPost.tags.includes(tag))
            )
          })
          .sort((a, b) => {
            // Sort by relevance (shared tags count)
            const aSharedTags = a.tags.filter(tag => currentPost.tags.includes(tag)).length
            const bSharedTags = b.tags.filter(tag => currentPost.tags.includes(tag)).length
            return bSharedTags - aSharedTags
          })
          .slice(0, limit)

        resolve(relatedPosts)
      }, 100)
    })
  }

  // Helper: Get post statistics
  async getPostStats(): Promise<{
    totalPosts: number
    totalViews: number
    totalLikes: number
    categoryCounts: Record<string, number>
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const publishedPosts = this.data.posts.filter(post => post.isPublished)
        
        const stats = {
          totalPosts: publishedPosts.length,
          totalViews: publishedPosts.reduce((sum, post) => sum + post.views, 0),
          totalLikes: publishedPosts.reduce((sum, post) => sum + post.likes, 0),
          categoryCounts: publishedPosts.reduce((counts, post) => {
            counts[post.category] = (counts[post.category] || 0) + 1
            return counts
          }, {} as Record<string, number>)
        }
        
        resolve(stats)
      }, 50)
    })
  }
}

// Export singleton instance
export const blogGraphQL = new BlogGraphQL()

// Export query functions for easier use
export const {
  posts,
  post,
  postBySlug,
  categories,
  featuredPosts,
  postsByCategory,
  searchPosts,
  incrementViews,
  toggleLike,
  getRelatedPosts,
  getPostStats
} = blogGraphQL