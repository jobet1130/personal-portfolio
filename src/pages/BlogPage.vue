<template>
  <div class="blog-page">
    <div class="container">
      <!-- Blog Header -->
      <div class="blog-header">
        <h1 class="page-title">Blog</h1>
        <p class="page-subtitle">
          Insights, tutorials, and thoughts on Salesforce development, web technologies, and
          software engineering.
        </p>
      </div>

      <!-- Blog Filters -->
      <div class="blog-filters">
        <div class="filter-section">
          <h3>Categories</h3>
          <div class="category-filters">
            <button
              class="filter-btn"
              :class="{ active: activeCategory === 'all' }"
              @click="setCategory('all')"
            >
              All Posts
            </button>
            <button
              v-for="category in blogCategories"
              :key="category.id"
              class="filter-btn category-btn"
              :class="{ active: activeCategory === category.id }"
              :style="{ '--category-color': category.color }"
              @click="setCategory(category.id)"
            >
              <component :is="getCategoryIcon(category.icon)" class="category-icon" />
              {{ category.name }}
            </button>
          </div>
        </div>

        <div class="filter-section">
          <h3>Filter</h3>
          <div class="type-filters">
            <button
              class="filter-btn"
              :class="{ active: activeFilter === 'all' }"
              @click="setFilter('all')"
            >
              All
            </button>
            <button
              class="filter-btn"
              :class="{ active: activeFilter === 'featured' }"
              @click="setFilter('featured')"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              Featured
            </button>
            <button
              class="filter-btn"
              :class="{ active: activeFilter === 'recent' }"
              @click="setFilter('recent')"
            >
              Recent
            </button>
          </div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="search-section">
        <div class="search-bar">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search articles..."
            class="search-input"
          />
        </div>
      </div>

      <!-- Blog Stats -->
      <div class="blog-stats">
        <div class="stat-item">
          <span class="stat-number">{{ filteredPosts.length }}</span>
          <span class="stat-label">{{ filteredPosts.length === 1 ? 'Article' : 'Articles' }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ totalViews }}</span>
          <span class="stat-label">Total Views</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ blogCategories.length }}</span>
          <span class="stat-label">{{
            blogCategories.length === 1 ? 'Category' : 'Categories'
          }}</span>
        </div>
      </div>

      <!-- Blog Grid -->
      <div class="blog-grid" v-if="filteredPosts.length > 0">
        <BlogCard v-for="post in paginatedPosts" :key="post.id" :post="post" />
      </div>

      <!-- No Results -->
      <div v-else class="no-results">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <h3>No articles found</h3>
        <p>Try adjusting your search or filter criteria.</p>
        <button class="clear-filters-btn" @click="clearFilters">Clear All Filters</button>
      </div>

      <!-- Pagination -->
      <div class="pagination" v-if="totalPages > 1">
        <button
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
          Previous
        </button>

        <div class="page-numbers">
          <button
            v-for="page in visiblePages"
            :key="page"
            class="page-btn"
            :class="{ active: page === currentPage }"
            @click="typeof page === 'number' ? goToPage(page) : null"
          >
            {{ page }}
          </button>
        </div>

        <button
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Next
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BlogCard from '../components/BlogCard.vue'
import { blogPosts, blogCategories, getPostsByCategory } from '../data/blog'
import type { BlogPost } from '../data/blog'

// Reactive data
const activeCategory = ref<string>('all')
const activeFilter = ref<string>('all')
const searchQuery = ref<string>('')
const currentPage = ref<number>(1)
const postsPerPage = 6

// Computed properties
const filteredPosts = computed((): BlogPost[] => {
  let posts = blogPosts

  // Filter by category
  if (activeCategory.value !== 'all') {
    posts = getPostsByCategory(activeCategory.value)
  }

  // Filter by type
  if (activeFilter.value === 'featured') {
    posts = posts.filter((post) => post.isFeatured)
  } else if (activeFilter.value === 'recent') {
    posts = posts
      .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
      .slice(0, 10)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        post.author.toLowerCase().includes(query),
    )
  }

  return posts
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total)
    }
  }

  return pages
})

const totalViews = computed(() => {
  return blogPosts.reduce((total, post) => total + (post.views || 0), 0)
})

// Methods
const setCategory = (categoryId: string) => {
  activeCategory.value = categoryId
  currentPage.value = 1
}

const setFilter = (filter: string) => {
  activeFilter.value = filter
  currentPage.value = 1
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll to top of blog grid
    document.querySelector('.blog-grid')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const clearFilters = () => {
  activeCategory.value = 'all'
  activeFilter.value = 'all'
  searchQuery.value = ''
  currentPage.value = 1
}

const getCategoryIcon = (iconName: string) => {
  // Return SVG component based on icon name
  const icons: Record<string, string> = {
    code: 'svg',
    tutorial: 'svg',
    salesforce: 'svg',
    web: 'svg',
    mobile: 'svg',
    devops: 'svg',
  }
  return icons[iconName] || 'svg'
}

// Lifecycle
onMounted(() => {
  // Reset to first page when component mounts
  currentPage.value = 1
})
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  padding: 2rem 0;
  background: var(--bg-color, #ffffff);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-color, #1f2937);
  margin-bottom: 1rem;
  background: linear-gradient(
    135deg,
    var(--primary-color, #3b82f6),
    var(--secondary-color, #8b5cf6)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary, #6b7280);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.blog-filters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--card-bg, #f9fafb);
  border-radius: 12px;
  border: 1px solid var(--border-color, #e5e7eb);
}

.filter-section h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color, #1f2937);
  margin-bottom: 1rem;
}

.category-filters,
.type-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color, #e5e7eb);
  background: var(--card-bg, #ffffff);
  color: var(--text-secondary, #6b7280);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-btn:hover {
  border-color: var(--primary-color, #3b82f6);
  color: var(--primary-color, #3b82f6);
}

.filter-btn.active {
  background: var(--primary-color, #3b82f6);
  border-color: var(--primary-color, #3b82f6);
  color: white;
}

.category-btn.active {
  background: var(--category-color);
  border-color: var(--category-color);
}

.category-icon {
  width: 16px;
  height: 16px;
}

.search-section {
  margin-bottom: 2rem;
}

.search-bar {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.search-bar svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary, #6b7280);
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 25px;
  background: var(--card-bg, #ffffff);
  color: var(--text-color, #1f2937);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.blog-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: var(--card-bg, #f9fafb);
  border-radius: 12px;
  border: 1px solid var(--border-color, #e5e7eb);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color, #3b82f6);
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
  font-weight: 500;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary, #6b7280);
}

.no-results svg {
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-results h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color, #1f2937);
  margin-bottom: 0.5rem;
}

.no-results p {
  margin-bottom: 2rem;
}

.clear-filters-btn {
  padding: 0.75rem 1.5rem;
  background: var(--primary-color, #3b82f6);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.clear-filters-btn:hover {
  background: var(--primary-hover, #2563eb);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
}

.pagination-btn {
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color, #e5e7eb);
  background: var(--card-bg, #ffffff);
  color: var(--text-color, #1f2937);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--primary-color, #3b82f6);
  color: var(--primary-color, #3b82f6);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-color, #e5e7eb);
  background: var(--card-bg, #ffffff);
  color: var(--text-color, #1f2937);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.page-btn:hover {
  border-color: var(--primary-color, #3b82f6);
  color: var(--primary-color, #3b82f6);
}

.page-btn.active {
  background: var(--primary-color, #3b82f6);
  border-color: var(--primary-color, #3b82f6);
  color: white;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .blog-page {
    --bg-color: #111827;
    --card-bg: #1f2937;
    --border-color: #374151;
    --text-color: #f9fafb;
    --text-secondary: #9ca3af;
    --primary-color: #60a5fa;
    --primary-hover: #3b82f6;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .blog-filters {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .blog-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .pagination {
    flex-direction: column;
    gap: 1rem;
  }

  .page-numbers {
    order: -1;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }

  .category-filters,
  .type-filters {
    flex-direction: column;
  }

  .filter-btn {
    justify-content: center;
  }
}
</style>
