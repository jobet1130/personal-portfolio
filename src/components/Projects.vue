<template>
  <section id="projects" class="projects">
    <div class="container">
      <div class="projects-header">
        <h2 class="section-title">My Projects</h2>
        <p class="section-subtitle">
          Here are some of the projects I've worked on. Each one represents a unique challenge and learning experience.
        </p>
      </div>

      <!-- Filter Buttons -->
      <div class="filter-buttons">
        <button 
          :class="['filter-btn', { active: activeFilter === 'all' }]"
          @click="setFilter('all')"
        >
          All Projects
        </button>
        <button 
          :class="['filter-btn', { active: activeFilter === 'featured' }]"
          @click="setFilter('featured')"
        >
          Featured
        </button>
        <button 
          :class="['filter-btn', { active: activeFilter === 'web' }]"
          @click="setFilter('web')"
        >
          Web Apps
        </button>
        <button 
          :class="['filter-btn', { active: activeFilter === 'mobile' }]"
          @click="setFilter('mobile')"
        >
          Mobile
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <ProjectCard 
          v-for="project in filteredProjects" 
          :key="project.id"
          :project="project"
          @mouseenter="hoveredCard = project.id"
          @mouseleave="hoveredCard = null"
        />
      </div>

      <!-- Load More Button (for future pagination) -->
      <div class="load-more" v-if="hasMoreProjects">
        <button class="load-more-btn" @click="loadMoreProjects">
          Load More Projects
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { projects, getFeaturedProjects } from '../data/projects'
import ProjectCard from './ProjectCard.vue'

// Reactive data
const activeFilter = ref<string>('all')
const hasMoreProjects = ref(false) // For future pagination
const hoveredCard = ref<number | null>(null)

// Computed properties
const filteredProjects = computed(() => {
  switch (activeFilter.value) {
    case 'featured':
      return getFeaturedProjects()
    case 'web':
      return projects.filter(project => 
        project.technologies.some(tech => 
          ['Vue.js', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS'].includes(tech)
        )
      )
    case 'mobile':
      return projects.filter(project => 
        project.technologies.some(tech => 
          ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic'].includes(tech)
        )
      )
    default:
      return projects
  }
})

// Methods
const setFilter = (filter: string) => {
  activeFilter.value = filter
}

const loadMoreProjects = () => {
  // Future implementation for pagination
  console.log('Loading more projects...')
}

// Lifecycle
onMounted(() => {
  // Future: Check if there are more projects to load
  hasMoreProjects.value = false
})
</script>

<style scoped>
.projects {
  padding: 0.5rem 0;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.projects-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 16px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 12px 24px;
  border: 2px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.95rem;
}

.filter-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.load-more {
  text-align: center;
}

.load-more-btn {
  padding: 16px 32px;
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.load-more-btn:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .projects {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .filter-buttons {
    gap: 8px;
  }
  
  .filter-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>