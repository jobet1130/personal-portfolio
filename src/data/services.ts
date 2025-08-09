export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  pricing?: {
    basic?: number
    premium?: number
    enterprise?: number
  }
}

export const services: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and best practices.',
    icon: 'code',
    features: [
      'Responsive Design',
      'Modern Frameworks (Vue.js, React)',
      'Performance Optimization',
      'SEO Friendly',
      'Cross-browser Compatibility'
    ],
    pricing: {
      basic: 1500,
      premium: 3000,
      enterprise: 5000
    }
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android.',
    icon: 'smartphone',
    features: [
      'Native iOS & Android',
      'Cross-platform Solutions',
      'App Store Optimization',
      'Push Notifications',
      'Offline Functionality'
    ],
    pricing: {
      basic: 2500,
      premium: 5000,
      enterprise: 8000
    }
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'User-centered design solutions that enhance user experience and engagement.',
    icon: 'palette',
    features: [
      'User Research',
      'Wireframing & Prototyping',
      'Visual Design',
      'Usability Testing',
      'Design Systems'
    ],
    pricing: {
      basic: 1000,
      premium: 2000,
      enterprise: 3500
    }
  },
  {
    id: 'consulting',
    title: 'Technical Consulting',
    description: 'Strategic technology guidance and architecture planning for your projects.',
    icon: 'lightbulb',
    features: [
      'Technology Stack Selection',
      'Architecture Planning',
      'Code Review',
      'Performance Audits',
      'Team Training'
    ],
    pricing: {
      basic: 150,
      premium: 250,
      enterprise: 400
    }
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Support',
    description: 'Ongoing support and maintenance to keep your applications running smoothly.',
    icon: 'settings',
    features: [
      'Bug Fixes',
      'Security Updates',
      'Performance Monitoring',
      'Feature Enhancements',
      '24/7 Support'
    ],
    pricing: {
      basic: 500,
      premium: 1000,
      enterprise: 2000
    }
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms with payment integration and inventory management.',
    icon: 'shopping-cart',
    features: [
      'Payment Gateway Integration',
      'Inventory Management',
      'Order Processing',
      'Customer Management',
      'Analytics & Reporting'
    ],
    pricing: {
      basic: 3000,
      premium: 6000,
      enterprise: 10000
    }
  }
]

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id)
}

export const getServicesByCategory = (category: string): Service[] => {
  // This could be extended to filter by categories if needed
  return services
}

export default services