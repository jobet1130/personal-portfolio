export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string | null // null for current position
  description: string
  responsibilities: string[]
  technologies: string[]
  achievements: string[]
  companyLogo?: string
  companyWebsite?: string
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship'
}

export const experiences: Experience[] = [
  {
    id: 'senior-frontend-developer-2023',
    company: 'TechCorp Solutions',
    position: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    startDate: '2023-01',
    endDate: null, // Current position
    description: 'Leading frontend development initiatives and mentoring junior developers in a fast-paced startup environment.',
    responsibilities: [
      'Lead development of customer-facing web applications',
      'Architect and implement scalable frontend solutions',
      'Mentor junior developers and conduct code reviews',
      'Collaborate with design and backend teams',
      'Optimize application performance and user experience'
    ],
    technologies: [
      'Vue.js 3',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'GraphQL',
      'Docker',
      'AWS'
    ],
    achievements: [
      'Improved application load time by 40%',
      'Led migration from Vue 2 to Vue 3',
      'Implemented comprehensive testing strategy',
      'Reduced bug reports by 60%'
    ],
    companyWebsite: 'https://techcorp.example.com',
    type: 'full-time'
  },
  {
    id: 'frontend-developer-2021',
    company: 'Digital Innovations Inc.',
    position: 'Frontend Developer',
    location: 'Remote',
    startDate: '2021-06',
    endDate: '2022-12',
    description: 'Developed and maintained multiple client projects using modern JavaScript frameworks.',
    responsibilities: [
      'Build responsive web applications',
      'Implement pixel-perfect designs',
      'Integrate with RESTful APIs',
      'Write unit and integration tests',
      'Participate in agile development process'
    ],
    technologies: [
      'React',
      'Vue.js',
      'JavaScript',
      'SASS',
      'Webpack',
      'Jest',
      'Cypress',
      'Git'
    ],
    achievements: [
      'Delivered 15+ client projects on time',
      'Implemented automated testing pipeline',
      'Improved code quality standards',
      'Mentored 2 junior developers'
    ],
    companyWebsite: 'https://digitalinnovations.example.com',
    type: 'full-time'
  },
  {
    id: 'junior-developer-2020',
    company: 'StartupXYZ',
    position: 'Junior Web Developer',
    location: 'New York, NY',
    startDate: '2020-03',
    endDate: '2021-05',
    description: 'Started my professional journey building web applications and learning industry best practices.',
    responsibilities: [
      'Develop frontend components',
      'Fix bugs and implement features',
      'Collaborate with senior developers',
      'Write documentation',
      'Participate in daily standups'
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'jQuery',
      'Bootstrap',
      'PHP',
      'MySQL',
      'Git'
    ],
    achievements: [
      'Successfully completed onboarding program',
      'Contributed to 5 major feature releases',
      'Improved page load speeds by 25%',
      'Received "Rising Star" award'
    ],
    companyWebsite: 'https://startupxyz.example.com',
    type: 'full-time'
  },
  {
    id: 'freelance-developer-2019',
    company: 'Freelance',
    position: 'Web Developer',
    location: 'Remote',
    startDate: '2019-01',
    endDate: '2020-02',
    description: 'Provided web development services to small businesses and startups.',
    responsibilities: [
      'Build custom websites for clients',
      'Maintain existing web applications',
      'Provide technical consultation',
      'Manage client relationships',
      'Handle project timelines and deliverables'
    ],
    technologies: [
      'WordPress',
      'HTML5',
      'CSS3',
      'JavaScript',
      'PHP',
      'MySQL',
      'Photoshop'
    ],
    achievements: [
      'Completed 20+ client projects',
      'Maintained 98% client satisfaction rate',
      'Built long-term client relationships',
      'Developed project management skills'
    ],
    type: 'freelance'
  },
  {
    id: 'intern-developer-2018',
    company: 'WebTech Agency',
    position: 'Web Development Intern',
    location: 'Los Angeles, CA',
    startDate: '2018-06',
    endDate: '2018-12',
    description: 'Gained hands-on experience in web development while completing my studies.',
    responsibilities: [
      'Assist senior developers with projects',
      'Learn web development best practices',
      'Create simple web pages and components',
      'Test websites across different browsers',
      'Document development processes'
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'jQuery',
      'Git',
      'Adobe Creative Suite'
    ],
    achievements: [
      'Completed 6-month internship program',
      'Contributed to 3 client projects',
      'Learned version control with Git',
      'Received offer for full-time position'
    ],
    companyWebsite: 'https://webtechagency.example.com',
    type: 'internship'
  }
]

export const getCurrentExperience = (): Experience | undefined => {
  return experiences.find(exp => exp.endDate === null)
}

export const getExperienceByCompany = (company: string): Experience[] => {
  return experiences.filter(exp => exp.company.toLowerCase().includes(company.toLowerCase()))
}

export const getExperienceByType = (type: Experience['type']): Experience[] => {
  return experiences.filter(exp => exp.type === type)
}

export const getTotalYearsOfExperience = (): number => {
  const startYear = 2018 // First professional experience
  const currentYear = new Date().getFullYear()
  return currentYear - startYear
}

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find(exp => exp.id === id)
}

export default experiences