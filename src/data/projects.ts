// Static data for portfolio projects
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with Vue.js and Node.js. Features include user authentication, product catalog, shopping cart, payment integration, and admin dashboard.',
    technologies: ['Vue.js', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/johndoe/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.example.com',
    imageUrl: '/images/projects/ecommerce-platform.svg',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and progress tracking.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Material-UI', 'Socket.io'],
    githubUrl: 'https://github.com/johndoe/task-manager',
    liveUrl: 'https://taskmanager-demo.example.com',
    imageUrl: '/images/projects/task-manager.svg',
    featured: true
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A responsive weather dashboard that displays current weather conditions, forecasts, and weather maps. Features location-based weather data and beautiful visualizations.',
    technologies: ['Vue.js', 'JavaScript', 'OpenWeather API', 'Chart.js', 'CSS3'],
    githubUrl: 'https://github.com/johndoe/weather-dashboard',
    liveUrl: 'https://weather-dashboard-demo.example.com',
    imageUrl: '/images/projects/weather-dashboard.svg',
    featured: false
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with Vue.js and TypeScript. Features smooth animations, dark mode support, and optimized performance.',
    technologies: ['Vue.js', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP'],
    githubUrl: 'https://github.com/johndoe/portfolio-website',
    liveUrl: 'https://johndoe-portfolio.example.com',
    imageUrl: '/images/projects/portfolio-website.svg',
    featured: true
  },
  {
    id: 5,
    title: 'Blog CMS',
    description: 'A content management system for blogs with markdown support, SEO optimization, comment system, and analytics dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'NextAuth.js'],
    githubUrl: 'https://github.com/johndoe/blog-cms',
    liveUrl: 'https://blog-cms-demo.example.com',
    imageUrl: '/images/projects/blog-cms.svg',
    featured: false
  },
  {
    id: 6,
    title: 'Fitness Tracker',
    description: 'A mobile-first fitness tracking application with workout logging, progress visualization, goal setting, and social features.',
    technologies: ['React Native', 'TypeScript', 'Redux', 'SQLite', 'Chart.js'],
    githubUrl: 'https://github.com/johndoe/fitness-tracker',
    imageUrl: '/images/projects/fitness-tracker.svg',
    featured: false
  }
];

// Helper functions
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByTechnology = (technology: string): Project[] => {
  return projects.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};