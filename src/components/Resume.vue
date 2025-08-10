<template>
  <div class="resume">
    <div class="container">
      <!-- Resume Header -->
      <div class="resume-header">
        <div class="profile-section">
          <div class="profile-image">
            <img src="/images/profile.jpg" alt="Profile" class="profile-img" />
          </div>
          <div class="profile-info">
            <h1 class="name">{{ personalInfo.name }}</h1>
            <h2 class="title">{{ personalInfo.title }}</h2>
            <p class="summary">{{ personalInfo.summary }}</p>
          </div>
        </div>

        <div class="contact-info">
          <div class="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <polyline
                points="22,6 12,13 2,6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>{{ personalInfo.email }}</span>
          </div>
          <div class="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </svg>
            <span>{{ personalInfo.phone }}</span>
          </div>
          <div class="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <circle
                cx="12"
                cy="10"
                r="3"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </svg>
            <span>{{ personalInfo.location }}</span>
          </div>
          <div class="contact-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <rect
                x="2"
                y="9"
                width="4"
                height="12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <circle
                cx="4"
                cy="4"
                r="2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </svg>
            <a :href="personalInfo.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <!-- Resume Content -->
      <div class="resume-content">
        <!-- Experience Section -->
        <section class="resume-section">
          <h3 class="section-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect
                x="2"
                y="3"
                width="20"
                height="14"
                rx="2"
                ry="2"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
              />
              <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2" />
              <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2" />
            </svg>
            Professional Experience
          </h3>
          <div class="timeline">
            <div v-for="job in experience" :key="job.id" class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <div class="job-header">
                  <h4 class="job-title">{{ job.position }}</h4>
                  <span class="job-period"
                    >{{ job.startDate }} - {{ job.endDate || 'Present' }}</span
                  >
                </div>
                <div class="job-company">
                  <strong>{{ job.company }}</strong>
                  <span class="job-location">{{ job.location }}</span>
                </div>
                <p class="job-description">{{ job.description }}</p>
                <ul class="job-achievements">
                  <li v-for="achievement in job.achievements" :key="achievement">
                    {{ achievement }}
                  </li>
                </ul>
                <div class="job-technologies">
                  <span v-for="tech in job.technologies" :key="tech" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Education Section -->
        <section class="resume-section">
          <h3 class="section-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M22 10v6M2 10l10-5 10 5-10 5z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <path
                d="M6 12v5c3 3 9 3 12 0v-5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </svg>
            Education
          </h3>
          <div class="education-list">
            <div v-for="edu in education" :key="edu.id" class="education-item">
              <div class="education-header">
                <h4 class="education-degree">{{ edu.degree }}</h4>
                <span class="education-period">{{ edu.startDate }} - {{ edu.endDate }}</span>
              </div>
              <div class="education-school">
                <strong>{{ edu.institution }}</strong>
                <span class="education-location">{{ edu.location }}</span>
              </div>
              <p v-if="edu.description" class="education-description">{{ edu.description }}</p>
              <div v-if="edu.achievements" class="education-achievements">
                <ul>
                  <li v-for="achievement in edu.achievements" :key="achievement">
                    {{ achievement }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section class="resume-section">
          <h3 class="section-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon
                points="12,2 2,7 12,12 22,7 12,2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <polyline
                points="2,17 12,22 22,17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
              <polyline
                points="2,12 12,17 22,12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                fill="none"
              />
            </svg>
            Technical Skills
          </h3>
          <div class="skills-grid">
            <div
              v-for="skillCategory in skills"
              :key="skillCategory.category"
              class="skill-category"
            >
              <h4 class="skill-category-title">{{ skillCategory.category }}</h4>
              <div class="skill-items">
                <div v-for="skill in skillCategory.items" :key="skill.name" class="skill-item">
                  <div class="skill-info">
                    <span class="skill-name">{{ skill.name }}</span>
                    <span class="skill-level">{{ skill.level }}%</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Download Button -->
      <div class="resume-actions">
        <button class="download-btn" @click="downloadResume">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
            <polyline
              points="7,10 12,15 17,10"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
            <line
              x1="12"
              y1="15"
              x2="12"
              y2="3"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Download PDF Resume
        </button>
        <button class="print-btn" @click="printResume">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <polyline
              points="6,9 6,2 18,2 18,9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
            <path
              d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
            <rect
              x="6"
              y="14"
              width="12"
              height="8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
            />
          </svg>
          Print Resume
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Personal Information
const personalInfo = ref({
  name: 'Jobet Casquejo',
  title: 'Junior Salesforce Developer/Administrator',
  summary:
    'Salesforce Engineer with 2+ years of experience in enhancing user interfaces and business processes through customized Apex classes and Lightning Web Components (LWC). Skilled in integrating Salesforce with external systems to boost operational efficiency. Proficient in workflow automation and experienced in collaborating with cross-functional teams to deliver seamless solutions. Passionate about driving technological innovation for a forward-thinking company.',
  email: 'jobetcasquejo221@gmail.com',
  phone: '+639817153118',
  location: 'Misamis Occidental, Philippines',
  linkedin: 'https://www.linkedin.com/in/jobet-casquejo-921840232/',
})

// Professional Experience
const experience = ref([
  {
    id: 1,
    position: 'Junior Salesforce Developer/Administrator',
    company: 'Erie Management Service',
    location: 'Remote',
    startDate: 'Sep 2024',
    endDate: null,
    description: 'Developing and customizing Salesforce solutions to manage complex business logic efficiently.',
    achievements: [
      'Developed and customized Apex Classes, Triggers, and Batch Jobs to manage complex business logic efficiently',
      'Designed and implemented Lightning Web Components (LWC) to create engaging and responsive user interfaces',
      'Built and optimized data models using Salesforce objects and schema customization',
      'Streamlined business operations by automating workflows using Flow Builder, Process Builder, and Approval Processes',
      'Collaborated with cross-functional teams for successful Salesforce integrations with external systems via REST and SOAP APIs',
      'Customized user experiences through tailored page layouts, record types, and custom fields',
      'Conducted data migration and transformation using Data Loader and Salesforce Import Wizard',
      'Performed unit testing and debugging of Apex code to ensure optimal performance and reliability',
      'Maintained security by configuring necessary profiles, roles, sharing rules, and field-level settings',
      'Provided comprehensive support and training to end-users, along with creating technical documentation'
    ],
    technologies: ['Salesforce', 'Apex', 'Lightning Web Components', 'Flow Builder', 'Process Builder', 'REST API', 'SOAP API', 'Data Loader']
  },
  {
    id: 2,
    position: 'Junior Salesforce Developer/Administrator',
    company: 'Aether Global',
    location: 'Remote',
    startDate: 'Sep 2024',
    endDate: null,
    description: 'Streamlining business processes and enhancing operational efficiency through Salesforce development.',
    achievements: [
      'Developed and customized Apex Classes, Triggers, and Batch Jobs to streamline business processes, enhancing operational efficiency by 25%',
      'Designed and implemented Lightning Web Components, providing dynamic and responsive user interfaces that improved user engagement',
      'Optimized data models through comprehensive customization of Salesforce objects and relationships',
      'Automation of workflows using Flow Builder and Process Builder, effectively reducing manual tasks by 30%',
      'Integrated Salesforce with external systems via REST and SOAP APIs to improve data accessibility and functionality',
      'Enhanced user experiences by customizing layouts and record types tailored to specific needs',
      'Conducted extensive data migration using Data Loader and Salesforce Import Wizard',
      'Performed meticulous unit testing, ensuring code reliability and high performance',
      'Configured security roles and profiles to maintain data integrity',
      'Trained and supported end-users by offering solutions and creating detailed technical documentation'
    ],
    technologies: ['Salesforce', 'Apex', 'Lightning Web Components', 'Flow Builder', 'Process Builder', 'REST API', 'SOAP API', 'Data Loader']
  },
  {
    id: 3,
    position: 'Community Support',
    company: 'StudevPH',
    location: 'Remote',
    startDate: 'Sep 2023',
    endDate: null,
    description: 'Contributing to coding communities and mentoring new developers.',
    achievements: [
      'Actively contributed over 50 solutions in coding communities and forums',
      'Mentored new members, offering career advice and project guidance for internship success',
      'Led collaborative projects and hackathons, delivering innovative solutions and enhancing team development',
      'Organized networking events and workshops, connecting over 100 students with industry professionals',
      'Fostered inclusivity in IT by initiating study groups and coding circles, promoting diversity and a culture of learning'
    ],
    technologies: ['Community Management', 'Mentoring', 'Project Leadership', 'Event Organization']
  },
  {
    id: 4,
    position: 'Junior Developer',
    company: 'AlphaSys',
    location: 'Philippines',
    startDate: 'Jan 2023',
    endDate: 'Sep 2024',
    description: 'Designed and evaluated code to enhance software features for various application requirements.',
    achievements: [
      'Designed and evaluated code to enhance software features for various application requirements',
      'Resolved technical issues, aiding in the development of new features and functionalities',
      'Collaborated closely with stakeholders and developers to translate requirements into effective code solutions',
      'Analyzed and addressed root causes of production issues, improving operational stability',
      'Automated processes to boost operational effectiveness by integrating Salesforce with external systems via REST/SOAP APIs',
      'Pursued continuous learning and adaptation to new technologies, enhancing team collaboration and technical proficiency',
      'Supported team objectives by leveraging advanced problem-solving skills to drive software development goals'
    ],
    technologies: ['Salesforce', 'REST API', 'SOAP API', 'Software Development', 'Problem Solving']
  },
  {
    id: 5,
    position: 'Java Application Developer',
    company: 'USTP',
    location: 'Philippines',
    startDate: 'May 2022',
    endDate: 'Jun 2022',
    description: 'Spearheaded the development and enhancement of software applications using Java.',
    achievements: [
      'Spearheaded the development and enhancement of software applications, increasing efficiency by 15% through innovative coding practices',
      'Resolved code errors efficiently to ensure seamless application functionality',
      'Composed comprehensive documentation, maintaining full compliance with quality standards',
      'Tackled various technical issues, reducing development delays and optimizing performance',
      'Collaborated effectively with senior developers to integrate Java solutions into software and websites',
      'Enhanced software performance significantly, boosting functionality efficiency by 20%',
      'Updated knowledge of emerging Java technologies to sustain competitive advantage and foster innovation'
    ],
    technologies: ['Java', 'Software Development', 'Documentation', 'Performance Optimization']
  }
])

// Education
const education = ref([
  {
    id: 1,
    degree: 'Bachelor\'s Degree',
    institution: 'University of Science and Technology of Southern Philippines',
    location: 'Philippines',
    startDate: 'Jun 2018',
    endDate: 'Sep 2022',
    description: 'Completed Bachelor\'s degree with focus on technology and engineering principles',
    achievements: []
  }
])

// Skills
const skills = ref([
  {
    category: 'Salesforce',
    items: [
      { name: 'Salesforce', level: 95 },
      { name: 'Apex', level: 90 },
      { name: 'Lightning Web Components', level: 90 },
      { name: 'Flow Builder', level: 85 },
      { name: 'Process Builder', level: 85 },
      { name: 'CRM', level: 90 }
    ]
  },
  {
    category: 'Programming Languages',
    items: [
      { name: 'Java', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'C++', level: 80 },
      { name: 'Kotlin', level: 75 },
      { name: 'SQL', level: 85 }
    ]
  },
  {
    category: 'Development Tools',
    items: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 80 },
      { name: 'REST API', level: 85 },
      { name: 'SOAP API', level: 80 },
      { name: 'Data Loader', level: 85 },
      { name: 'MySQL', level: 80 }
    ]
  },
  {
    category: 'Soft Skills',
    items: [
      { name: 'Teamwork', level: 95 },
      { name: 'Problem Solving', level: 90 },
      { name: 'Communication', level: 85 },
      { name: 'Leadership', level: 80 },
      { name: 'Mentoring', level: 85 }
    ]
  }
])

// Methods
const downloadResume = () => {
  // Implement PDF download functionality
  window.print()
}

const printResume = () => {
  window.print()
}
</script>

<style scoped>
.resume {
  min-height: 100vh;
  padding: 2rem 0;
  background: var(--bg-color, #ffffff);
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Resume Header */
.resume-header {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: var(--card-bg, #f9fafb);
  border-radius: 16px;
  border: 1px solid var(--border-color, #e5e7eb);
}

.profile-section {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.profile-image {
  flex-shrink: 0;
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--primary-color, #3b82f6);
}

.profile-info {
  flex: 1;
}

.name {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color, #1f2937);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color, #3b82f6);
  margin: 0 0 1rem 0;
}

.summary {
  color: var(--text-secondary, #6b7280);
  line-height: 1.6;
  margin: 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary, #6b7280);
  font-size: 0.95rem;
}

.contact-item svg {
  color: var(--primary-color, #3b82f6);
  flex-shrink: 0;
}

.contact-item a {
  color: var(--primary-color, #3b82f6);
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-item a:hover {
  color: var(--primary-hover, #2563eb);
}

/* Resume Content */
.resume-content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.resume-section {
  background: var(--card-bg, #ffffff);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border-color, #e5e7eb);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color, #1f2937);
  margin: 0 0 2rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-color, #e5e7eb);
}

.section-title svg {
  color: var(--primary-color, #3b82f6);
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-color, #e5e7eb);
}

.timeline-item {
  position: relative;
  margin-bottom: 2.5rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -1.75rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  background: var(--primary-color, #3b82f6);
  border-radius: 50%;
  border: 3px solid var(--card-bg, #ffffff);
  box-shadow: 0 0 0 2px var(--border-color, #e5e7eb);
}

.timeline-content {
  background: var(--card-bg, #f9fafb);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color, #e5e7eb);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.job-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color, #1f2937);
  margin: 0;
}

.job-period {
  font-size: 0.875rem;
  color: var(--primary-color, #3b82f6);
  font-weight: 600;
  white-space: nowrap;
}

.job-company {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.job-company strong {
  color: var(--text-color, #1f2937);
}

.job-location {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

.job-description {
  color: var(--text-secondary, #6b7280);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.job-achievements {
  margin: 0 0 1.5rem 0;
  padding-left: 1.5rem;
}

.job-achievements li {
  color: var(--text-secondary, #6b7280);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.job-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: var(--primary-color, #3b82f6);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Education */
.education-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.education-item {
  background: var(--card-bg, #f9fafb);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color, #e5e7eb);
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.education-degree {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color, #1f2937);
  margin: 0;
}

.education-period {
  font-size: 0.875rem;
  color: var(--primary-color, #3b82f6);
  font-weight: 600;
  white-space: nowrap;
}

.education-school {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.education-school strong {
  color: var(--text-color, #1f2937);
}

.education-location {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
}

.education-description {
  color: var(--text-secondary, #6b7280);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.education-achievements ul {
  margin: 0;
  padding-left: 1.5rem;
}

.education-achievements li {
  color: var(--text-secondary, #6b7280);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: var(--card-bg, #f9fafb);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color, #e5e7eb);
}

.skill-category-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-color, #1f2937);
  margin: 0 0 1.5rem 0;
}

.skill-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-weight: 500;
  color: var(--text-color, #1f2937);
}

.skill-level {
  font-size: 0.875rem;
  color: var(--text-secondary, #6b7280);
  font-weight: 600;
}

.skill-bar {
  height: 8px;
  background: var(--border-color, #e5e7eb);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--primary-color, #3b82f6),
    var(--secondary-color, #8b5cf6)
  );
  border-radius: 4px;
  transition: width 0.3s ease;
}

/* Resume Actions */
.resume-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color, #e5e7eb);
}

.download-btn,
.print-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.download-btn {
  background: var(--primary-color, #3b82f6);
  color: white;
}

.download-btn:hover {
  background: var(--primary-hover, #2563eb);
  transform: translateY(-2px);
}

.print-btn {
  background: transparent;
  color: var(--text-color, #1f2937);
  border: 1px solid var(--border-color, #e5e7eb);
}

.print-btn:hover {
  background: var(--card-bg, #f9fafb);
  border-color: var(--primary-color, #3b82f6);
  color: var(--primary-color, #3b82f6);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .resume {
    --bg-color: #111827;
    --card-bg: #1f2937;
    --border-color: #374151;
    --text-color: #f9fafb;
    --text-secondary: #9ca3af;
    --primary-color: #60a5fa;
    --primary-hover: #3b82f6;
    --secondary-color: #a78bfa;
  }
}

/* Print styles */
@media print {
  @page {
    margin: 0.3in;
    size: letter;
  }

  * {
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
    box-sizing: border-box;
  }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    height: auto !important;
  }

  /* Hide all navigation and layout elements during print */
  .header,
  .footer,
  .nav,
  .navbar,
  .navigation,
  nav,
  header,
  footer,
  .layout > .header,
  .layout > .footer,
  .layout > nav,
  .brand-text,
  .nav-brand,
  .nav-links,
  .mobile-menu-toggle {
    display: none !important;
    visibility: hidden !important;
  }

  /* Hide any element containing 'Portfolio' text */
  *:contains('Portfolio') {
    display: none !important;
  }

  /* Ensure main content starts at top */
  .main-content,
  .layout .main-content {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  /* Ensure only resume content is visible */
  body * {
    visibility: hidden;
  }

  .resume,
  .resume * {
    visibility: visible !important;
  }

  .resume {
    background: white !important;
    color: black !important;
    font-size: 12px;
    line-height: 1.4;
    margin: 0 !important;
    padding: 0 !important;
  }

  .container {
    max-width: none !important;
    padding: 0.3in !important;
    margin: 0 !important;
    width: 100% !important;
  }

  .resume-header {
    margin-bottom: 0.2in !important;
    margin-top: 0 !important;
    page-break-after: avoid;
    padding-top: 0 !important;
  }

  .profile-section {
    margin-bottom: 0.2in;
  }

  .name {
    font-size: 24px !important;
    margin-bottom: 0.1in;
  }

  .title {
    font-size: 16px !important;
    margin-bottom: 0.1in;
  }

  .summary {
    font-size: 11px;
    line-height: 1.3;
    margin-bottom: 0.15in;
  }

  .contact-info {
    font-size: 10px;
  }

  .contact-item {
    margin-bottom: 0.05in;
  }

  .contact-item svg {
    width: 12px;
    height: 12px;
  }

  .resume-actions {
    display: none !important;
  }

  .resume-content {
    gap: 0.15in !important;
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  .resume-section {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 0.25in;
    padding: 0.15in;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .section-title {
    font-size: 14px !important;
    margin-bottom: 0.15in;
    padding-bottom: 0.05in;
    border-bottom: 1px solid #333;
  }

  .section-title svg {
    width: 16px;
    height: 16px;
  }

  .timeline {
    padding-left: 0.2in;
  }

  .timeline::before {
    left: 0.1in;
  }

  .timeline-item {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 0.2in;
  }

  .timeline-marker {
    left: -0.15in;
    width: 8px;
    height: 8px;
    top: 0.05in;
  }

  .timeline-content {
    padding: 0.1in;
    border: 1px solid #ddd;
  }

  .job-header {
    margin-bottom: 0.05in;
  }

  .job-title {
    font-size: 13px !important;
  }

  .job-period {
    font-size: 10px;
  }

  .job-company {
    margin-bottom: 0.08in;
    font-size: 11px;
  }

  .job-description {
    font-size: 10px;
    margin-bottom: 0.08in;
  }

  .job-achievements {
    margin-bottom: 0.1in;
    font-size: 10px;
  }

  .job-achievements li {
    margin-bottom: 0.02in;
  }

  .job-technologies {
    gap: 0.05in;
  }

  .tech-tag {
    font-size: 8px;
    padding: 0.02in 0.05in;
    background: #f0f0f0 !important;
    color: #333 !important;
    border: 1px solid #ccc;
  }

  .education-item {
    break-inside: avoid;
    page-break-inside: avoid;
    padding: 0.1in;
    margin-bottom: 0.15in;
    border: 1px solid #ddd;
  }

  .education-header {
    margin-bottom: 0.05in;
  }

  .education-degree {
    font-size: 12px !important;
  }

  .education-period {
    font-size: 10px;
  }

  .education-school {
    font-size: 11px;
    margin-bottom: 0.05in;
  }

  .education-description {
    font-size: 10px;
  }

  .skills-grid {
    grid-template-columns: 1fr 1fr;
    gap: 0.15in;
  }

  .skill-category {
    break-inside: avoid;
    page-break-inside: avoid;
    margin-bottom: 0.15in;
  }

  .skill-category-title {
    font-size: 12px !important;
    margin-bottom: 0.08in;
  }

  .skill-item {
    margin-bottom: 0.05in;
  }

  .skill-name {
    font-size: 10px;
  }

  .skill-level {
    font-size: 9px;
  }

  .skill-bar {
    height: 4px;
  }

  .skill-progress {
    background: #333 !important;
  }

  /* Ensure proper page breaks */
  .resume-section:first-child {
    page-break-before: avoid;
  }

  .timeline-item:last-child {
    margin-bottom: 0;
  }

  /* Hide any decorative elements that don't print well */
  .profile-img {
    max-width: 1in;
    max-height: 1in;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .resume-header {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .profile-section {
    flex-direction: column;
    text-align: center;
  }

  .name {
    font-size: 2rem;
  }

  .job-header,
  .education-header,
  .certification-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .job-company,
  .education-school {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .resume-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .resume {
    padding: 1rem 0;
  }

  .resume-section {
    padding: 1.5rem;
  }

  .timeline {
    padding-left: 1.5rem;
  }

  .timeline-marker {
    left: -1.5rem;
  }

  .name {
    font-size: 1.75rem;
  }

  .section-title {
    font-size: 1.25rem;
  }
}
</style>
