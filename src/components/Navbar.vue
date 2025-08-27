<template>
  <header class="header">
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <div class="nav-brand">
        <router-link to="/" class="brand-text">Portfolio</router-link>
      </div>
      <ul class="nav-links" :class="{ 'nav-links-open': isMobileMenuOpen }">
        <li><router-link to="/" @click="closeMobileMenu">Home</router-link></li>
        <li><router-link to="/about" @click="closeMobileMenu">About</router-link></li>
        <li><router-link to="/projects" @click="closeMobileMenu">Projects</router-link></li>
        <li><router-link to="/resume" @click="closeMobileMenu">Resume</router-link></li>
      </ul>
      <button
        class="mobile-menu-toggle"
        @click="toggleMobileMenu"
        :class="{ active: isMobileMenuOpen }"
        aria-label="Toggle mobile menu"
        :aria-expanded="isMobileMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-brand .brand-text {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-brand .brand-text:hover {
  color: #007bff;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
  transition: all 0.3s ease;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  position: relative;
}

.nav-links a:hover {
  color: #007bff;
  background-color: rgba(0, 123, 255, 0.1);
}

.nav-links a.router-link-active {
  color: #007bff;
  background-color: rgba(0, 123, 255, 0.15);
  font-weight: 600;
}

.nav-links a.router-link-exact-active {
  color: #007bff;
  background-color: rgba(0, 123, 255, 0.2);
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background: #333;
  margin: 3px 0;
  transition: 0.3s;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(-45deg) translate(-5px, 6px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(45deg) translate(-5px, -6px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav {
    padding: 1rem;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
  }

  .nav-links-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .mobile-menu-toggle {
    display: flex;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .header {
    background: rgba(30, 30, 30, 0.95);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-brand .brand-text,
  .nav-links a {
    color: #fff;
  }

  .nav-brand .brand-text:hover,
  .nav-links a:hover {
    color: #60a5fa;
    background-color: rgba(96, 165, 250, 0.1);
  }

  .nav-links a.router-link-active {
    color: #60a5fa;
    background-color: rgba(96, 165, 250, 0.15);
  }

  .nav-links a.router-link-exact-active {
    color: #60a5fa;
    background-color: rgba(96, 165, 250, 0.2);
  }

  .mobile-menu-toggle span {
    background: #fff;
  }

  @media (max-width: 768px) {
    .nav-links {
      background: rgba(30, 30, 30, 0.98);
    }
  }
}
</style>
