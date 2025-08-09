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
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="project-card"
          @mouseenter="handleCardHover(project.id, true)"
          @mouseleave="handleCardHover(project.id, false)"
        >
          <div class="project-image">
            <img 
              :src="project.imageUrl || '/images/projects/placeholder.jpg'" 
              :alt="project.title"
              loading="lazy"
            >
            <div class="project-overlay">
              <div class="project-links">
                <a 
                  v-if="project.liveUrl" 
                  :href="project.liveUrl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="project-link"
                  title="View Live Demo"
                  aria-label="View Live Demo"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15,3 21,3 21,9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
                <a 
                  v-if="project.githubUrl" 
                  :href="project.githubUrl" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="project-link"
                  title="View Source Code"
                  aria-label="View Source Code"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div v-if="project.featured" class="featured-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
              </svg>
            </div>
          </div>
          
          <div class="project-content">
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            
            <div class="project-technologies">
              <span 
                v-for="tech in project.technologies" 
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
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

// Reactive data
const activeFilter = ref<string>('all')
const hoveredCard = ref<number | null>(null)
const hasMoreProjects = ref(false) // For future pagination

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

const handleCardHover = (projectId: number, isHovered: boolean) => {
  hoveredCard.value = isHovered ? projectId : null
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

.project-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-overlay {
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

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-links {
  display: flex;
  gap: 16px;
}

.project-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.project-link:hover {
  background: var(--primary-color);
  transform: scale(1.1);
}

.featured-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: var(--primary-color);
  color: white;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-content {
  padding: 24px;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.tech-tag:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
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
  
  .project-image {
    height: 180px;
  }
  
  .project-content {
    padding: 20px;
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
  
  .project-card {
    margin: 0;
  }
}
</style>