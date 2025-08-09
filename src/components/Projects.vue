<template>
  <section id="projects" class="projects">
    <div class="container">
      <div class="projects-header">
        <h1 class="hero-title">PROJECTS</h1>
        <h2 class="section-title">My Projects</h2>
        <p class="section-description">
          Welcome to my portfolio showcase! I'm passionate about creating innovative solutions that solve real-world problems. 
          From full-stack web applications to mobile experiences, I enjoy exploring new technologies and pushing the boundaries 
          of what's possible in software development.
        </p>
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
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.projects-header {
  text-align: center;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease-in-out infinite, fadeInScale 1.2s ease-out;
  text-align: center;
  text-shadow: 0 0 30px rgba(255, 107, 107, 0.3);
  position: relative;
}

.hero-title::before {
  content: 'PROJECTS';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s ease-in-out infinite;
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
  animation: slideInUp 1s ease-out 0.3s both;
}

.section-description {
  font-size: 1.1rem;
  color: var(--text-color);
  max-width: 700px;
  margin: 0 auto 24px;
  line-height: 1.7;
  font-weight: 400;
  animation: slideInUp 1s ease-out 0.6s both;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  animation: slideInUp 1s ease-out 0.9s both;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
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
  gap: 24px;
  margin-bottom: 30px;
  align-items: stretch;
  justify-items: center;
  justify-content: center;
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

/* Animations */
@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes slideInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .projects {
    padding: 30px 0;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 24px;
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
  
  .hero-title {
    font-size: 2rem;
    letter-spacing: 0.05em;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>