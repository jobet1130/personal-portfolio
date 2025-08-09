<template>
  <section class="values">
    <div class="values-container">
      <div class="values-header">
        <h2 class="values-title">Core Values</h2>
        <p class="values-intro">The principles that guide my work and professional relationships</p>
      </div>
      
      <div class="values-grid">
        <div class="value-card" v-for="(value, index) in valuesData" :key="index">
          <div class="value-icon">{{ value.icon }}</div>
          <h3 class="value-title">{{ value.title }}</h3>
          <p class="value-description">{{ value.description }}</p>
          <div class="value-examples">
            <h4>In Practice:</h4>
            <ul>
              <li v-for="example in value.examples" :key="example">{{ example }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Value {
  icon: string
  title: string
  description: string
  examples: string[]
}

const valuesData = ref<Value[]>([
  {
    icon: '🎯',
    title: 'Excellence',
    description: 'I strive for the highest quality in every project, continuously learning and improving my skills to deliver exceptional results.',
    examples: [
      'Writing clean, maintainable code',
      'Thorough testing and documentation',
      'Continuous learning and skill development'
    ]
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    description: 'I believe in the power of teamwork and open communication to achieve shared goals and create innovative solutions.',
    examples: [
      'Active participation in team discussions',
      'Knowledge sharing and mentoring',
      'Cross-functional collaboration'
    ]
  },
  {
    icon: '💡',
    title: 'Innovation',
    description: 'I embrace new technologies and creative approaches to solve complex problems and drive business transformation.',
    examples: [
      'Exploring emerging Salesforce features',
      'Proposing process improvements',
      'Implementing creative solutions'
    ]
  },
  {
    icon: '🔒',
    title: 'Integrity',
    description: 'I maintain the highest ethical standards, ensuring transparency, honesty, and reliability in all professional interactions.',
    examples: [
      'Honest communication about project timelines',
      'Protecting client data and privacy',
      'Taking responsibility for mistakes'
    ]
  },
  {
    icon: '📈',
    title: 'Growth Mindset',
    description: 'I view challenges as opportunities to learn and grow, constantly seeking feedback and new perspectives.',
    examples: [
      'Seeking feedback on code reviews',
      'Learning from project retrospectives',
      'Pursuing certifications and training'
    ]
  },
  {
    icon: '⚡',
    title: 'Efficiency',
    description: 'I focus on delivering maximum value with optimal resource utilization, streamlining processes and eliminating waste.',
    examples: [
      'Automating repetitive tasks',
      'Optimizing code performance',
      'Streamlining development workflows'
    ]
  }
])
</script>

<style scoped>
.values {
  padding: 4rem 2rem;
}

.values-container {
  max-width: 1200px;
  margin: 0 auto;
}

.values-header {
  text-align: center;
  margin-bottom: 4rem;
}

.values-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.values-intro {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.value-card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.value-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.value-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.value-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.value-examples {
  border-top: 1px solid var(--border-color);
  padding-top: 1rem;
}

.value-examples h4 {
  font-size: 0.9rem;
  color: var(--primary-color);
  margin-bottom: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.value-examples ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.value-examples li {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.value-examples li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
  .values {
    padding: 2rem 1rem;
  }
  
  .values-title {
    font-size: 2rem;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .value-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .values-title {
    font-size: 1.8rem;
  }
  
  .value-card {
    padding: 1rem;
  }
  
  .value-icon {
    font-size: 2.5rem;
  }
  
  .value-title {
    font-size: 1.2rem;
  }
}
</style>