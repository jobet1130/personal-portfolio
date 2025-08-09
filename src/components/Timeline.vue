<template>
  <section class="timeline">
    <div class="timeline-container">
      <div class="timeline-header">
        <h2 class="timeline-title">My Journey</h2>
        <p class="timeline-intro">A timeline of my professional and educational milestones</p>
      </div>
      
      <div class="timeline-content">
        <div class="timeline-item" v-for="(item, index) in timelineData" :key="index">
          <div class="timeline-marker">
            <div class="timeline-icon">{{ item.icon }}</div>
          </div>
          <div class="timeline-card">
            <div class="timeline-date">{{ item.date }}</div>
            <h3 class="timeline-title-item">{{ item.title }}</h3>
            <h4 class="timeline-company">{{ item.company }}</h4>
            <p class="timeline-description">{{ item.description }}</p>
            <div class="timeline-skills" v-if="item.skills">
              <span class="skill-tag" v-for="skill in item.skills" :key="skill">{{ skill }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface TimelineItem {
  date: string
  title: string
  company: string
  description: string
  icon: string
  skills?: string[]
}

const timelineData = ref<TimelineItem[]>([
  {
    date: '2024 - Present',
    title: 'Junior Salesforce Administrator',
    company: 'Erietech',
    description: 'Currently working as a Junior Salesforce Administrator, managing user access, configuring workflows, and maintaining data integrity on the Salesforce platform.',
    icon: '🔧',
    skills: ['Salesforce Administration', 'User Management', 'Workflow Configuration', 'Data Management']
  },
  {
    date: '2024',
    title: 'Junior Salesforce Developer',
    company: 'Aether Global',
    description: 'Worked as a Junior Salesforce Developer, developing custom solutions and implementing business processes on the Salesforce platform.',
    icon: '⚡',
    skills: ['Salesforce Development', 'Apex', 'Lightning Web Components', 'Salesforce Administration']
  },
  {
    date: '2023 - 2024',
    title: 'Junior Developer',
    company: 'AlphaSys Pty Ltd',
    description: 'Started my professional development career, gaining hands-on experience in software development and working on various projects for 1 year and 9 months.',
    icon: '👨‍💼',
    skills: ['Software Development', 'Programming', 'Problem Solving', 'Team Collaboration']
  },
  {
    date: '2023 - Present',
    title: 'Community Support (Part-time)',
    company: 'StudevPH',
    description: 'Providing community support and assistance to members, helping with technical questions and fostering a collaborative learning environment.',
    icon: '🤝',
    skills: ['Community Management', 'Customer Support', 'Communication', 'Technical Assistance']
  },
  {
    date: 'May - July 2022',
    title: 'Java Application Developer Intern',
    company: 'USTP - Panaon Campus',
    description: 'Completed a 3-month internship developing Java applications and gaining hands-on experience in software development.',
    icon: '💻',
    skills: ['Java', 'Application Development', 'Software Engineering', 'Problem Solving']
  },
  {
    date: '2018 - 2022',
    title: 'Bachelor of Science in Information Technology',
    company: 'University of Science and Technology of Southern Philippines - Panaon Campus',
    description: 'Focused on software development, database management, and system architecture.',
    icon: '🎓',
    skills: ['Java', 'Database Design', 'Software Engineering', 'System Architecture']
  }
])
</script>

<style scoped>
.timeline {
  padding: 4rem 2rem;
  background: var(--bg-color);
}

.timeline-container {
  max-width: 1000px;
  margin: 0 auto;
}

.timeline-header {
  text-align: center;
  margin-bottom: 4rem;
}

.timeline-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 1rem;
}

.timeline-intro {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.timeline-content {
  position: relative;
}

.timeline-content::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--primary-color);
  opacity: 0.3;
}

.timeline-item {
  display: flex;
  margin-bottom: 3rem;
  position: relative;
}

.timeline-marker {
  flex-shrink: 0;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 1rem;
}

.timeline-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  position: relative;
  z-index: 2;
}

.timeline-card {
  flex: 1;
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin-left: 2rem;
  transition: all 0.3s ease;
}

.timeline-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.timeline-date {
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timeline-title-item {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.timeline-company {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-weight: 500;
}

.timeline-description {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.timeline-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: var(--primary-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 768px) {
  .timeline {
    padding: 2rem 1rem;
  }
  
  .timeline-title {
    font-size: 2rem;
  }
  
  .timeline-content::before {
    left: 20px;
  }
  
  .timeline-marker {
    width: 40px;
  }
  
  .timeline-icon {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
  
  .timeline-card {
    margin-left: 1rem;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .timeline-title {
    font-size: 1.8rem;
  }
  
  .timeline-card {
    padding: 1rem;
  }
  
  .timeline-title-item {
    font-size: 1.1rem;
  }
}
</style>