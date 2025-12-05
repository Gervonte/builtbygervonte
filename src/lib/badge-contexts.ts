// Badge context and tooltip definitions
// Provides structured hover information for different badge types

export interface BadgeContext {
  title: string;
  description: string;
  capabilities?: string[];
  capabilitiesLabel?: string;
}

// Skill level contexts
export const skillLevelContexts: Record<string, BadgeContext> = {
  beginner: {
    title: 'Just Starting Out',
    description: 'Learning the basics and getting familiar with the tools',
    capabilities: [
      'Following tutorials and documentation',
      'Writing simple scripts and functions',
      'Getting comfortable with the syntax',
    ],
    capabilitiesLabel: "What I'm Learning:",
  },
  intermediate: {
    title: 'Getting the Hang of It',
    description: 'I can build things and solve problems on my own',
    capabilities: [
      'Building real projects that work',
      'Debugging issues when they come up',
      'Understanding how different pieces fit together',
    ],
    capabilitiesLabel: 'What I Can Do:',
  },
  advanced: {
    title: 'Pretty Confident',
    description: "I've got solid skills and can tackle most challenges",
    capabilities: [
      'Building complex features',
      'Optimizing performance',
      'Helping others when they get stuck',
    ],
    capabilitiesLabel: 'What I Can Do:',
  },
  expert: {
    title: 'Really Know My Stuff',
    description: "I'm the person others come to for help",
    capabilities: [
      'Designing system architecture',
      'Mentoring other developers',
      'Solving complex technical problems',
    ],
    capabilitiesLabel: 'What I Can Do:',
  },
};

// Project type contexts
export const projectTypeContexts: Record<string, BadgeContext> = {
  'vibe-coded': {
    title: 'AI-Assisted Development',
    description: 'Leveraging AI tools to enhance productivity and code quality',
    capabilities: [
      'Collaborating with AI for code generation and optimization',
      'Using AI for debugging and problem-solving',
      'Implementing AI-assisted testing and quality assurance',
    ],
    capabilitiesLabel: 'How It Works:',
  },
  'standard-work': {
    title: 'Traditional Development',
    description: 'Built using established methodologies and proven practices',
    capabilities: [
      'Writing maintainable, well-documented code',
      'Implementing comprehensive testing strategies',
      'Following industry-standard deployment workflows',
    ],
    capabilitiesLabel: 'How It Works:',
  },
  'resume-parsed': {
    title: 'AI-Parsed Resume Content',
    description:
      'This content was automatically extracted and structured from my resume using AI parsing technology',
    capabilities: [
      'Automated extraction of skills, experience, and achievements',
      'Intelligent categorization and organization of information',
      'Consistent formatting and structure across all sections',
      'Real-time updates when resume content changes',
    ],
    capabilitiesLabel: 'How It Works:',
  },
};

// Project status contexts
export const projectStatusContexts: Record<string, BadgeContext> = {
  live: {
    title: 'Project Completed',
    description: 'Successfully delivered and deployed to production',
    capabilities: [
      'Delivered all planned features and requirements',
      'Achieved performance and quality targets',
      'Maintained active user engagement',
    ],
    capabilitiesLabel: 'What Was Done:',
  },
  'in-progress': {
    title: 'In Active Development',
    description: 'Currently being developed with regular progress updates',
    capabilities: [
      'Implementing core features and functionality',
      'Conducting iterative testing and refinement',
      'Maintaining regular development velocity',
    ],
    capabilitiesLabel: 'Current Progress:',
  },
  planned: {
    title: 'Planned Project',
    description: 'In planning phase with defined scope and requirements',
    capabilities: [
      'Defining technical requirements and architecture',
      'Planning development timeline and milestones',
      'Allocating resources and team assignments',
    ],
    capabilitiesLabel: 'Planning Phase:',
  },
};

// Technology category contexts
export const technologyContexts: Record<string, BadgeContext> = {
  // Frontend Technologies
  React: {
    title: 'React',
    description: 'Modern JavaScript library for building scalable user interfaces',
    capabilities: [
      'Building reusable, interactive components',
      'Managing complex application state',
      'Creating responsive single-page applications',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  TypeScript: {
    title: 'TypeScript',
    description: 'Strongly-typed JavaScript for enterprise-scale applications',
    capabilities: [
      'Catching errors at compile time',
      'Providing intelligent code completion',
      'Creating self-documenting code',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  JavaScript: {
    title: 'JavaScript',
    description: 'The language that runs everywhere - web, server, mobile',
    capabilities: [
      'Making websites interactive',
      'Building APIs and servers',
      'Creating mobile apps',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  HTML: {
    title: 'HTML',
    description: 'The foundation of every web page - structure and content',
    capabilities: [
      'Creating semantic markup',
      'Building accessible interfaces',
      'Organizing content logically',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  CSS: {
    title: 'CSS',
    description: 'Making things look beautiful - styling and layout',
    capabilities: [
      'Creating responsive designs',
      'Adding animations and transitions',
      'Building modern layouts',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Next.js': {
    title: 'Next.js',
    description: 'The React framework for production - SEO, performance, and more',
    capabilities: ['Server-side rendering', 'Static site generation', 'API routes and middleware'],
    capabilitiesLabel: 'What It Does:',
  },
  'Tailwind CSS': {
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    capabilities: [
      'Building responsive layouts quickly',
      'Creating consistent design systems',
      'Optimizing for performance and maintainability',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Mantine UI': {
    title: 'Mantine UI',
    description: 'Modern React components library with built-in theming',
    capabilities: [
      'Building complex forms and data tables',
      'Creating accessible, responsive interfaces',
      'Implementing consistent design patterns',
    ],
    capabilitiesLabel: 'What It Does:',
  },

  // Backend Technologies
  'Node.js': {
    title: 'Node.js',
    description: 'JavaScript runtime for building scalable server applications',
    capabilities: [
      'Building RESTful APIs and microservices',
      'Handling asynchronous operations efficiently',
      'Integrating with databases and external services',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Express: {
    title: 'Express',
    description: 'Fast, unopinionated web framework for Node.js',
    capabilities: [
      'Creating RESTful APIs and web servers',
      'Handling middleware and routing',
      'Integrating with databases and authentication',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Python: {
    title: 'Python',
    description: 'Versatile programming language for web, data, and automation',
    capabilities: [
      'Building web applications and APIs',
      'Data analysis and machine learning',
      'Automation and scripting tasks',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  FastAPI: {
    title: 'FastAPI',
    description: 'Modern Python web framework for building APIs',
    capabilities: [
      'Creating high-performance APIs',
      'Automatic API documentation generation',
      'Type hints and data validation',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  PostgreSQL: {
    title: 'PostgreSQL',
    description: 'Advanced open-source relational database',
    capabilities: [
      'Designing complex database schemas',
      'Writing efficient SQL queries',
      'Managing data integrity and relationships',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  MongoDB: {
    title: 'MongoDB',
    description: 'NoSQL document database for modern applications',
    capabilities: [
      'Storing and querying document data',
      'Building scalable data models',
      'Handling real-time data operations',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  GraphQL: {
    title: 'GraphQL',
    description: 'Query language and runtime for APIs',
    capabilities: [
      'Creating flexible API queries',
      'Reducing over-fetching and under-fetching',
      'Building type-safe APIs with introspection',
    ],
    capabilitiesLabel: 'What It Does:',
  },

  // DevOps & Cloud
  Docker: {
    title: 'Docker',
    description: 'Containerization platform for consistent deployments',
    capabilities: [
      'Containerizing applications for deployment',
      'Managing multi-container applications',
      'Ensuring consistent development environments',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  AWS: {
    title: 'AWS',
    description: 'Amazon Web Services cloud platform',
    capabilities: [
      'Deploying and managing cloud infrastructure',
      'Using AWS services for scalability',
      'Implementing security and monitoring',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Vercel: {
    title: 'Vercel',
    description: 'Platform for deploying frontend applications',
    capabilities: [
      'Deploying React and Next.js applications',
      'Managing custom domains and SSL',
      'Optimizing for performance and SEO',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'GitHub Actions': {
    title: 'GitHub Actions',
    description: 'CI/CD platform for automated workflows',
    capabilities: [
      'Automating testing and deployment',
      'Building custom CI/CD pipelines',
      'Integrating with development workflows',
    ],
    capabilitiesLabel: 'What It Does:',
  },

  // Development Tools
  Git: {
    title: 'Git',
    description: 'Version control system for tracking code changes',
    capabilities: [
      'Managing code versions and branches',
      'Collaborating with team members',
      'Tracking and resolving merge conflicts',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'VS Code': {
    title: 'VS Code',
    description: 'Popular code editor with extensive extensions',
    capabilities: [
      'Writing and debugging code efficiently',
      'Using extensions for productivity',
      'Integrating with development tools',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Figma: {
    title: 'Figma',
    description: 'Collaborative design tool for UI/UX',
    capabilities: [
      'Creating and iterating on designs',
      'Collaborating with design teams',
      'Prototyping user interactions',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Vite: {
    title: 'Vite',
    description: 'Fast build tool and development server',
    capabilities: [
      'Lightning-fast hot module replacement',
      'Optimized production builds',
      'Modern ES modules support',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Chakra UI': {
    title: 'Chakra UI',
    description: 'Simple, modular React component library',
    capabilities: [
      'Building accessible React components',
      'Creating consistent design systems',
      'Rapid UI development with pre-built components',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Sentry: {
    title: 'Sentry',
    description: 'Error tracking and performance monitoring platform',
    capabilities: [
      'Real-time error tracking and alerting',
      'Performance monitoring and optimization',
      'User session replay and debugging',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Sakura.js': {
    title: 'Sakura.js',
    description: 'Custom JavaScript animation library for sakura petals',
    capabilities: [
      'Creating beautiful sakura petal animations',
      'Custom particle effects and physics',
      'Lightweight and performant animations',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Essentia.js': {
    title: 'Essentia.js',
    description: 'JavaScript library for audio analysis and music information retrieval',
    capabilities: [
      'Analyzing audio key and BPM',
      'Extracting musical features from audio',
      'Real-time audio processing in the browser',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Web Audio API': {
    title: 'Web Audio API',
    description: 'Browser API for processing and synthesizing audio',
    capabilities: [
      'Real-time audio processing and analysis',
      'Creating interactive audio applications',
      'Low-level audio manipulation and effects',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'REST APIs': {
    title: 'REST APIs',
    description: 'Representational State Transfer API design pattern',
    capabilities: [
      'Designing stateless, scalable web services',
      'Creating consistent HTTP-based interfaces',
      'Building developer-friendly API endpoints',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Vercel Analytics': {
    title: 'Vercel Analytics',
    description: 'Built-in analytics and performance monitoring for Vercel deployments',
    capabilities: [
      'Tracking page views and user behavior',
      'Monitoring Core Web Vitals and performance',
      'Analyzing traffic patterns and user journeys',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  ESLint: {
    title: 'ESLint',
    description: 'Static code analysis tool for JavaScript and TypeScript',
    capabilities: [
      'Catching code quality issues and bugs',
      'Enforcing consistent coding standards',
      'Automatically fixing common problems',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Console Logging': {
    title: 'Console Logging',
    description: 'Browser console-based debugging and monitoring',
    capabilities: [
      'Debugging JavaScript applications',
      'Tracking application state and errors',
      'Monitoring performance and user interactions',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Zod: {
    title: 'Zod',
    description: 'TypeScript-first schema validation library',
    capabilities: [
      'Validating data at runtime with TypeScript types',
      'Creating type-safe API schemas',
      'Building robust form validation',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Rellax: {
    title: 'Rellax',
    description: 'Lightweight parallax scrolling library',
    capabilities: [
      'Creating smooth parallax scrolling effects',
      'Adding depth and visual interest to pages',
      'Optimizing performance for mobile devices',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Resend: {
    title: 'Resend',
    description: 'Email API for developers',
    capabilities: [
      'Sending transactional emails from applications',
      'Managing email templates and delivery',
      'Integrating email functionality with web apps',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Framer Motion': {
    title: 'Framer Motion',
    description: 'Production-ready motion library for React',
    capabilities: [
      'Creating smooth animations and transitions',
      'Building gesture-based interactions',
      'Implementing complex layout animations',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Tabler Icons': {
    title: 'Tabler Icons',
    description: 'Open-source icon library with 4,000+ icons',
    capabilities: [
      'Providing consistent, customizable icons',
      'Supporting multiple formats and sizes',
      'Integrating with React and other frameworks',
    ],
    capabilitiesLabel: 'What It Does:',
  },

  // Data Science & ML Technologies
  'OpenAI API': {
    title: 'OpenAI API',
    description: 'AI platform for natural language processing and generation',
    capabilities: [
      'Generating human-like text and code',
      'Analyzing and understanding language patterns',
      'Building intelligent conversational interfaces',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Gemini API': {
    title: 'Gemini API',
    description: "Google's multimodal AI model for text and image understanding",
    capabilities: [
      'Processing text and image inputs together',
      'Generating creative and analytical content',
      'Building advanced AI-powered applications',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  QWEN: {
    title: 'QWEN',
    description: "Alibaba's large language model for various AI tasks",
    capabilities: [
      'Natural language understanding and generation',
      'Code analysis and generation',
      'Multilingual text processing',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Jupyter: {
    title: 'Jupyter',
    description: 'Interactive computing environment for data science',
    capabilities: [
      'Creating interactive notebooks for data analysis',
      'Combining code, visualizations, and documentation',
      'Collaborating on data science projects',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Pandas: {
    title: 'Pandas',
    description: 'Powerful data manipulation and analysis library for Python',
    capabilities: [
      'Cleaning and transforming datasets',
      'Performing statistical analysis',
      'Working with time series and structured data',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Scikit-learn': {
    title: 'Scikit-learn',
    description: 'Machine learning library for Python with simple tools',
    capabilities: [
      'Building and training ML models',
      'Preprocessing and feature engineering',
      'Model evaluation and selection',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  LIME: {
    title: 'LIME',
    description: 'Local Interpretable Model-agnostic Explanations for ML models',
    capabilities: [
      'Explaining individual model predictions',
      'Understanding feature importance',
      'Making AI decisions more transparent',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  Matplotlib: {
    title: 'Matplotlib',
    description: 'Python plotting library for creating visualizations',
    capabilities: [
      'Creating charts, graphs, and plots',
      'Customizing visualizations for presentations',
      'Analyzing data through visual representation',
    ],
    capabilitiesLabel: 'What It Does:',
  },

  // Framework Versions
  'Next.js 15+ with App Router': {
    title: 'Next.js 15+ with App Router',
    description: 'Latest Next.js with App Router for modern React applications',
    capabilities: [
      'Server-side rendering and static generation',
      'API routes and middleware',
      'Built-in performance optimizations',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Mantine UI Component Library': {
    title: 'Mantine UI Component Library',
    description: 'Modern React components library with built-in theming',
    capabilities: [
      'Pre-built accessible components',
      'Consistent design system',
      'Built-in dark/light theme support',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'TypeScript with strict validation': {
    title: 'TypeScript with strict validation',
    description: 'TypeScript with strict type checking for robust applications',
    capabilities: [
      'Compile-time error detection',
      'Enhanced IDE support and autocomplete',
      'Self-documenting code with types',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Vite Build System': {
    title: 'Vite Build System',
    description: 'Fast build tool and development server for modern web projects',
    capabilities: [
      'Lightning-fast hot module replacement',
      'Optimized production builds',
      'Native ES modules support',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Chakra UI Components': {
    title: 'Chakra UI Components',
    description: 'Simple, modular and accessible component library for React',
    capabilities: [
      'Accessible components out of the box',
      'Simple and composable API',
      'Built-in responsive design',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Essentia.js Audio Analysis': {
    title: 'Essentia.js Audio Analysis',
    description: 'JavaScript library for audio analysis and music information retrieval',
    capabilities: [
      'Real-time audio feature extraction',
      'Music analysis and classification',
      'Audio fingerprinting and matching',
    ],
    capabilitiesLabel: 'What It Does:',
  },

  // Additional Tools & Services
  'GitHub Actions for CI/CD': {
    title: 'GitHub Actions for CI/CD',
    description: 'Automated continuous integration and deployment workflows',
    capabilities: [
      'Automated testing and building',
      'Scheduled deployments and releases',
      'Security scanning and code quality checks',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Vercel for hosting and deployment': {
    title: 'Vercel for hosting and deployment',
    description: 'Cloud platform for frontend frameworks and static sites',
    capabilities: [
      'Automatic deployments from Git',
      'Global CDN and edge functions',
      'Preview deployments for testing',
    ],
    capabilitiesLabel: 'What It Does:',
  },
  'Web Audio API Integration': {
    title: 'Web Audio API Integration',
    description: 'Browser API for processing and synthesizing audio',
    capabilities: [
      'Real-time audio processing and analysis',
      'Audio synthesis and effects',
      'Low-latency audio manipulation',
    ],
    capabilitiesLabel: 'What It Does:',
  },
};

// AI Tools contexts
export const aiToolsContexts: Record<string, BadgeContext> = {
  ChatGPT: {
    title: 'ChatGPT',
    description: 'AI assistant for code analysis, debugging, and learning',
    capabilities: [
      'Analyzing complex code and explaining concepts',
      'Debugging issues and suggesting solutions',
      'Generating code snippets and documentation',
    ],
    capabilitiesLabel: 'How I Use It:',
  },
  'GitHub Copilot': {
    title: 'GitHub Copilot',
    description: 'AI-powered code completion and generation assistant',
    capabilities: [
      'Providing intelligent code suggestions in real-time',
      'Generating complete functions and classes',
      'Creating comprehensive test suites',
    ],
    capabilitiesLabel: 'How I Use It:',
  },
  'Claude AI': {
    title: 'Claude AI',
    description: 'Advanced AI assistant for complex technical reasoning and analysis',
    capabilities: [
      'Conducting thorough code reviews and analysis',
      'Making informed architecture and design decisions',
      'Creating comprehensive technical documentation',
    ],
    capabilitiesLabel: 'How I Use It:',
  },
  'Kiro (AWS)': {
    title: 'Kiro (AWS)',
    description: 'AI-powered code analysis and development assistant',
    capabilities: [
      'Analyzing code quality and suggesting improvements',
      'Providing development best practices',
      'Assisting with debugging and optimization',
    ],
    capabilitiesLabel: 'How I Use It:',
  },
  Cursor: {
    title: 'Cursor',
    description: 'AI-powered code editor built on VS Code',
    capabilities: [
      'AI-assisted code generation and editing',
      'Intelligent code completion and suggestions',
      'Seamless integration with development workflows',
    ],
    capabilitiesLabel: 'How I Use It:',
  },
};

// Cache management contexts
export const cacheContexts: Record<string, BadgeContext> = {
  usage: {
    title: 'Cache Usage',
    description: 'How much of the cache is being utilized',
    capabilities: [
      'Monitoring cache hit rates and performance',
      'Optimizing cache size and eviction policies',
      'Identifying cache bottlenecks and improvements',
    ],
    capabilitiesLabel: 'What It Shows:',
  },
  'hit-rate': {
    title: 'Cache Hit Rate',
    description: 'Percentage of successful cache retrievals',
    capabilities: [
      'Measuring cache effectiveness',
      'Optimizing cache strategies',
      'Improving application performance',
    ],
    capabilitiesLabel: 'What It Shows:',
  },
};

// Leadership contexts
export const leadershipContexts: Record<string, BadgeContext> = {
  ALC: {
    title: 'Alumni Leadership Committee (ALC)',
    description:
      "A group of dedicated alumni who oversee events and initiatives to engage and support the university's alumni community.",
    capabilities: [
      'Organizing alumni events and networking opportunities',
      'Supporting current students and recent graduates',
      'Maintaining connections between alumni and the university',
      'Planning fundraising and community engagement initiatives',
    ],
    capabilitiesLabel: 'What They Do:',
  },
  NSBE: {
    title: 'National Society of Black Engineers (NSBE)',
    description:
      'A student organization dedicated to increasing the number of culturally responsible Black engineers who excel academically, succeed professionally, and positively impact the community.',
    capabilities: [
      'Providing academic support and mentorship programs',
      'Organizing professional development workshops',
      'Facilitating networking with industry professionals',
      'Promoting diversity and inclusion in engineering',
    ],
    capabilitiesLabel: 'What They Do:',
  },
};

// Helper functions
export const getBadgeContext = (contextType: string, contextValue: string): BadgeContext | null => {
  switch (contextType) {
    case 'skill':
      return skillLevelContexts[contextValue] || null;
    case 'projectType':
      return projectTypeContexts[contextValue] || null;
    case 'status':
      return projectStatusContexts[contextValue] || null;
    case 'technology':
      return technologyContexts[contextValue] || null;
    case 'aiTool':
      return aiToolsContexts[contextValue] || null;
    case 'cache':
      return cacheContexts[contextValue] || null;
    case 'leadership':
      return leadershipContexts[contextValue] || null;
    default:
      return null;
  }
};

export const getDefaultContext = (contextType: string, contextValue: string): BadgeContext => {
  return {
    title: contextValue,
    description: `Information about ${contextValue}`,
    capabilities: [`Working with ${contextValue}`],
  };
};
