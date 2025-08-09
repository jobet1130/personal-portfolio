<template>
  <article class="blog-card" @mouseenter="$emit('mouseenter')" @mouseleave="$emit('mouseleave')">
    <div class="blog-image" v-if="post.featuredImage">
      <img :src="post.featuredImage" :alt="post.title" loading="lazy" />
      <div class="blog-overlay">
        <div class="blog-actions">
          <router-link :to="`/blog/${post.slug}`" class="read-link" title="Read Article" aria-label="Read Article">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
            Read Article
          </router-link>
        </div>
      </div>
      <div class="blog-badges">
        <div v-if="post.isFeatured" class="featured-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <div class="blog-category" :style="{ backgroundColor: getCategoryColor(post.category) }">
          {{ getCategoryName(post.category) }}
        </div>
      </div>
    </div>

    <div class="blog-content">
      <div class="blog-meta">
        <span class="blog-date">{{ formatDate(post.publishedDate) }}</span>
        <span class="blog-read-time">{{ post.readTime }} min read</span>
        <div class="blog-stats" v-if="post.views || post.likes">
          <span v-if="post.views" class="stat-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            {{ post.views }}
          </span>
          <span v-if="post.likes" class="stat-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
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

defineEmits<{
  mouseenter: []
  mouseleave: []
}>()

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
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.blog-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.blog-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.blog-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-image img {
  transform: scale(1.05);
}

.blog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.blog-card:hover .blog-overlay {
  opacity: 1;
}

.blog-actions {
  display: flex;
  gap: 1rem;
}

.read-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.read-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.blog-badges {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.featured-badge {
  background: var(--primary-color, #3b82f6);
  color: white;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.blog-category {
  background: #6b7280;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.blog-content {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 0;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
  flex-wrap: wrap;
}

.blog-date {
  font-weight: 500;
}

.blog-read-time {
  color: #9ca3af;
}

.blog-stats {
  display: flex;
  gap: 0.75rem;
  margin-left: auto;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #9ca3af;
  font-size: 0.75rem;
}

.blog-title {
  margin: 0;
}

.title-link {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  text-decoration: none;
  line-height: 1.3;
  transition: color 0.3s ease;
}

.title-link:hover {
  color: var(--primary-color, #3b82f6);
}

.blog-excerpt {
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
  flex: 1;
  min-height: 3.2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: flex-start;
  min-height: 1.5rem;
}

.tag {
  background: #e2e8f0;
  color: #2d3748;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.tag-more {
  color: #6b7280;
  font-size: 0.75rem;
  font-style: italic;
}

.blog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid #e2e8f0;
}

.blog-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
}

.author-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
}

.read-more {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--primary-color, #3b82f6);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.read-more:hover {
  gap: 0.5rem;
  color: #2563eb;
}

@media (max-width: 768px) {
  .blog-image {
    height: 150px;
  }
  
  .blog-content {
    padding: 1rem;
    gap: 0.75rem;
  }
  
  .title-link {
    font-size: 1.125rem;
  }
  
  .blog-meta {
    gap: 0.75rem;
  }
  
  .blog-stats {
    margin-left: 0;
    margin-top: 0.25rem;
    width: 100%;
  }
  
  .blog-footer {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .read-more {
    align-self: flex-end;
  }
}
</style>