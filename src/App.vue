<script setup lang="ts">
import Layout from './components/Layout.vue'
import Hero from './components/Hero.vue'
</script>

<template>
  <Layout>
    <Hero />
    
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

<style>
/* Global CSS Variables */
:root {
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  --bg-color: #ffffff;
  --bg-secondary: #f8fafc;
  --text-color: #1e293b;
  --text-secondary: #64748b;
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #60a5fa;
    --primary-hover: #3b82f6;
    --bg-color: #0f172a;
    --bg-secondary: #1e293b;
    --text-color: #f1f5f9;
    --text-secondary: #cbd5e1;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
}
</style>

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
  background-color: var(--bg-secondary);
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
}
</style>
