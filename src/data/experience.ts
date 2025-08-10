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
    id: 'erie-management-2024',
    company: 'Erie Management Service',
    position: 'Junior Salesforce Developer/Administrator',
    location: 'Remote',
    startDate: '2024-09',
    endDate: null, // Current position
    description: 'Developing and customizing Salesforce solutions to manage complex business logic efficiently.',
    responsibilities: [
      'Develop and customize Apex Classes, Triggers, and Batch Jobs',
      'Design and implement Lightning Web Components (LWC)',
      'Build and optimize data models using Salesforce objects',
      'Automate workflows using Flow Builder and Process Builder',
      'Integrate Salesforce with external systems via REST and SOAP APIs'
    ],
    technologies: [
      'Salesforce',
      'Apex',
      'Lightning Web Components',
      'Flow Builder',
      'Process Builder',
      'REST API',
      'SOAP API',
      'Data Loader'
    ],
    achievements: [
      'Developed and customized Apex Classes, Triggers, and Batch Jobs to manage complex business logic efficiently',
      'Designed and implemented Lightning Web Components (LWC) to create engaging and responsive user interfaces',
      'Built and optimized data models using Salesforce objects and schema customization',
      'Streamlined business operations by automating workflows using Flow Builder, Process Builder, and Approval Processes',
      'Collaborated with cross-functional teams for successful Salesforce integrations with external systems via REST and SOAP APIs'
    ],
    type: 'full-time'
  },
  {
    id: 'aether-global-2024',
    company: 'Aether Global',
    position: 'Junior Salesforce Developer/Administrator',
    location: 'Remote',
    startDate: '2024-09',
    endDate: null,
    description: 'Streamlining business processes and enhancing operational efficiency through Salesforce development.',
    responsibilities: [
      'Develop and customize Apex Classes, Triggers, and Batch Jobs',
      'Design and implement Lightning Web Components',
      'Optimize data models through Salesforce objects customization',
      'Automate workflows using Flow Builder and Process Builder',
      'Integrate Salesforce with external systems via APIs'
    ],
    technologies: [
      'Salesforce',
      'Apex',
      'Lightning Web Components',
      'Flow Builder',
      'Process Builder',
      'REST API',
      'SOAP API',
      'Data Loader'
    ],
    achievements: [
      'Developed and customized Apex Classes, Triggers, and Batch Jobs to streamline business processes, enhancing operational efficiency by 25%',
      'Designed and implemented Lightning Web Components, providing dynamic and responsive user interfaces that improved user engagement',
      'Optimized data models through comprehensive customization of Salesforce objects and relationships',
      'Automation of workflows using Flow Builder and Process Builder, effectively reducing manual tasks by 30%',
      'Integrated Salesforce with external systems via REST and SOAP APIs to improve data accessibility and functionality'
    ],
    type: 'full-time'
  },
  {
    id: 'studevph-2023',
    company: 'StudevPH',
    position: 'Community Support',
    location: 'Remote',
    startDate: '2023-09',
    endDate: null,
    description: 'Contributing to coding communities and mentoring new developers.',
    responsibilities: [
      'Contribute solutions in coding communities and forums',
      'Mentor new members and provide career guidance',
      'Lead collaborative projects and hackathons',
      'Organize networking events and workshops',
      'Foster inclusivity in IT through study groups'
    ],
    technologies: [
      'Community Management',
      'Mentoring',
      'Project Leadership',
      'Event Organization'
    ],
    achievements: [
      'Actively contributed over 50 solutions in coding communities and forums',
      'Mentored new members, offering career advice and project guidance for internship success',
      'Led collaborative projects and hackathons, delivering innovative solutions and enhancing team development',
      'Organized networking events and workshops, connecting over 100 students with industry professionals',
      'Fostered inclusivity in IT by initiating study groups and coding circles, promoting diversity and a culture of learning'
    ],
    type: 'part-time'
  },
  {
    id: 'alphasys-2023',
    company: 'AlphaSys',
    position: 'Junior Developer',
    location: 'Philippines',
    startDate: '2023-01',
    endDate: '2024-09',
    description: 'Designed and evaluated code to enhance software features for various application requirements.',
    responsibilities: [
      'Design and evaluate code to enhance software features',
      'Resolve technical issues and develop new functionalities',
      'Collaborate with stakeholders and developers',
      'Analyze and address root causes of production issues',
      'Automate processes to boost operational effectiveness'
    ],
    technologies: [
      'Salesforce',
      'REST API',
      'SOAP API',
      'Software Development',
      'Problem Solving'
    ],
    achievements: [
      'Designed and evaluated code to enhance software features for various application requirements',
      'Resolved technical issues, aiding in the development of new features and functionalities',
      'Collaborated closely with stakeholders and developers to translate requirements into effective code solutions',
      'Analyzed and addressed root causes of production issues, improving operational stability',
      'Automated processes to boost operational effectiveness by integrating Salesforce with external systems via REST/SOAP APIs'
    ],
    type: 'full-time'
  },
  {
    id: 'ustp-2022',
    company: 'USTP',
    position: 'Java Application Developer',
    location: 'Philippines',
    startDate: '2022-05',
    endDate: '2022-06',
    description: 'Spearheaded the development and enhancement of software applications using Java.',
    responsibilities: [
      'Develop and enhance software applications',
      'Resolve code errors for seamless functionality',
      'Compose comprehensive documentation',
      'Tackle technical issues and optimize performance',
      'Collaborate with senior developers on Java solutions'
    ],
    technologies: [
      'Java',
      'Software Development',
      'Documentation',
      'Performance Optimization'
    ],
    achievements: [
      'Spearheaded the development and enhancement of software applications, increasing efficiency by 15% through innovative coding practices',
      'Resolved code errors efficiently to ensure seamless application functionality',
      'Composed comprehensive documentation, maintaining full compliance with quality standards',
      'Tackled various technical issues, reducing development delays and optimizing performance',
      'Enhanced software performance significantly, boosting functionality efficiency by 20%'
    ],
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