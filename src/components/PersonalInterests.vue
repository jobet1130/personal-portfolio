<template>
  <section class="personal-interests">
    <div class="interests-container">
      <div class="interests-header">
        <h2 class="interests-title">Beyond the Code</h2>
        <p class="interests-intro">My passions and interests that fuel creativity and balance</p>
      </div>
      
      <div class="interests-content">
        <div class="interests-grid">
          <div class="interest-card" v-for="(interest, index) in interestsData" :key="index">
            <div class="interest-icon">{{ interest.icon }}</div>
            <h3 class="interest-title">{{ interest.title }}</h3>
            <p class="interest-description">{{ interest.description }}</p>
            <div class="interest-details">
              <span class="detail-item" v-for="detail in interest.details" :key="detail">{{ detail }}</span>
            </div>
          </div>
        </div>
        
        <div class="fun-facts">
          <h3 class="fun-facts-title">Fun Facts About Me</h3>
          <div class="facts-grid">
            <div class="fact-item" v-for="(fact, index) in funFacts" :key="index">
              <div class="fact-icon">{{ fact.icon }}</div>
              <p class="fact-text">{{ fact.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Interest {
  icon: string
  title: string
  description: string
  details: string[]
}

interface FunFact {
  icon: string
  text: string
}

const interestsData = ref<Interest[]>([
  {
    icon: '💻',
    title: 'Technology Exploration',
    description: 'Always curious about emerging technologies and their potential applications in solving real-world problems.',
    details: ['AI & Machine Learning', 'Cloud Computing', 'IoT Devices', 'Blockchain']
  },
  {
    icon: '📚',
    title: 'Continuous Learning',
    description: 'Passionate about expanding knowledge through books, courses, and hands-on experimentation.',
    details: ['Technical Books', 'Online Courses', 'Podcasts', 'Tech Conferences']
  },
  {
    icon: '🎮',
    title: 'Gaming & Strategy',
    description: 'Enjoy strategic games that challenge problem-solving skills and provide creative inspiration.',
    details: ['Strategy Games', 'Puzzle Solving', 'Board Games', 'Chess']
  },
  {
    icon: '🏃‍♂️',
    title: 'Fitness & Wellness',
    description: 'Maintaining physical and mental health through regular exercise and mindfulness practices.',
    details: ['Running', 'Yoga', 'Meditation', 'Hiking']
  },
  {
    icon: '🎵',
    title: 'Music & Creativity',
    description: 'Music serves as both inspiration and relaxation, enhancing focus and creativity.',
    details: ['Guitar Playing', 'Music Production', 'Concert Attendance', 'Vinyl Collection']
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    description: 'Committed to environmental consciousness and sustainable living practices.',
    details: ['Renewable Energy', 'Eco-friendly Tech', 'Urban Gardening', 'Recycling']
  }
])

const funFacts = ref<FunFact[]>([
  {
    icon: '☕',
    text: 'I can\'t start coding without my morning coffee ritual'
  },
  {
    icon: '🌙',
    text: 'My most productive coding hours are between 10 PM and 2 AM'
  },
  {
    icon: '🎯',
    text: 'I solve complex problems better while taking walks'
  },
  {
    icon: '📱',
    text: 'I have over 50 productivity and learning apps on my phone'
  },
  {
    icon: '🎨',
    text: 'I believe good code is like art - functional and beautiful'
  },
  {
    icon: '🚀',
    text: 'I dream of contributing to space technology projects someday'
  }
])
</script>

<style scoped>
.personal-interests {
  padding: 4rem 2rem;
}

.interests-container {
  max-width: 1200px;
  margin: 0 auto;
}

.interests-header {
  text-align: center;
  margin-bottom: 4rem;
}

.interests-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.interests-intro {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.interests-content {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.interests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.interest-card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  text-align: center;
}

.interest-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.interest-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.interest-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.interest-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.interest-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.detail-item {
  background: var(--primary-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.fun-facts {
  background: var(--card-bg);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid var(--border-color);
}

.fun-facts-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 2rem;
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.fact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-color);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.fact-item:hover {
  transform: translateX(5px);
  border-color: var(--primary-color);
}

.fact-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.fact-text {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.4;
}

/* Responsive Design */
@media (max-width: 768px) {
  .personal-interests {
    padding: 2rem 1rem;
  }
  
  .interests-title {
    font-size: 2rem;
  }
  
  .interests-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .interest-card {
    padding: 1.5rem;
  }
  
  .fun-facts {
    padding: 2rem;
  }
  
  .facts-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .interests-title {
    font-size: 1.8rem;
  }
  
  .interest-card {
    padding: 1rem;
  }
  
  .interest-icon {
    font-size: 2.5rem;
  }
  
  .fun-facts {
    padding: 1.5rem;
  }
  
  .fun-facts-title {
    font-size: 1.5rem;
  }
}
</style>