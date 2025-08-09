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
        <div class="image-container">
          <img src="/images/profile.jpg" alt="Jobet P. Casquejo - Salesforce Developer" class="profile-image" />
          <div class="image-placeholder"></div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="scroll-indicator">
      <div class="scroll-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 13l3 3 7-7"></path>
          <path d="M7 6l3 3 7-7"></path>
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

.image-container {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.profile-image:hover {
  transform: scale(1.05);
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-secondary);
  border-radius: 50%;
  z-index: -1;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
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
  
  .image-container {
    width: 250px;
    height: 250px;
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



</style>