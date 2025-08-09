<template>
  <div>
    <Hero />
    
    <About />
    
    <Skills />
    
    <Projects />
    
    <div id="contact" class="section">
      <h2>Contact</h2>
      <p>Get in touch with me.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Skills from '../components/Skills.vue'
import Projects from '../components/Projects.vue'
</script>

<style scoped>
.section {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.section p {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}



@media (max-width: 768px) {
  .section {
    padding: 4rem 1rem;
  }
  
  .section h2 {
    font-size: 2rem;
  }
  
  .section p {
    font-size: 1rem;
  }
}
</style>