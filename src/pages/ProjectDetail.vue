<template>
  <div class="project-detail">
    <div class="container">
      <!-- Project Header -->
      <div class="project-header" v-if="project">
        <button @click="goBack" class="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Projects
        </button>
          
          <h1 class="project-title">{{ project.title }}</h1>
          <p class="project-description">{{ project.description }}</p>
          
          <div class="project-technologies">
            <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Under Construction Section -->
        <div class="under-construction">
          <div class="construction-animation">
            <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Construction materials/foundation -->
              <g class="building-materials">
                <!-- Wooden planks -->
                <rect x="40" y="140" width="30" height="8" rx="2" fill="#92400e" stroke="#7c2d12" stroke-width="1"/>
                <rect x="42" y="148" width="26" height="8" rx="2" fill="#a16207" stroke="#92400e" stroke-width="1"/>
                <!-- Bricks -->
                <rect x="80" y="145" width="12" height="6" rx="1" fill="#dc2626" stroke="#b91c1c" stroke-width="1"/>
                <rect x="94" y="145" width="12" height="6" rx="1" fill="#dc2626" stroke="#b91c1c" stroke-width="1"/>
                <rect x="87" y="151" width="12" height="6" rx="1" fill="#dc2626" stroke="#b91c1c" stroke-width="1"/>
                <!-- Nails scattered -->
                <circle cx="75" cy="155" r="1" fill="#6b7280"/>
                <circle cx="110" cy="150" r="1" fill="#6b7280"/>
                <circle cx="65" cy="148" r="1" fill="#6b7280"/>
              </g>
              
              <!-- Person body -->
              <g class="person">
                <!-- Head -->
                <circle cx="100" cy="40" r="15" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
                <!-- Body (slightly leaning forward) -->
                <rect x="88" y="55" width="20" height="40" rx="10" fill="#3b82f6" stroke="#2563eb" stroke-width="2" transform="rotate(5 98 75)"/>
                <!-- Arms -->
                <g class="arm-left">
                  <rect x="73" y="63" width="15" height="8" rx="4" fill="#fbbf24" stroke="#f59e0b" stroke-width="1" transform="rotate(-15 80.5 67)"/>
                </g>
                <g class="arm-right">
                  <rect x="110" y="60" width="15" height="8" rx="4" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>
                </g>
                <!-- Legs (wider stance) -->
                <rect x="90" y="95" width="6" height="25" rx="3" fill="#1f2937" stroke="#111827" stroke-width="1" transform="rotate(-5 93 107.5)"/>
                <rect x="104" y="95" width="6" height="25" rx="3" fill="#1f2937" stroke="#111827" stroke-width="1" transform="rotate(5 107 107.5)"/>
                <!-- Feet -->
                <ellipse cx="93" cy="125" rx="8" ry="4" fill="#7c2d12" stroke="#92400e" stroke-width="1" transform="rotate(-5 93 125)"/>
                <ellipse cx="107" cy="125" rx="8" ry="4" fill="#7c2d12" stroke="#92400e" stroke-width="1" transform="rotate(5 107 125)"/>
              </g>
              
              <!-- Hammer -->
              <g class="hammer">
                <!-- Handle -->
                <rect x="130" y="40" width="4" height="35" rx="2" fill="#92400e" stroke="#7c2d12" stroke-width="1"/>
                <!-- Head -->
                <rect x="125" y="35" width="14" height="10" rx="2" fill="#6b7280" stroke="#4b5563" stroke-width="1"/>
                <!-- Claw -->
                <path d="M125 40 L120 45 L125 45 Z" fill="#6b7280" stroke="#4b5563" stroke-width="1"/>
              </g>
              
              <!-- Construction target (nail/wood) -->
              <g class="construction-target">
                <rect x="140" y="50" width="8" height="3" rx="1" fill="#92400e" stroke="#7c2d12" stroke-width="1"/>
                <circle cx="144" cy="48" r="1.5" fill="#6b7280" stroke="#4b5563" stroke-width="0.5"/>
              </g>
              
              <!-- Construction sparks/effects -->
              <g class="sparks">
                <circle cx="145" cy="30" r="2" fill="#fbbf24" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="150" cy="37" r="1.5" fill="#f59e0b" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.8s" repeatCount="indefinite"/>
                </circle>
                <circle cx="140" cy="25" r="1" fill="#fbbf24" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.2s" repeatCount="indefinite"/>
                </circle>
                <!-- Impact lines -->
                <line x1="148" y1="32" x2="152" y2="28" stroke="#fbbf24" stroke-width="2" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite"/>
                </line>
                <line x1="142" y1="35" x2="138" y2="31" stroke="#f59e0b" stroke-width="1.5" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="2.2s" repeatCount="indefinite"/>
                </line>
              </g>
              
              <!-- Hard hat -->
              <ellipse cx="100" cy="32" rx="18" ry="8" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
              <rect x="85" y="28" width="30" height="6" rx="3" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
              <!-- Hard hat light -->
              <circle cx="100" cy="25" r="3" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>
            </svg>
          </div>
          
          <h2 class="construction-title">Project Under Construction</h2>
          <p class="construction-message">
            This project page is currently being developed. Please check back soon for detailed information, 
            screenshots, and live demos.
          </p>
          
          <div class="construction-features">
            <h3>Coming Soon:</h3>
            <ul>
              <li>📸 Project screenshots and gallery</li>
              <li>🔧 Technical implementation details</li>
              <li>🚀 Live demo and source code links</li>
              <li>📊 Performance metrics and insights</li>
              <li>🎯 Challenges and solutions</li>
            </ul>
          </div>
          
          <!-- Project Links if available -->
          <div class="project-links" v-if="project && (project.githubUrl || project.liveUrl)">
            <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="project-link github-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Source Code
            </a>
            
            <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="project-link live-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15,3 21,3 21,9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProjectById, type Project } from '../data/projects'

const route = useRoute()
const router = useRouter()
const project = ref<Project | undefined>()

onMounted(() => {
  const projectId = parseInt(route.params.id as string)
  if (projectId) {
    project.value = getProjectById(projectId)
    
    // If project not found, redirect to 404
    if (!project.value) {
      router.push('/404')
    }
  } else {
    router.push('/projects')
  }
})

const goBack = () => {
  router.push('/projects')
}
</script>

<style scoped>
.project-detail {
  min-height: 100vh; /* Full viewport height for standalone page */
  padding: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 2rem 1rem; /* Increased top padding for standalone page */
}

.project-header {
  margin-bottom: 3rem;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-2px);
}

.project-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.project-description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.under-construction {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 3rem;
  text-align: center;
  backdrop-filter: blur(10px);
}

.construction-animation {
  margin-bottom: 2rem;
  animation: bounce 2s infinite;
}

.construction-animation .hammer {
  transform-origin: 132px 80px;
  animation: hammer-swing 2s ease-in-out infinite;
}

.construction-animation .arm-right {
  transform-origin: 117px 69px;
  animation: arm-swing 2s ease-in-out infinite;
}

@keyframes hammer-swing {
  0%, 100% {
    transform: rotate(-20deg);
  }
  25% {
    transform: rotate(-25deg);
  }
  50% {
    transform: rotate(25deg);
  }
  75% {
    transform: rotate(20deg);
  }
}

@keyframes arm-swing {
  0%, 100% {
    transform: rotate(-10deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(20deg);
  }
  75% {
    transform: rotate(15deg);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.construction-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fbbf24;
}

.construction-message {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.construction-features {
  text-align: left;
  max-width: 500px;
  margin: 0 auto 2rem;
}

.construction-features h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
  color: #e0e7ff;
}

.construction-features ul {
  list-style: none;
  padding: 0;
}

.construction-features li {
  padding: 0.5rem 0;
  font-size: 1rem;
  opacity: 0.9;
}

.project-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.github-link {
  background: #333;
  color: white;
  border-color: #333;
}

.github-link:hover {
  background: #555;
  border-color: #555;
  transform: translateY(-2px);
}

.live-link {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.live-link:hover {
  background: #059669;
  border-color: #059669;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .project-title {
    font-size: 2rem;
  }
  
  .construction-title {
    font-size: 2rem;
  }
  
  .under-construction {
    padding: 2rem 1rem;
  }
  
  .project-links {
    flex-direction: column;
    align-items: center;
  }
  
  .project-link {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
}
</style>