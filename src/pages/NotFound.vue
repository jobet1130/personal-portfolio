<template>
  <div class="not-found">
    <div class="not-found-container">
      <div class="error-code">
        <span class="four">4</span>
        <span class="zero">0</span>
        <span class="four">4</span>
      </div>
      
      <h1 class="error-title">Page Not Found</h1>
      
      <p class="error-description">
        Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
      </p>
      
      <div class="error-actions">
        <router-link to="/" class="btn btn-primary">
          <svg class="home-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          Go Home
        </router-link>
        
        <button @click="goBack" class="btn btn-secondary">
          <svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
          </svg>
          Go Back
        </button>
      </div>
      
      <div class="helpful-links">
        <h3>You might be looking for:</h3>
        <ul>
          <li><router-link to="/#about">About Me</router-link></li>
          <li><router-link to="/#skills">Skills</router-link></li>
          <li><router-link to="/#projects">Projects</router-link></li>
          <li><router-link to="/#contact">Contact</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: var(--bg-color);
  color: var(--text-color);
}

.not-found-container {
  text-align: center;
  max-width: 600px;
  width: 100%;
}

.error-code {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  font-size: 8rem;
  font-weight: 900;
  line-height: 1;
}

.four {
  color: var(--primary-color);
  animation: bounce 2s infinite;
}

.zero {
  color: var(--text-secondary);
  animation: pulse 2s infinite;
}

.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.error-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: transparent;
  color: var(--text-color);
  border: 2px solid var(--text-secondary);
}

.btn-secondary:hover {
  background: var(--text-secondary);
  color: var(--bg-color);
  transform: translateY(-2px);
}

.home-icon,
.back-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.helpful-links {
  text-align: left;
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--text-secondary);
  opacity: 0.1;
}

.helpful-links h3 {
  margin-bottom: 1rem;
  color: var(--text-color);
  font-size: 1.25rem;
}

.helpful-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.helpful-links li {
  margin-bottom: 0.5rem;
}

.helpful-links a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.helpful-links a:hover {
  color: var(--primary-hover);
  text-decoration: underline;
}

/* Animations */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
    gap: 0.5rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-description {
    font-size: 1rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }
  
  .helpful-links {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 4rem;
  }
  
  .not-found {
    padding: 1rem;
  }
  
  .helpful-links {
    padding: 1.5rem;
  }
}
</style>