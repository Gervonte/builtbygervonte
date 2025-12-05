import { Education, Experience, PortfolioData, Project, Technology } from '@/lib/schemas';

// Sample technologies
export const sampleTechnologies: Technology[] = [
  {
    name: 'React',
    category: 'frontend',
    level: 'expert',
    yearsOfExperience: 4,
    icon: 'react',
    color: '#61DAFB',
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    level: 'advanced',
    yearsOfExperience: 3,
    icon: 'typescript',
    color: '#3178C6',
  },
  {
    name: 'Next.js',
    category: 'frontend',
    level: 'advanced',
    yearsOfExperience: 3,
    icon: 'nextjs',
    color: '#000000',
  },
  {
    name: 'Node.js',
    category: 'backend',
    level: 'advanced',
    yearsOfExperience: 4,
    icon: 'nodejs',
    color: '#339933',
  },
  {
    name: 'Python',
    category: 'backend',
    level: 'intermediate',
    yearsOfExperience: 2,
    icon: 'python',
    color: '#3776AB',
  },
  {
    name: 'PostgreSQL',
    category: 'database',
    level: 'intermediate',
    yearsOfExperience: 2,
    icon: 'postgresql',
    color: '#336791',
  },
  {
    name: 'Docker',
    category: 'devops',
    level: 'intermediate',
    yearsOfExperience: 2,
    icon: 'docker',
    color: '#2496ED',
  },
  {
    name: 'AWS',
    category: 'devops',
    level: 'beginner',
    yearsOfExperience: 1,
    icon: 'aws',
    color: '#FF9900',
  },
];

// Sample projects
export const sampleProjects: Project[] = [
  {
    id: 'portfolio-ai',
    title: 'AI-Assisted Portfolio Website',
    description:
      'Modern portfolio website built with Next.js, TypeScript, and AI assistance, featuring sakura animations and responsive design.',
    longDescription:
      'A comprehensive portfolio website showcasing both AI-assisted and traditional development work. Built with Next.js 14, TypeScript, and Mantine UI, featuring beautiful sakura petal animations inspired by mono no aware aesthetics. The site includes responsive design, smooth scrolling navigation, and optimized performance.',
    type: 'vibe-coded',
    technologies: [
      sampleTechnologies[0], // React
      sampleTechnologies[1], // TypeScript
      sampleTechnologies[2], // Next.js
    ],
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
    ],
    liveUrl: 'https://portfolio-67q0nnn1i-gervontes-projects.vercel.app',
    githubUrl: 'https://github.com/yourusername/portfolio-ai',
    featured: true,
    completedAt: new Date('2024-01-15'),
    status: 'live',
    tags: ['portfolio', 'nextjs', 'typescript', 'ai-assisted'],
    highlights: [
      'Implemented sakura petal animations with custom sakura.js integration',
      'Created responsive design with Mantine UI components',
      'Set up comprehensive TypeScript validation schemas',
      'Deployed with Vercel with CI/CD pipeline',
    ],
    challenges: [
      'Integrating sakura.js library with Next.js SSR',
      'Creating smooth animations without performance impact',
      'Implementing proper TypeScript types for external libraries',
    ],
    solutions: [
      'Created custom sakura-fixed.js script for SSR compatibility',
      'Used requestAnimationFrame and proper cleanup for animations',
      'Developed custom TypeScript declarations for sakura-js',
    ],
    metrics: {
      'Performance Score': '95',
      'Lighthouse SEO': '100',
      'Bundle Size': '2.1MB',
      'Load Time': '1.2s',
    },
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description:
      'Full-stack e-commerce solution with React, Node.js, and PostgreSQL, featuring payment integration and admin dashboard.',
    longDescription:
      'A complete e-commerce platform built from scratch with modern web technologies. Features include user authentication, product management, shopping cart, payment processing, order management, and comprehensive admin dashboard.',
    type: 'standard-work',
    technologies: [
      sampleTechnologies[0], // React
      sampleTechnologies[1], // TypeScript
      sampleTechnologies[3], // Node.js
      sampleTechnologies[5], // PostgreSQL
    ],
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    ],
    liveUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    featured: true,
    completedAt: new Date('2023-11-20'),
    status: 'live',
    tags: ['ecommerce', 'fullstack', 'react', 'nodejs'],
    highlights: [
      'Built complete payment integration with Stripe',
      'Implemented real-time inventory management',
      'Created responsive admin dashboard with analytics',
      'Achieved 99.9% uptime in production',
    ],
    challenges: [
      'Handling concurrent user sessions and cart management',
      'Implementing secure payment processing',
      'Optimizing database queries for large product catalogs',
    ],
    solutions: [
      'Used Redis for session management and caching',
      'Implemented Stripe webhooks for payment verification',
      'Created database indexes and query optimization',
    ],
    metrics: {
      'Monthly Revenue': '$15,000',
      'Conversion Rate': '3.2%',
      'Average Order Value': '$85',
      'Customer Satisfaction': '4.8/5',
    },
  },
  {
    id: 'task-management-app',
    title: 'Task Management Application',
    description:
      'Collaborative task management tool with real-time updates, drag-and-drop functionality, and team collaboration features.',
    longDescription:
      'A comprehensive task management application designed for teams and individuals. Features include project organization, task assignment, real-time collaboration, file attachments, time tracking, and detailed reporting.',
    type: 'standard-work',
    technologies: [
      sampleTechnologies[0], // React
      sampleTechnologies[1], // TypeScript
      sampleTechnologies[2], // Next.js
      sampleTechnologies[5], // PostgreSQL
    ],
    images: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    ],
    liveUrl: 'https://taskmanager-demo.vercel.app',
    githubUrl: 'https://github.com/yourusername/task-management-app',
    featured: false,
    completedAt: new Date('2023-08-10'),
    status: 'live',
    tags: ['productivity', 'collaboration', 'react', 'typescript'],
    highlights: [
      'Implemented real-time collaboration with WebSockets',
      'Created intuitive drag-and-drop interface',
      'Built comprehensive reporting and analytics',
      'Achieved 50% increase in team productivity',
    ],
    challenges: [
      'Synchronizing real-time updates across multiple clients',
      'Implementing smooth drag-and-drop with large datasets',
      'Managing complex state with multiple team members',
    ],
    solutions: [
      'Used Socket.io for real-time communication',
      'Implemented virtual scrolling for performance',
      'Created centralized state management with Redux Toolkit',
    ],
    metrics: {
      'Active Users': '500+',
      'Tasks Completed': '10,000+',
      'Team Productivity': '+50%',
      'User Satisfaction': '4.6/5',
    },
  },
];

// Sample experience
export const sampleExperience: Experience[] = [
  {
    id: 'senior-dev-current',
    company: 'Tech Solutions Inc.',
    position: 'Senior Full-Stack Developer',
    location: 'San Francisco, CA',
    startDate: new Date('2022-03-01'),
    current: true,
    description:
      'Leading development of enterprise web applications and mentoring junior developers. Responsible for architecture decisions and technical leadership.',
    responsibilities: [
      'Lead development of enterprise web applications using React, Node.js, and PostgreSQL',
      'Mentor junior developers and conduct code reviews',
      'Architect scalable solutions for high-traffic applications',
      'Collaborate with product managers and designers on feature specifications',
      'Implement CI/CD pipelines and DevOps best practices',
    ],
    achievements: [
      'Increased application performance by 40% through optimization',
      'Led team of 5 developers in successful product launch',
      'Reduced bug reports by 60% through improved testing practices',
      'Mentored 3 junior developers who received promotions',
    ],
    technologies: [
      sampleTechnologies[0], // React
      sampleTechnologies[1], // TypeScript
      sampleTechnologies[2], // Next.js
      sampleTechnologies[3], // Node.js
      sampleTechnologies[5], // PostgreSQL
    ],
    companyUrl: 'https://techsolutions.com',
    type: 'full-time',
  },
  {
    id: 'frontend-dev-previous',
    company: 'Digital Agency Co.',
    position: 'Frontend Developer',
    location: 'New York, NY',
    startDate: new Date('2020-06-01'),
    endDate: new Date('2022-02-28'),
    current: false,
    description:
      'Developed responsive web applications and user interfaces for various clients. Focused on creating exceptional user experiences.',
    responsibilities: [
      'Developed responsive web applications using React and TypeScript',
      'Collaborated with designers to implement pixel-perfect UI designs',
      'Optimized applications for performance and accessibility',
      'Worked with clients to understand requirements and provide solutions',
    ],
    achievements: [
      'Delivered 15+ client projects on time and within budget',
      'Improved page load times by 50% across all projects',
      'Achieved 100% accessibility compliance for all client sites',
    ],
    technologies: [
      sampleTechnologies[0], // React
      sampleTechnologies[1], // TypeScript
      sampleTechnologies[2], // Next.js
    ],
    companyUrl: 'https://digitalagency.com',
    type: 'full-time',
  },
];

// Sample education
export const sampleEducation: Education[] = [
  {
    id: 'computer-science-degree',
    institution: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    location: 'Berkeley, CA',
    startDate: new Date('2016-09-01'),
    endDate: new Date('2020-05-15'),
    current: false,
    gpa: 3.7,
    description:
      'Focused on software engineering, algorithms, and data structures. Completed senior capstone project on machine learning applications.',
    relevantCoursework: [
      'Data Structures and Algorithms',
      'Software Engineering',
      'Database Systems',
      'Computer Networks',
      'Machine Learning',
      'Web Development',
    ],
    achievements: [
      "Dean's List for 6 consecutive semesters",
      'Senior Capstone Project: "AI-Powered Code Review Tool"',
      'President of Computer Science Club',
    ],
    institutionUrl: 'https://berkeley.edu',
  },
];

// Sample portfolio data
export const samplePortfolioData: PortfolioData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    title: 'Senior Full-Stack Developer',
    bio: 'Passionate full-stack developer with 4+ years of experience building modern web applications. I specialize in React, TypeScript, and Node.js, with a focus on creating exceptional user experiences and scalable solutions. I love working with AI tools to enhance productivity while maintaining high code quality.',
    shortBio:
      'Full-stack developer passionate about creating exceptional web experiences with modern technologies.',
    location: 'San Francisco, CA',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://johndoe.dev',
    resumeUrl: 'https://johndoe.dev/resume.pdf',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200',
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      medium: 'https://medium.com/@johndoe',
    },
    skills: sampleTechnologies,
    interests: ['Web Development', 'AI/ML', 'Photography', 'Hiking', 'Cooking'],
    languages: [
      { name: 'English', level: 'native' },
      { name: 'Spanish', level: 'conversational' },
      { name: 'French', level: 'basic' },
    ],
  },
  projects: sampleProjects,
  experience: sampleExperience,
  education: sampleEducation,
  skills: sampleTechnologies,
};
