<script setup lang="ts">
import Layout from './components/Layout.vue'
</script>

<template>
  <Layout>
    <div id="home" class="section">
      <h1>Welcome to My Portfolio</h1>
      <p>A modern portfolio website built with Vue 3 and TypeScript</p>
    </div>
    
    <div id="about" class="section">
      <h2>About Me</h2>
      <p>I'm a passionate developer with experience in modern web technologies.</p>
    </div>
    
    <div id="skills" class="section">
      <h2>Skills</h2>
      <p>My technical expertise and capabilities.</p>
    </div>
    
    <div id="projects" class="section">
      <h2>Projects</h2>
      <p>Showcase of my work and achievements.</p>
    </div>
    
    <div id="contact" class="section">
      <h2>Contact</h2>
      <p>Get in touch with me.</p>
    </div>
  </Layout>
</template>

<style scoped>
.section {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.section:nth-child(even) {
  background-color: #f8f9fa;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #34495e;
}

p {
  font-size: 1.2rem;
  color: #7f8c8d;
  max-width: 600px;
}
</style>
