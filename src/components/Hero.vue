<template>
  <section id="home" class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">
          Hi, I'm <span class="highlight">Jobet P. Casquejo</span>
        </h1>
        <h2 class="hero-subtitle">
          Salesforce Developer & CRM Solutions Expert
        </h2>
        <p class="hero-description">
          I build powerful CRM solutions and automate business processes using Salesforce platform. 
          With 2 years of experience in Apex, Lightning Web Components, and scalable architecture, I transform 
          business requirements into efficient solutions that drive growth and productivity.
        </p>
        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary">
            Explore My Projects
          </a>
          <a href="#contact" class="btn btn-secondary">
            Let's Connect
          </a>
        </div>
      </div>
      <div class="hero-image">
        <div class="image-placeholder">
          <svg viewBox="0 0 200 200" class="profile-svg">
            <circle cx="100" cy="100" r="80" fill="var(--primary-color)" opacity="0.1"/>
            <circle cx="100" cy="80" r="30" fill="var(--primary-color)" opacity="0.3"/>
            <path d="M60 140 Q100 120 140 140 Q140 160 100 160 Q60 160 60 140" fill="var(--primary-color)" opacity="0.3"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <div class="scroll-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Add any hero animations or interactions here
})
</script>

<style scoped>
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem 1rem 0.5rem 1rem;
  text-align: center;
}

.hero-container {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.hero-content {
  animation: fadeInLeft 1s ease-out;
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.highlight {
  color: var(--primary-color);
  position: relative;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--primary-color);
  opacity: 0.3;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.hero-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: inline-block;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeInRight 1s ease-out;
}

.image-placeholder {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.profile-svg {
  width: 200px;
  height: 200px;
}



/* Animations */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
    padding: 0 1rem;
  }
  
  .hero-content {
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-actions {
    justify-content: center;
    width: 100%;
  }
  
  .image-placeholder {
    width: 250px;
    height: 250px;
  }
  
  .profile-svg {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .hero {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 250px;
    text-align: center;
  }
}

/* Scroll Indicator Styles */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

.scroll-arrow {
  color: var(--text-secondary);
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.scroll-arrow:hover {
  opacity: 1;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

</style>