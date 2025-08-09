<script setup lang="ts">
import Layout from './components/Layout.vue'
</script>

<template>
  <Layout>
    <router-view />
  </Layout>
</template>

<style>
/* Global CSS Variables */
:root {
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  --bg-color: #ffffff;
  --bg-secondary: #ffffff;
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

<style>
/* Global base styles */
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

* {
  box-sizing: border-box;
}
</style>
