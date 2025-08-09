<template>
  <div class="graphql-test">
    <h2>GraphQL Test Results</h2>
    <div v-if="loading" class="loading">Running tests...</div>
    <div v-else class="test-results">
      <div v-for="(result, index) in testResults" :key="index" class="test-item">
        <div class="test-header">
          <span :class="['status', result.success ? 'success' : 'error']">
            {{ result.success ? '✅' : '❌' }}
          </span>
          <span class="test-name">{{ result.name }}</span>
        </div>
        <div class="test-details">{{ result.details }}</div>
        <div v-if="result.error" class="test-error">{{ result.error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { blogGraphQL } from '../services/graphql'

interface TestResult {
  name: string
  success: boolean
  details: string
  error?: string
}

const loading = ref(true)
const testResults = ref<TestResult[]>([])

const addTestResult = (name: string, success: boolean, details: string, error?: string) => {
  testResults.value.push({ name, success, details, error })
}

const runTests = async () => {
  try {
    // Test 1: Get all posts
    try {
      const posts = await blogGraphQL.posts()
      addTestResult(
        'Get All Posts',
        true,
        `Found ${posts.length} published posts`
      )
    } catch (error) {
      addTestResult('Get All Posts', false, 'Failed to get posts', String(error))
    }

    // Test 2: Get post by slug
    try {
      const post = await blogGraphQL.postBySlug('vue3-composition-api-guide')
      if (post) {
        addTestResult(
          'Get Post by Slug',
          true,
          `Found post: "${post.title}" by ${post.author} (Views: ${post.views}, Likes: ${post.likes})`
        )
      } else {
        addTestResult('Get Post by Slug', false, 'Post not found')
      }
    } catch (error) {
      addTestResult('Get Post by Slug', false, 'Failed to get post', String(error))
    }

    // Test 3: Get categories
    try {
      const categories = await blogGraphQL.categories()
      addTestResult(
        'Get Categories',
        true,
        `Found ${categories.length} categories: ${categories.map(c => c.name).join(', ')}`
      )
    } catch (error) {
      addTestResult('Get Categories', false, 'Failed to get categories', String(error))
    }

    // Test 4: Get featured posts
    try {
      const featured = await blogGraphQL.featuredPosts()
      addTestResult(
        'Get Featured Posts',
        true,
        `Found ${featured.length} featured posts`
      )
    } catch (error) {
      addTestResult('Get Featured Posts', false, 'Failed to get featured posts', String(error))
    }

    // Test 5: Search posts
    try {
      const searchResults = await blogGraphQL.searchPosts('Vue')
      addTestResult(
        'Search Posts',
        true,
        `Found ${searchResults.length} posts matching "Vue"`
      )
    } catch (error) {
      addTestResult('Search Posts', false, 'Failed to search posts', String(error))
    }

    // Test 6: Get post stats
    try {
      const stats = await blogGraphQL.getPostStats()
      addTestResult(
        'Get Post Statistics',
        true,
        `Stats: ${stats.totalPosts} posts, ${stats.totalViews} views, ${stats.totalLikes} likes`
      )
    } catch (error) {
      addTestResult('Get Post Statistics', false, 'Failed to get stats', String(error))
    }

    // Test 7: Test mutations (increment views)
    try {
      const post = await blogGraphQL.postBySlug('vue3-composition-api-guide')
      if (post) {
        const originalViews = post.views
        const updatedPost = await blogGraphQL.incrementViews(post.id)
        if (updatedPost && updatedPost.views > originalViews) {
          addTestResult(
            'Increment Views',
            true,
            `Views incremented from ${originalViews} to ${updatedPost.views}`
          )
        } else {
          addTestResult('Increment Views', false, 'Failed to increment views')
        }
      } else {
        addTestResult('Increment Views', false, 'No post found to test with')
      }
    } catch (error) {
      addTestResult('Increment Views', false, 'Failed to test increment views', String(error))
    }

  } catch (error) {
    addTestResult('Overall Test', false, 'Test suite failed', String(error))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  runTests()
})
</script>

<style scoped>
.graphql-test {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.graphql-test h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: #666;
}

.test-results {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.test-item {
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  padding: 1rem;
  background: #f8f9fa;
}

.test-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.status {
  font-size: 1.2rem;
}

.status.success {
  color: #28a745;
}

.status.error {
  color: #dc3545;
}

.test-name {
  font-weight: 600;
  color: #2c3e50;
}

.test-details {
  color: #666;
  font-size: 0.9rem;
  margin-left: 1.7rem;
}

.test-error {
  color: #dc3545;
  font-size: 0.8rem;
  margin-left: 1.7rem;
  margin-top: 0.25rem;
  font-family: monospace;
  background: #f8d7da;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>