<template>
  <section id="skills" class="skills">
    <div class="skills-container">
      <div class="skills-header">
        <h2 class="skills-title">Technical Skills</h2>
        <p class="skills-subtitle">
          Technologies and tools I use to build exceptional solutions
        </p>
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
                  <div 
                    class="level-progress" 
                    :style="{ width: getLevelWidth(skill.level) }"
                  ></div>
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
  SkillLevel
} from '../data/skills'

// Icon components using SVG
const iconComponents = {
  vue: () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, [
    h('path', { d: 'M2,3L5.09,12L2,21H6.09L8.5,15L10.91,21H15L11.91,12L15,3H10.91L8.5,9L6.09,3H2Z' })
  ]),
  
  react: () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, [
    h('path', { d: 'M12,10.11C13.03,10.11 13.87,10.95 13.87,12C13.87,13 13.03,13.85 12,13.85C10.97,13.85 10.13,13 10.13,12C10.13,10.95 10.97,10.11 12,10.11M7.37,20C8,20.38 9.38,19.8 10.97,18.3C10.45,17.71 9.94,17.07 9.46,16.4C8.64,16.32 7.83,16.2 7.06,16.04C6.55,18.18 6.74,19.65 7.37,20M8.08,14.26L7.79,13.75C7.68,14.04 7.57,14.33 7.5,14.61C7.77,14.67 8.07,14.72 8.38,14.77C8.28,14.6 8.18,14.43 8.08,14.26M14.62,13.5L15.43,12L14.62,10.5C14.32,9.97 14,9.5 13.71,9.03C13.17,9 12.6,9 12,9C11.4,9 10.83,9 10.29,9.03C10,9.5 9.68,9.97 9.38,10.5L8.57,12L9.38,13.5C9.68,14.03 10,14.5 10.29,14.97C10.83,15 11.4,15 12,15C12.6,15 13.17,15 13.71,14.97C14,14.5 14.32,14.03 14.62,13.5M12,6.78C11.81,7 11.61,7.23 11.41,7.5C11.61,7.5 11.8,7.5 12,7.5C12.2,7.5 12.39,7.5 12.59,7.5C12.39,7.23 12.19,7 12,6.78M12,17.22C12.19,17 12.39,16.77 12.59,16.5C12.39,16.5 12.2,16.5 12,16.5C11.8,16.5 11.61,16.5 11.41,16.5C11.61,16.77 11.81,17 12,17.22M16.62,4C16,3.62 14.62,4.2 13.03,5.7C13.55,6.29 14.06,6.93 14.54,7.6C15.36,7.68 16.17,7.8 16.94,7.96C17.45,5.82 17.26,4.35 16.62,4M15.92,9.74L16.21,10.25C16.32,9.96 16.43,9.67 16.5,9.39C16.23,9.33 15.93,9.28 15.62,9.23C15.72,9.4 15.82,9.57 15.92,9.74M17.37,2.69C18.84,3.53 19,5.74 18.38,8.32C20.92,9.07 22.75,10.31 22.75,12C22.75,13.69 20.92,14.93 18.38,15.68C19,18.26 18.84,20.47 17.37,21.31C15.91,22.15 13.92,21.19 12,19.36C10.08,21.19 8.09,22.15 6.62,21.31C5.16,20.47 5,18.26 5.62,15.68C3.08,14.93 1.25,13.69 1.25,12C1.25,10.31 3.08,9.07 5.62,8.32C5,5.74 5.16,3.53 6.62,2.69C8.09,1.85 10.08,2.81 12,4.64C13.92,2.81 15.91,1.85 17.37,2.69Z' })
  ]),
  
  typescript: () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, [
    h('path', { d: 'M3,3H21V21H3V3M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86M13,11.25H8V12.75H9.5V20H11.25V12.75H13V11.25Z' })
  ]),
  
  javascript: () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, [
    h('path', { d: 'M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z' })
  ]),
  
  python: () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, [
    h('path', { d: 'M19.14,7.5A2.86,2.86 0 0,1 22,10.36V14.14A2.86,2.86 0 0,1 19.14,17H12C12,17.39 12.32,17.96 12.71,17.96H17V19.64A2.86,2.86 0 0,1 14.14,22.5H9.86A2.86,2.86 0 0,1 7,19.64V15.89C7,14.31 8.28,13.04 9.86,13.04H15.11C16.69,13.04 17.96,11.76 17.96,10.18V7.5H19.14M14.86,19.29C14.46,19.29 14.14,19.59 14.14,20.18C14.14,20.77 14.46,20.89 14.86,20.89A0.71,0.71 0 0,0 15.57,20.18C15.57,19.59 15.25,19.29 14.86,19.29M4.86,17.5C3.28,17.5 2,16.22 2,14.64V10.86C2,9.28 3.28,8 4.86,8H12C12,7.61 11.68,7.04 11.29,7.04H7V5.36C7,3.78 8.28,2.5 9.86,2.5H14.14C15.72,2.5 17,3.78 17,5.36V9.11C17,10.69 15.72,11.96 14.14,11.96H8.89C7.31,11.96 6.04,13.24 6.04,14.82V17.5H4.86M9.14,5.71C9.54,5.71 9.86,5.41 9.86,4.82C9.86,4.23 9.54,4.11 9.14,4.11C8.75,4.11 8.43,4.23 8.43,4.82C8.43,5.41 8.75,5.71 9.14,5.71Z' })
  ]),
  
  java: () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, [
    h('path', { d: 'M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639' })
  ]),
  
  postgresql: () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, [
    h('path', { d: 'M23.111 5.441c-.777-1.185-2.141-1.839-3.839-1.839-1.261 0-2.357.404-3.082 1.137-.725-.733-1.821-1.137-3.082-1.137-1.698 0-3.062.654-3.839 1.839C7.546 6.626 6.667 8.746 6.667 11.111c0 2.365.879 4.485 2.602 5.67.777 1.185 2.141 1.839 3.839 1.839 1.261 0 2.357-.404 3.082-1.137.725.733 1.821 1.137 3.082 1.137 1.698 0 3.062-.654 3.839-1.839 1.723-1.185 2.602-3.305 2.602-5.67 0-2.365-.879-4.485-2.602-5.67zm-7.111 11.448c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z' })
  ]),
  
  mysql: () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, [
    h('path', { d: 'M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H.085c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.438 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.357-.622zM15.5 17.588c-.225 0-.406-.15-.544-.448-.138-.302-.207-.684-.207-1.148 0-.448.069-.824.207-1.126.138-.302.319-.453.544-.453.231 0 .413.15.544.453.138.302.207.678.207 1.126 0 .464-.069.846-.207 1.148-.131.299-.313.448-.544.448z' }),
    h('path', { d: 'M2.195 14.225c0 .324.024.604.072.840.048.235.12.427.216.576.096.148.216.255.36.32.144.064.312.096.504.096.264 0 .492-.06.684-.18.192-.12.348-.288.468-.504l.12.576h.72v-3.168c0-.336-.036-.624-.108-.864-.072-.24-.18-.432-.324-.576-.144-.144-.324-.252-.54-.324-.216-.072-.468-.108-.756-.108-.192 0-.372.024-.54.072-.168.048-.312.12-.432.216-.12.096-.216.216-.288.36-.072.144-.108.312-.108.504h.72c0-.144.024-.264.072-.36.048-.096.12-.168.216-.216.096-.048.216-.072.36-.072.192 0 .348.048.468.144.12.096.18.252.18.468v.192c-.144-.048-.3-.084-.468-.108-.168-.024-.336-.036-.504-.036-.192 0-.372.024-.54.072-.168.048-.312.12-.432.216-.12.096-.216.216-.288.36-.072.144-.108.312-.108.504zm.72 0c0-.144.024-.264.072-.36.048-.096.12-.168.216-.216.096-.048.216-.072.36-.072.144 0 .288.024.432.072.144.048.264.12.36.216v.72c-.096.096-.216.168-.36.216-.144.048-.288.072-.432.072-.144 0-.264-.024-.36-.072-.096-.048-.168-.12-.216-.216-.048-.096-.072-.216-.072-.36z' })
  ]),
  
  git: () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, [
    h('path', { d: 'M2.6 10.59L8.38 4.8l1.69 1.7c-.24.85.15 1.78.93 2.23v5.54c-.6.34-1 .99-1 1.73 0 1.1.9 2 2 2s2-.9 2-2c0-.74-.4-1.39-1-1.73V9.41l2.07 2.09c-.07.15-.07.32-.07.5 0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2c-.18 0-.35 0-.5.07L13.93 7.5a1.98 1.98 0 0 0-1.15-2.34c-.43-.16-.88-.2-1.28-.09L9.8 3.38l.79-.78c.78-.79 2.04-.79 2.82 0l7.99 7.99c.79.78.79 2.04 0 2.82l-7.99 7.99c-.78.79-2.04.79-2.82 0L2.6 13.41c-.79-.78-.79-2.04 0-2.82z' })
  ]),
  
  docker: () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, [
    h('path', { d: 'M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.186v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.186v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338 0-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983 0 1.938-.089 2.844-.266a11.94 11.94 0 003.717-1.568c1.573-1.251 2.852-3.051 3.801-5.347h.329c1.285 0 1.829-.613 1.938-.803.162-.28.222-.599.17-.905l-.05-.327-.329-.21z' })
  ]),
  
  salesforce: () => h('svg', {
    viewBox: '0 0 24 24',
    fill: 'currentColor'
  }, [
    h('path', { d: 'M8.546 11.174c-.042-.766.251-1.5.826-2.065.575-.565 1.354-.879 2.194-.884.84-.005 1.624.299 2.206.856.582.557.887 1.287.858 2.053.029.766-.276 1.496-.858 2.053-.582.557-1.366.861-2.206.856-.84-.005-1.619-.319-2.194-.884-.575-.565-.868-1.299-.826-2.065zm7.908-1.174c-.042-.766.251-1.5.826-2.065.575-.565 1.354-.879 2.194-.884.84-.005 1.624.299 2.206.856.582.557.887 1.287.858 2.053.029.766-.276 1.496-.858 2.053-.582.557-1.366.861-2.206.856-.84-.005-1.619-.319-2.194-.884-.575-.565-.868-1.299-.826-2.065zm-7.908 5c-.042-.766.251-1.5.826-2.065.575-.565 1.354-.879 2.194-.884.84-.005 1.624.299 2.206.856.582.557.887 1.287.858 2.053.029.766-.276 1.496-.858 2.053-.582.557-1.366.861-2.206.856-.84-.005-1.619-.319-2.194-.884-.575-.565-.868-1.299-.826-2.065z' })
  ])
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
    [SkillLevel.EXPERT]: '100%'
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

.skill-card[data-level="expert"] {
  border-color: #10b981;
}

.skill-card[data-level="advanced"] {
  border-color: var(--primary-color);
}

.skill-card[data-level="intermediate"] {
  border-color: #f59e0b;
}

.skill-card[data-level="beginner"] {
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

.skill-card:nth-child(1) { animation-delay: 0.1s; }
.skill-card:nth-child(2) { animation-delay: 0.2s; }
.skill-card:nth-child(3) { animation-delay: 0.3s; }
.skill-card:nth-child(4) { animation-delay: 0.4s; }
.skill-card:nth-child(5) { animation-delay: 0.5s; }
.skill-card:nth-child(6) { animation-delay: 0.6s; }

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