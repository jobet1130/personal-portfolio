<template>
  <article class="blog-preview">
    <div class="blog-image" v-if="post.featuredImage">
      <img :src="post.featuredImage" :alt="post.title" />
      <div class="blog-overlay">
        <div class="blog-category" :style="{ backgroundColor: getCategoryColor(post.category) }">
          {{ getCategoryName(post.category) }}
        </div>
        <div class="featured-badge" v-if="post.isFeatured">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
          Featured
        </div>
      </div>
    </div>

    <div class="blog-content">
      <div class="blog-meta">
        <span class="blog-date">{{ formatDate(post.publishedDate) }}</span>
        <span class="blog-read-time">{{ post.readTime }} min read</span>
        <div class="blog-stats" v-if="post.views || post.likes">
          <span v-if="post.views" class="stat-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
              />
            </svg>
            {{ post.views }}
          </span>
          <span v-if="post.likes" class="stat-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
            {{ post.likes }}
          </span>
        </div>
      </div>

      <h3 class="blog-title">
        <router-link :to="`/blog/${post.slug}`" class="title-link">
          {{ post.title }}
        </router-link>
      </h3>

      <p class="blog-excerpt">{{ post.excerpt }}</p>

      <div class="blog-tags" v-if="post.tags.length > 0">
        <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag">
          {{ tag }}
        </span>
        <span v-if="post.tags.length > 3" class="tag-more"> +{{ post.tags.length - 3 }} more </span>
      </div>

      <div class="blog-footer">
        <div class="blog-author">
          <div class="author-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
          <span class="author-name">{{ post.author }}</span>
        </div>

        <router-link :to="`/blog/${post.slug}`" class="read-more">
          Read More
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { BlogPost } from '../data/blog'
import { blogCategories } from '../data/blog'

interface Props {
  post: BlogPost
}

defineProps<Props>()

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
</script>

<style scoped>
.blog-preview {
  background: var(--card-bg, #ffffff);
  border-radius: 12px;
  overflow: hidden;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color, #e5e7eb);
}

.blog-preview:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.blog-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-preview:hover .blog-image img {
  transform: scale(1.05);
}

.blog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), transparent);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem;
}

.blog-category {
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.featured-badge {
  background: rgba(255, 255, 255, 0.9);
  color: #f59e0b;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.blog-content {
  padding: 1.5rem;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

.blog-stats {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.blog-title {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
}

.title-link {
  color: var(--text-color, #1f2937);
  text-decoration: none;
  transition: color 0.2s ease;
}

.title-link:hover {
  color: var(--primary-color, #3b82f6);
}

.blog-excerpt {
  color: var(--text-secondary, #6b7280);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tag {
  background: var(--tag-bg, #f3f4f6);
  color: var(--tag-color, #374151);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tag:hover {
  background: var(--primary-color, #3b82f6);
  color: white;
}

.tag-more {
  color: var(--text-secondary, #6b7280);
  font-size: 0.75rem;
  font-weight: 500;
}

.blog-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 32px;
  height: 32px;
  background: var(--primary-color, #3b82f6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.author-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color, #1f2937);
}

.read-more {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--primary-color, #3b82f6);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.read-more:hover {
  gap: 0.5rem;
  color: var(--primary-hover, #2563eb);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .blog-preview {
    --card-bg: #1f2937;
    --border-color: #374151;
    --text-color: #f9fafb;
    --text-secondary: #9ca3af;
    --tag-bg: #374151;
    --tag-color: #d1d5db;
    --primary-color: #60a5fa;
    --primary-hover: #3b82f6;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .blog-image {
    height: 160px;
  }

  .blog-content {
    padding: 1rem;
  }

  .blog-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .blog-stats {
    margin-left: 0;
  }

  .blog-title {
    font-size: 1.125rem;
  }

  .blog-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .blog-overlay {
    padding: 0.75rem;
  }

  .blog-category,
  .featured-badge {
    font-size: 0.625rem;
    padding: 0.125rem 0.5rem;
  }
}
</style>
