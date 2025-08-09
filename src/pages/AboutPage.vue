<template>
  <div class="about-page">
    <About />
    <Timeline />
    <Values />
    <PersonalInterests />
  </div>
</template>

<script setup lang="ts">
import About from '../components/About.vue'
import Timeline from '../components/Timeline.vue'
import Values from '../components/Values.vue'
import PersonalInterests from '../components/PersonalInterests.vue'
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 2rem 0;
}
</style>