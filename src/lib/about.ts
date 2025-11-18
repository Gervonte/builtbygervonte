import aboutMetadata from '@/data/about-metadata.json';
import manualAdditions from '@/data/manual-additions.json';

// Type definitions
export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'soft';
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  description?: string;
}

export interface Leadership {
  name: string;
  organization: string;
  clubAbbreviation: string;
  clubDescription: string;
  year: string;
  description?: string;
}

export interface ResearchProject {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface AboutData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  researchProjects: ResearchProject[];
  leadership: Leadership[];
}

// Helper function to deduplicate skills by name
const deduplicateSkills = (skills: Skill[]): Skill[] => {
  const seen = new Set<string>();
  return skills.filter(skill => {
    if (seen.has(skill.name)) {
      return false;
    }
    seen.add(skill.name);
    return true;
  });
};

// Helper function to deduplicate research projects by title
const deduplicateResearchProjects = (projects: ResearchProject[]): ResearchProject[] => {
  const seen = new Set<string>();
  return projects.filter(project => {
    if (seen.has(project.title)) {
      return false;
    }
    seen.add(project.title);
    return true;
  });
};

// Merge data from both files
// about-metadata.json: Auto-generated from resume parsing (DO NOT EDIT)
// manual-additions.json: Manual additions and custom data (EDIT THIS)
const mergedData: AboutData = {
  personalInfo: {
    ...aboutMetadata.personalInfo,
    ...(manualAdditions.personalInfo || {}),
  },
  skills: deduplicateSkills([
    ...aboutMetadata.skills,
    ...(manualAdditions.skills || []),
  ] as Skill[]),
  experience: [...aboutMetadata.experience, ...(manualAdditions.experience || [])],
  education: [...aboutMetadata.education, ...(manualAdditions.education || [])],
  researchProjects: deduplicateResearchProjects([
    ...(manualAdditions.researchProjects || []),
    ...aboutMetadata.researchProjects,
  ]),
  leadership: [...aboutMetadata.leadership, ...(manualAdditions.leadership || [])],
};

// Export the merged data
export const aboutData = mergedData;

// Utility functions
export const getSkillsByCategory = (): Record<string, Skill[]> => {
  return aboutData.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );
};

export const getSkillsByLevel = (level: Skill['level']): Skill[] => {
  return aboutData.skills.filter(skill => skill.level === level);
};

export const getSkillsByCategoryAndLevel = (
  category: Skill['category'],
  level: Skill['level']
): Skill[] => {
  return aboutData.skills.filter(skill => skill.category === category && skill.level === level);
};

export const getRecentExperience = (limit: number = 3): Experience[] => {
  return aboutData.experience.slice(0, limit);
};

export const getRecentEducation = (limit: number = 2): Education[] => {
  return aboutData.education.slice(0, limit);
};

export const getRecentResearchProjects = (limit: number = 2): ResearchProject[] => {
  return aboutData.researchProjects.slice(0, limit);
};

export const getRecentLeadership = (limit: number = 3): Leadership[] => {
  return aboutData.leadership.slice(0, limit);
};

// Skill level color mapping (theme-aware)
// Note: This function returns color names that work with both sakura and ocean themes
export const getSkillColor = (level: Skill['level']): string => {
  switch (level) {
    case 'expert':
      return 'sakura'; // Primary theme color (sakura in sakura theme, ocean in ocean theme)
    case 'advanced':
      return 'pink'; // Effect color (pink in sakura theme, mist in ocean theme)
    case 'intermediate':
      return 'earth'; // Earth color (consistent across themes)
    case 'beginner':
      return 'gray'; // Neutral color
    default:
      return 'gray';
  }
};

// Theme-aware skill color mapping for better contrast
// This function provides better color choices for each theme without changing global mappings
export const getThemeAwareSkillColor = (
  level: Skill['level'],
  theme: 'sakura' | 'ocean'
): string => {
  if (theme === 'ocean') {
    switch (level) {
      case 'expert':
        return 'ocean'; // Use ocean color for expert in ocean theme
      case 'advanced':
        return 'earth'; // Use earth color for advanced in ocean theme (better contrast)
      case 'intermediate':
        return 'warm'; // Use warm color for intermediate in ocean theme
      case 'beginner':
        return 'gray'; // Keep gray for beginner
      default:
        return 'gray';
    }
  } else {
    // Sakura theme uses the original mapping
    return getSkillColor(level);
  }
};

// Theme-aware skill variant mapping for better contrast
// This function provides different variants for better visual distinction
export const getThemeAwareSkillVariant = (
  level: Skill['level'],
  theme: 'sakura' | 'ocean'
): 'light' | 'filled' | 'outline' => {
  if (theme === 'ocean') {
    switch (level) {
      case 'expert':
        return 'filled'; // Use filled variant for expert in ocean theme
      case 'advanced':
        return 'light'; // Use light variant for advanced in ocean theme
      case 'intermediate':
        return 'outline'; // Use outline variant for intermediate in ocean theme
      case 'beginner':
        return 'light'; // Use light variant for beginner
      default:
        return 'light';
    }
  } else {
    // Sakura theme uses light variant for all
    return 'light';
  }
};

// Category icon mapping (you'll need to import the icons in your component)
export const getCategoryIcon = (category: Skill['category']): string => {
  switch (category) {
    case 'frontend':
      return 'IconCode';
    case 'backend':
      return 'IconDatabase';
    case 'devops':
      return 'IconCloud';
    case 'tools':
      return 'IconTools';
    case 'soft':
      return 'IconUsers';
    default:
      return 'IconCode';
  }
};
