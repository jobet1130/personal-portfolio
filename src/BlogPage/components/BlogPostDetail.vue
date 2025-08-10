<template>
  <div class="blog-post-detail">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading article...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <h2>Article Not Found</h2>
      <p>{{ error }}</p>
      <router-link to="/blog" class="back-link">← Back to Blog</router-link>
    </div>

    <!-- Article Content -->
    <article v-else-if="post" class="article">
      <!-- Article Header -->
      <header class="article-header">
        <div class="breadcrumb">
          <router-link to="/blog">Blog</router-link>
          <span class="separator">›</span>
          <span class="current">{{ post.title }}</span>
        </div>

        <div class="article-meta">
          <span class="category" :style="{ backgroundColor: getCategoryColor(post.category) }">
            {{ getCategoryName(post.category) }}
          </span>
          <time class="publish-date">{{ formatDate(post.publishedDate) }}</time>
          <span class="read-time">{{ post.readTime }} min read</span>
        </div>

        <h1 class="article-title">{{ post.title }}</h1>

        <div class="article-excerpt">
          {{ post.excerpt }}
        </div>

        <div class="author-info">
          <div class="author-avatar">
            <div class="avatar-placeholder">{{ post.author.charAt(0) }}</div>
          </div>
          <div class="author-details">
            <span class="author-name">{{ post.author }}</span>
            <span class="author-title">Full Stack Developer</span>
          </div>
        </div>

        <div class="article-stats">
          <button @click="toggleLike" class="stat-button" :class="{ liked: isLiked }">
            <svg class="icon" viewBox="0 0 24 24">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            {{ post.likes }}
          </button>
          <div class="stat-item">
            <svg class="icon" viewBox="0 0 24 24">
              <path
                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
              />
            </svg>
            {{ post.views }}
          </div>
        </div>

        <div class="featured-image" v-if="post.featuredImage">
          <img :src="post.featuredImage" :alt="post.title" />
        </div>
      </header>

      <!-- Article Content -->
      <div class="article-content">
        <div class="content-wrapper" v-html="renderedContent"></div>
      </div>

      <!-- Article Tags -->
      <div class="article-tags">
        <h3>Tags</h3>
        <div class="tags-list">
          <span v-for="tag in post.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Article Actions -->
      <div class="article-actions">
        <button @click="shareArticle" class="action-button">
          <svg class="icon" viewBox="0 0 24 24">
            <path
              d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
            />
          </svg>
          Share
        </button>
        <button @click="copyLink" class="action-button">
          <svg class="icon" viewBox="0 0 24 24">
            <path
              d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
            />
          </svg>
          Copy Link
        </button>
      </div>
    </article>

    <!-- Related Posts -->
    <section v-if="relatedPosts.length > 0" class="related-posts">
      <h2>Related Articles</h2>
      <div class="related-posts-grid">
        <div
          v-for="relatedPost in relatedPosts"
          :key="relatedPost.id"
          class="related-post-card"
          @click="navigateToPost(relatedPost.slug)"
        >
          <div class="related-post-image">
            <img :src="relatedPost.featuredImage" :alt="relatedPost.title" />
          </div>
          <div class="related-post-content">
            <h3>{{ relatedPost.title }}</h3>
            <p>{{ relatedPost.excerpt }}</p>
            <div class="related-post-meta">
              <span class="read-time">{{ relatedPost.readTime }} min read</span>
              <span class="category">{{ getCategoryName(relatedPost.category) }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <nav class="article-navigation">
      <router-link to="/blog" class="nav-button">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        Back to Blog
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { blogGraphQL, type BlogPost } from '../services/graphql'
import { blogCategories } from '../../data/blog'

const route = useRoute()
const router = useRouter()

// Reactive data
const post = ref<BlogPost | null>(null)
const relatedPosts = ref<BlogPost[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const isLiked = ref(false)

// Computed properties
const renderedContent = computed(() => {
  if (!post.value?.content) return ''
  // Simple markdown-like rendering for now
  return post.value.content
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.*)$/gm, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
    .replace(/<p><pre>/g, '<pre>')
    .replace(/<\/pre><\/p>/g, '</pre>')
})

// Methods
const loadPost = async () => {
  try {
    loading.value = true
    error.value = null

    const slug = route.params.slug as string
    const postData = await blogGraphQL.postBySlug(slug)

    if (!postData) {
      error.value = 'Article not found'
      return
    }

    post.value = postData

    // Increment views
    await blogGraphQL.incrementViews(postData.id)

    // Load related posts
    relatedPosts.value = await blogGraphQL.getRelatedPosts(postData.id, 3)
  } catch (err) {
    error.value = 'Failed to load article'
    console.error('Error loading post:', err)
  } finally {
    loading.value = false
  }
}

const toggleLike = async () => {
  if (!post.value) return

  try {
    const updatedPost = await blogGraphQL.toggleLike(post.value.id)
    if (updatedPost) {
      post.value = updatedPost
      isLiked.value = !isLiked.value
    }
  } catch (err) {
    console.error('Error toggling like:', err)
  }
}

const shareArticle = async () => {
  if (!post.value) return

  const shareData = {
    title: post.value.title,
    text: post.value.excerpt,
    url: window.location.href,
  }

  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      // Fallback: copy to clipboard
      await copyLink()
    }
  } catch (err) {
    console.error('Error sharing:', err)
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    // You could show a toast notification here
    alert('Link copied to clipboard!')
  } catch (err) {
    console.error('Error copying link:', err)
  }
}

const navigateToPost = (slug: string) => {
  router.push(`/blog/${slug}`)
}

const getCategoryName = (categoryId: string): string => {
  const category = blogCategories.find((cat) => cat.id === categoryId)
  return category?.name || categoryId
}

const getCategoryColor = (categoryId: string): string => {
  const category = blogCategories.find((cat) => cat.id === categoryId)
  return category?.color || '#6b7280'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Watchers
watch(
  () => route.params.slug,
  () => {
    if (route.params.slug) {
      loadPost()
    }
  },
)

// Lifecycle
onMounted(() => {
  loadPost()
})
</script>

<style scoped>
.blog-post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

/* Loading and Error States */
.loading-container,
.error-container {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.back-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

/* Article Header */
.article-header {
  margin-bottom: 3rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.breadcrumb a {
  color: #3b82f6;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.separator {
  color: #d1d5db;
}

.current {
  color: #374151;
  font-weight: 500;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.category {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.publish-date,
.read-time {
  font-size: 0.875rem;
  color: #6b7280;
}

.article-title {
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #111827;
  margin-bottom: 1rem;
}

.article-excerpt {
  font-size: 1.125rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.author-avatar .avatar-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.25rem;
  text-transform: uppercase;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: #111827;
}

.author-title {
  font-size: 0.875rem;
  color: #6b7280;
}

.article-stats {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.stat-button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.stat-button.liked {
  background: #fef2f2;
  border-color: #ef4444;
  color: #ef4444;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.featured-image {
  margin-top: 2rem;
  border-radius: 0.75rem;
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Article Content */
.article-content {
  margin-bottom: 3rem;
}

.content-wrapper {
  line-height: 1.7;
  color: #374151;
}

.content-wrapper :deep(h1),
.content-wrapper :deep(h2),
.content-wrapper :deep(h3),
.content-wrapper :deep(h4),
.content-wrapper :deep(h5),
.content-wrapper :deep(h6) {
  font-weight: 700;
  color: #111827;
  margin: 2rem 0 1rem;
  line-height: 1.3;
}

.content-wrapper :deep(h1) {
  font-size: 2rem;
}
.content-wrapper :deep(h2) {
  font-size: 1.75rem;
}
.content-wrapper :deep(h3) {
  font-size: 1.5rem;
}
.content-wrapper :deep(h4) {
  font-size: 1.25rem;
}

.content-wrapper :deep(p) {
  margin-bottom: 1.5rem;
}

.content-wrapper :deep(ul),
.content-wrapper :deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
}

.content-wrapper :deep(li) {
  margin-bottom: 0.5rem;
}

.content-wrapper :deep(pre) {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
}

.content-wrapper :deep(code) {
  background: #f1f5f9;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: 'Fira Code', monospace;
}

.content-wrapper :deep(pre code) {
  background: none;
  padding: 0;
}

.content-wrapper :deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #6b7280;
}

/* Article Tags */
.article-tags {
  margin-bottom: 3rem;
}

.article-tags h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: #f3f4f6;
  color: #374151;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Article Actions */
.article-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.action-button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  background: #f8fafc;
}

/* Related Posts */
.related-posts {
  margin-bottom: 3rem;
}

.related-posts h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1.5rem;
}

.related-posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.related-post-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}

.related-post-card:hover {
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.related-post-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.related-post-content {
  padding: 1.5rem;
}

.related-post-content h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.related-post-content p {
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.related-post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Navigation */
.article-navigation {
  text-align: center;
}

.nav-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.nav-button:hover {
  background: #2563eb;
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-post-detail {
    padding: 1rem;
  }

  .article-title {
    font-size: 2rem;
  }

  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .article-actions {
    flex-direction: column;
  }

  .related-posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
