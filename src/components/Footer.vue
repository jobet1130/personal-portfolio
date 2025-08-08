<template>
  <footer class="footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} Portfolio. All rights reserved.</p>
      <div class="social-links">
        <a href="#" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-github"></i>
        </a>
        <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="#" aria-label="Email">
          <i class="fas fa-envelope"></i>
        </a>
        <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
          <i class="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: #333;
  color: white;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-content p {
  margin: 0;
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.social-links a:hover {
  color: #007bff;
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer-content p {
    font-size: 0.8rem;
  }

  .social-links a {
    font-size: 1rem;
    width: 35px;
    height: 35px;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .footer {
    background: #1a1a1a;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>