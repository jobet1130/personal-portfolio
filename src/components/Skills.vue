<template>
  <section id="skills" class="skills">
    <div class="skills-container">
      <div class="skills-header">
        <h2 class="skills-title">Technical Skills</h2>
        <p class="skills-subtitle">Technologies and tools I use to build exceptional solutions</p>
      </div>

      <div class="skills-content">
        <div class="skills-categories">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category as SkillCategory | 'All'"
            :class="['category-btn', { active: selectedCategory === category }]"
          >
            {{ category }}
          </button>
        </div>

        <div class="skills-grid">
          <div
            v-for="skill in filteredSkills"
            :key="skill.id"
            class="skill-card"
            :data-level="skill.level.toLowerCase()"
          >
            <div class="skill-icon">
              <component :is="getIconComponent(skill.icon)" class="icon" />
            </div>
            <div class="skill-info">
              <h3 class="skill-name">{{ skill.name }}</h3>
              <p class="skill-description">{{ skill.description }}</p>
              <div class="skill-level">
                <span class="level-label">{{ skill.level }}</span>
                <div class="level-bar">
                  <div class="level-progress" :style="{ width: getLevelWidth(skill.level) }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="skills-summary">
          <div class="summary-stats">
            <div class="stat">
              <span class="stat-number">{{ totalSkills }}</span>
              <span class="stat-label">Total Skills</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ advancedSkills.length }}</span>
              <span class="stat-label">Advanced+</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ categories.length }}</span>
              <span class="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, h } from 'vue'
import {
  skills,
  getSkillsByCategory,
  getSkillCategories,
  getAdvancedSkills,
  SkillCategory,
  SkillLevel,
} from '../data/skills'

// Icon components using SVG
const iconComponents = {
  vue: () =>
    h('img', {
      src: './public/images/vue.png',
      alt: 'Vue.js Logo',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    }),
  react: () =>
    h('img', {
      src: './public/images/reactJS.png',
      alt: 'React Logo',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    }),

  typescript: () =>
    h('img', {
      src: './public/images/Typescript.svg.png',
      alt: 'TypeScript Logo',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    }),

  javascript: () =>
    h('img', {
      src: './public/images/javascript.png',
      alt: 'JavaScript Logo',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    }),

  python: () =>
    h('img', {
      src: './public/images/python.png',
      alt: 'Python Logo',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    }),

  java: () =>
    h('img', {
      src: './public/images/java.png',
      alt: 'Java Logo',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    }),

  postgresql: () =>
    h('img', {
      src: './public/images/postgresql.png',
      alt: 'PostgreSQL Logo',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    }),

  mysql: () =>
    h('img', {
      src: './public/images/mysql.png',
      alt: 'MySQL Logo',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    }),

  git: () =>
    h('img', {
      src: './public/images/git.png',
      alt: 'Git Logo',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    }),

  docker: () =>
    h('img', {
      src: './public/images/docker.png',
      alt: 'Docker Logo',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    }),

  salesforce: () =>
    h('img', {
      src: './public/images/salesforce.png',
      alt: 'Docker Logo',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      },
    }),
}

const getIconComponent = (iconName: string) => {
  return iconComponents[iconName as keyof typeof iconComponents] || iconComponents.vue
}

const selectedCategory = ref<SkillCategory | 'All'>('All')

const categories = computed(() => {
  return ['All' as const, ...getSkillCategories()]
})

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'All') {
    return skills
  }
  return getSkillsByCategory(selectedCategory.value as SkillCategory)
})

const totalSkills = computed(() => skills.length)
const advancedSkills = computed(() => getAdvancedSkills())

const getLevelWidth = (level: SkillLevel): string => {
  const widths = {
    [SkillLevel.BEGINNER]: '25%',
    [SkillLevel.INTERMEDIATE]: '50%',
    [SkillLevel.ADVANCED]: '75%',
    [SkillLevel.EXPERT]: '100%',
  }
  return widths[level]
}

onMounted(() => {
  // Add any animations or interactions here
})
</script>

<style scoped>
.skills {
  padding: 2rem 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.skills-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.skills-header {
  text-align: center;
  margin-bottom: 3rem;
}

.skills-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.skills-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.skills-categories {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.category-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--text-secondary);
  background: transparent;
  color: var(--text-secondary);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
}

.category-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

.category-btn.active {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

.skill-card {
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--text-secondary);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.skill-card:hover::before {
  transform: scaleX(1);
}

.skill-card[data-level='expert'] {
  border-color: #10b981;
}

.skill-card[data-level='advanced'] {
  border-color: var(--primary-color);
}

.skill-card[data-level='intermediate'] {
  border-color: #f59e0b;
}

.skill-card[data-level='beginner'] {
  border-color: #06b6d4;
}

.skill-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 2rem;
  height: 2rem;
  color: white;
  transition: transform 0.3s ease;
}

.skill-icon svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

.skill-card:hover .icon {
  transform: scale(1.1) rotate(5deg);
}

.skill-info {
  flex: 1;
}

.skill-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.skill-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.skill-level {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.level-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  min-width: 80px;
}

.level-bar {
  flex: 1;
  height: 6px;
  border: 1px solid var(--text-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.level-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 3px;
  transition: width 0.8s ease;
}

.skills-summary {
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--text-secondary);
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .skills {
    padding: 3rem 0;
  }

  .skills-container {
    padding: 0 1rem;
  }

  .skills-title {
    font-size: 2.5rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .skill-card {
    padding: 1.5rem;
  }

  .category-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .summary-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .skills-title {
    font-size: 2rem;
  }

  .skills-categories {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .summary-stats {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .skills {
    /* Background removed for transparent appearance */
  }
}

/* Animation classes */
.skill-card {
  animation: fadeInUp 0.6s ease forwards;
}

.skill-card:nth-child(1) {
  animation-delay: 0.1s;
}
.skill-card:nth-child(2) {
  animation-delay: 0.2s;
}
.skill-card:nth-child(3) {
  animation-delay: 0.3s;
}
.skill-card:nth-child(4) {
  animation-delay: 0.4s;
}
.skill-card:nth-child(5) {
  animation-delay: 0.5s;
}
.skill-card:nth-child(6) {
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
