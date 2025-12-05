import { z } from 'zod';

// Base schemas for common fields
const urlSchema = z.string().url().optional();
const emailSchema = z.string().email();
const phoneSchema = z
  .string()
  .regex(/^[\+]?[1-9][\d]{0,15}$/)
  .optional();

// Skill level enum
const skillLevelSchema = z.enum(['beginner', 'intermediate', 'advanced', 'expert']);

// Project type enum
const projectTypeSchema = z.enum(['vibe-coded', 'standard-work']);

// Technology category enum
const techCategorySchema = z.enum([
  'frontend',
  'backend',
  'database',
  'devops',
  'mobile',
  'ai-ml',
  'design',
  'testing',
  'tools',
  'other',
]);

// Technology schema
export const technologySchema = z.object({
  name: z.string().min(1, 'Technology name is required'),
  category: techCategorySchema,
  level: skillLevelSchema,
  yearsOfExperience: z.number().min(0).max(50).optional(),
  icon: z.string().optional(), // Icon name or URL
  color: z.string().optional(), // Hex color code
});

// Project schema
export const projectSchema = z.object({
  id: z.string().min(1, 'Project ID is required'),
  title: z.string().min(1, 'Project title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  longDescription: z.string().optional(),
  type: projectTypeSchema,
  technologies: z.array(technologySchema).min(1, 'At least one technology is required'),
  images: z.array(z.string().url()).optional(),
  liveUrl: urlSchema,
  githubUrl: urlSchema,
  featured: z.boolean().default(false),
  completedAt: z.date().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.enum(['live', 'in-progress', 'planned', 'on-hold']).default('live'),
  tags: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(), // Key achievements or features
  challenges: z.array(z.string()).optional(), // Technical challenges faced
  solutions: z.array(z.string()).optional(), // How challenges were solved
  metrics: z.record(z.string(), z.union([z.string(), z.number()])).optional(), // Performance metrics
});

// Experience schema
export const experienceSchema = z.object({
  id: z.string().min(1, 'Experience ID is required'),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position title is required'),
  location: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(), // null for current position
  current: z.boolean().default(false),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  responsibilities: z.array(z.string()).min(1, 'At least one responsibility is required'),
  achievements: z.array(z.string()).optional(),
  technologies: z.array(technologySchema).optional(),
  companyUrl: urlSchema,
  companyLogo: z.string().optional(),
  type: z
    .enum(['full-time', 'part-time', 'contract', 'freelance', 'internship'])
    .default('full-time'),
});

// Education schema
export const educationSchema = z.object({
  id: z.string().min(1, 'Education ID is required'),
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree name is required'),
  field: z.string().optional(),
  location: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  current: z.boolean().default(false),
  gpa: z.number().min(0).max(4).optional(),
  description: z.string().optional(),
  relevantCoursework: z.array(z.string()).optional(),
  achievements: z.array(z.string()).optional(),
  institutionUrl: urlSchema,
  institutionLogo: z.string().optional(),
});

// Certification schema
export const certificationSchema = z.object({
  id: z.string().min(1, 'Certification ID is required'),
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer name is required'),
  issueDate: z.date(),
  expiryDate: z.date().optional(),
  credentialId: z.string().optional(),
  credentialUrl: urlSchema,
  issuerUrl: urlSchema,
  issuerLogo: z.string().optional(),
  skills: z.array(z.string()).optional(),
  description: z.string().optional(),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  company: z.string().optional(),
  phone: phoneSchema,
  budget: z
    .enum(['under-5k', '5k-10k', '10k-25k', '25k-50k', '50k-plus', 'not-specified'])
    .optional(),
  timeline: z.enum(['asap', '1-month', '3-months', '6-months', 'flexible']).optional(),
  projectType: z.enum(['website', 'web-app', 'mobile-app', 'e-commerce', 'other']).optional(),
});

// Personal information schema
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  title: z.string().min(1, 'Professional title is required'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  shortBio: z.string().min(20, 'Short bio must be at least 20 characters'),
  location: z.string().min(1, 'Location is required'),
  email: emailSchema,
  phone: phoneSchema,
  website: urlSchema,
  resumeUrl: urlSchema,
  avatar: z.string().url().optional(),
  coverImage: z.string().url().optional(),
  socialLinks: z
    .object({
      github: urlSchema,
      linkedin: urlSchema,
      twitter: urlSchema,
      instagram: urlSchema,
      behance: urlSchema,
      dribbble: urlSchema,
      medium: urlSchema,
      dev: urlSchema,
      stackoverflow: urlSchema,
      codepen: urlSchema,
    })
    .optional(),
  skills: z.array(technologySchema).min(1, 'At least one skill is required'),
  interests: z.array(z.string()).optional(),
  languages: z
    .array(
      z.object({
        name: z.string(),
        level: z.enum(['native', 'fluent', 'conversational', 'basic']),
      })
    )
    .optional(),
});

// Portfolio data schema (main schema that combines everything)
export const portfolioDataSchema = z.object({
  personalInfo: personalInfoSchema,
  projects: z.array(projectSchema).min(1, 'At least one project is required'),
  experience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
  skills: z.array(technologySchema).min(1, 'At least one skill is required'),
  testimonials: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        position: z.string(),
        company: z.string(),
        content: z.string().min(20),
        avatar: z.string().url().optional(),
        rating: z.number().min(1).max(5).optional(),
        projectId: z.string().optional(),
      })
    )
    .optional(),
  blogPosts: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        excerpt: z.string(),
        content: z.string(),
        publishedAt: z.date(),
        updatedAt: z.date().optional(),
        slug: z.string(),
        tags: z.array(z.string()).optional(),
        featured: z.boolean().default(false),
        readTime: z.number().optional(),
        coverImage: z.string().url().optional(),
      })
    )
    .optional(),
});

// Type exports for TypeScript
export type Technology = z.infer<typeof technologySchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type PortfolioData = z.infer<typeof portfolioDataSchema>;

// Validation helper functions
export const validateProject = (data: unknown) => projectSchema.parse(data);
export const validateExperience = (data: unknown) => experienceSchema.parse(data);
export const validateEducation = (data: unknown) => educationSchema.parse(data);
export const validateCertification = (data: unknown) => certificationSchema.parse(data);
export const validateContactForm = (data: unknown) => contactFormSchema.parse(data);
export const validatePersonalInfo = (data: unknown) => personalInfoSchema.parse(data);
export const validatePortfolioData = (data: unknown) => portfolioDataSchema.parse(data);

// Safe validation functions (returns result instead of throwing)
export const safeValidateProject = (data: unknown) => projectSchema.safeParse(data);
export const safeValidateExperience = (data: unknown) => experienceSchema.safeParse(data);
export const safeValidateEducation = (data: unknown) => educationSchema.safeParse(data);
export const safeValidateCertification = (data: unknown) => certificationSchema.safeParse(data);
export const safeValidateContactForm = (data: unknown) => contactFormSchema.safeParse(data);
export const safeValidatePersonalInfo = (data: unknown) => personalInfoSchema.safeParse(data);
export const safeValidatePortfolioData = (data: unknown) => portfolioDataSchema.safeParse(data);
