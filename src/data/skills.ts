// Static data for portfolio skills
export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  icon: string;
  description: string;
}

export enum SkillCategory {
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
  DATABASE = 'Database',
  TOOLS = 'Tools & DevOps',
  MOBILE = 'Mobile',
  CRM = 'CRM'
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert'
}

export const skills: Skill[] = [
  // Frontend Skills
  {
    id: 1,
    name: "Vue.js",
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    icon: "vue",
    description: "Progressive JavaScript framework for building user interfaces",
  },
  {
    id: 2,
    name: "React",
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    icon: "react",
    description: "JavaScript library for building user interfaces",
  },
  {
    id: 3,
    name: "TypeScript",
    category: SkillCategory.FRONTEND,
    level: SkillLevel.ADVANCED,
    icon: "typescript",
    description: "Typed superset of JavaScript"
  },
  {
    id: 4,
    name: "JavaScript",
    category: SkillCategory.FRONTEND,
    level: SkillLevel.EXPERT,
    icon: "javascript",
    description: "Dynamic programming language for web development",
  },
  
  // Backend Skills
  {
    id: 5,
    name: "Python",
    category: SkillCategory.BACKEND,
    level: SkillLevel.ADVANCED,
    icon: "python",
    description: "High-level programming language"
  },
  {
    id: 6,
    name: "Java",
    category: SkillCategory.BACKEND,
    level: SkillLevel.ADVANCED,
    icon: "java",
    description: "Object-oriented programming language"
  },
  
  // Database Skills
  {
    id: 7,
    name: "PostgreSQL",
    category: SkillCategory.DATABASE,
    level: SkillLevel.INTERMEDIATE,
    icon: "postgresql",
    description: "Open source relational database"
  },
  {
    id: 11,
    name: "MySQL",
    category: SkillCategory.DATABASE,
    level: SkillLevel.INTERMEDIATE,
    icon: "mysql",
    description: "Popular open source relational database management system"
  },
  
  // Tools & DevOps
  {
    id: 8,
    name: "Git",
    category: SkillCategory.TOOLS,
    level: SkillLevel.ADVANCED,
    icon: "git",
    description: "Version control system"
  },
  {
    id: 9,
    name: "Docker",
    category: SkillCategory.TOOLS,
    level: SkillLevel.ADVANCED,
    icon: "docker",
    description: "Containerization platform"
  },
  {
    id: 10,
    name: "Salesforce",
    category: SkillCategory.CRM,
    level: SkillLevel.ADVANCED,
    icon: "salesforce",
    description: "Cloud-based CRM platform and development environment"
  },
  
  // Mobile Development
  {
    id: 12,
    name: "React Native",
    category: SkillCategory.MOBILE,
    level: SkillLevel.INTERMEDIATE,
    icon: "react",
    description: "Cross-platform mobile app development framework"
  },
  
  // Design Skills

];

// Helper functions
export const getSkillsByCategory = (category: SkillCategory): Skill[] => {
  return skills.filter(skill => skill.category === category);
};

export const getSkillsByLevel = (level: SkillLevel): Skill[] => {
  return skills.filter(skill => skill.level === level);
};

export const getSkillById = (id: number): Skill | undefined => {
  return skills.find(skill => skill.id === id);
};

export const getSkillCategories = (): SkillCategory[] => {
  return Object.values(SkillCategory);
};

export const getAdvancedSkills = (): Skill[] => {
  return skills.filter(skill => 
    skill.level === SkillLevel.ADVANCED || skill.level === SkillLevel.EXPERT
  );
};