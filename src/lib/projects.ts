import projectsMetadata from '@/data/projects-metadata.json';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  type: 'vibe-coded' | 'standard-work';
  technologies: string[];
  status: 'live' | 'in-progress' | 'planned';
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  achievements: string[];
  aiTools?: string[];
  timeline: string;
  category: string;
  enableTechnicalDetails?: boolean;
  technicalDetails?: TechnicalDetails;
}

export interface TechnicalDetails {
  analytics: TechnicalSection;
  monitoring: TechnicalSection;
  cicd: TechnicalSection;
  performance?: TechnicalSection;
  architecture: TechnicalSection;
}

export interface TechnicalSection {
  enabled?: boolean;
  showScreenshots?: boolean;
  screenshots: string[];
  description: string;
  [key: string]: unknown; // Allow for flexible additional properties
}

export interface ProjectCategory {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
}

export interface ProjectPhilosophy {
  title: string;
  description: string;
  vibeCoded: {
    title: string;
    description: string;
    icon: string;
    color: string;
  };
  standardWork: {
    title: string;
    description: string;
    icon: string;
    color: string;
  };
}

export interface ProjectsMetadata {
  projects: Project[];
  categories: {
    'vibe-coded': ProjectCategory;
    'standard-work': ProjectCategory;
  };
  philosophy: ProjectPhilosophy;
}

// Type-safe access to the metadata
export const projectsData: ProjectsMetadata = projectsMetadata as ProjectsMetadata;

// Utility functions
export const getProjectsByType = (type: 'vibe-coded' | 'standard-work'): Project[] => {
  return projectsData.projects.filter(project => project.type === type);
};

export const getFeaturedProjects = (): Project[] => {
  return projectsData.projects.filter(project => project.featured);
};

export const getProjectById = (id: string): Project | undefined => {
  return projectsData.projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projectsData.projects.filter(project => project.category === category);
};

export const getProjectsByStatus = (status: Project['status']): Project[] => {
  return projectsData.projects.filter(project => project.status === status);
};

export const getProjectTechnologies = (): string[] => {
  const allTechnologies = projectsData.projects.flatMap(project => project.technologies);
  return [...new Set(allTechnologies)].sort();
};

export const getProjectCategories = (): string[] => {
  const allCategories = projectsData.projects.map(project => project.category);
  return [...new Set(allCategories)].sort();
};

export const getAITools = (): string[] => {
  const allAITools = projectsData.projects
    .filter(project => project.aiTools)
    .flatMap(project => project.aiTools!);
  return [...new Set(allAITools)].sort();
};

// Statistics
export const getProjectStats = () => {
  const total = projectsData.projects.length;
  const vibeCoded = getProjectsByType('vibe-coded').length;
  const standardWork = getProjectsByType('standard-work').length;
  const featured = getFeaturedProjects().length;
  const live = getProjectsByStatus('live').length;
  const inProgress = getProjectsByStatus('in-progress').length;
  const planned = getProjectsByStatus('planned').length;

  return {
    total,
    vibeCoded,
    standardWork,
    featured,
    live,
    inProgress,
    planned,
  };
};
