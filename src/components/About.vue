<template>
  <section id="about" class="about">
    <div class="about-container">
      <div class="about-header">
        <h2 class="about-title">About Me</h2>
        <p class="about-intro">Get to know more about my background and expertise</p>
      </div>
      
      <div class="about-content">
        <div class="about-text">
          <div class="about-description">
            <p>
              I'm a passionate Salesforce Developer with 2 years of experience in building robust CRM solutions 
              and automating business processes. My expertise spans across Apex development, Lightning Web Components, 
              and creating scalable architectures that drive business growth.
            </p>
            <p>
              I thrive on transforming complex business requirements into efficient, user-friendly solutions. 
              My approach combines technical excellence with a deep understanding of business needs, ensuring 
              that every solution I deliver adds real value to the organization.
            </p>
          </div>
          
          <div class="about-highlights">
            <div class="highlight-item">
              <div class="highlight-icon">💡</div>
              <div class="highlight-content">
                <h3>Innovation Driven</h3>
                <p>Always exploring new technologies and methodologies to deliver cutting-edge solutions</p>
              </div>
            </div>
            
            <div class="highlight-item">
              <div class="highlight-icon">🎯</div>
              <div class="highlight-content">
                <h3>Results Focused</h3>
                <p>Committed to delivering high-quality solutions that meet business objectives and exceed expectations</p>
              </div>
            </div>
            
            <div class="highlight-item">
              <div class="highlight-icon">🤝</div>
              <div class="highlight-content">
                <h3>Collaborative</h3>
                <p>Strong team player with excellent communication and problem-solving skills</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="about-stats">
          <div class="stat-card">
            <div class="stat-number">50+</div>
            <div class="stat-label">Projects Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">2</div>
            <div class="stat-label">Years Experience</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">10+</div>
            <div class="stat-label">Technologies Used</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  // Add any about section animations or interactions here
})
</script>

<style scoped>
.about {
  padding: 0 2rem 0.5rem 2rem;
  margin: 0;
  min-height: 100vh;
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
}

.about-header {
  text-align: center;
  margin-bottom: 4rem;
}

.about-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.about-intro {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-text {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.about-description {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-description p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin: 0;
}

.about-highlights {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.highlight-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.highlight-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.highlight-content h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
}

.highlight-content p {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 2rem;
}

.stat-card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .about {
    padding: 0 1rem 2rem 1rem;
    margin: 0;
  }
  
  .about-title {
    font-size: 2.5rem;
  }
  
  .about-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .about-stats {
    position: static;
    flex-direction: row;
    overflow-x: auto;
    gap: 1rem;
  }
  
  .stat-card {
    min-width: 150px;
    flex-shrink: 0;
  }
  
  .highlight-item {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .about-title {
    font-size: 2rem;
  }
  
  .about-intro {
    font-size: 1rem;
  }
  
  .about-description p {
    font-size: 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .about-stats {
    flex-direction: column;
  }
}
</style>