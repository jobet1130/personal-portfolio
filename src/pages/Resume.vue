<template>
  <div class="resume-page">
    <Resume />
  </div>
</template>

<script setup lang="ts">
import Resume from '../components/Resume.vue'
</script>

<style scoped>
.resume-page {
  min-height: 100vh;
  background: var(--bg-color, #ffffff);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .resume-page {
    --bg-color: #111827;
  }
}
</style>