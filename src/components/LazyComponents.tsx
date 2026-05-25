'use client';

import dynamic from 'next/dynamic';
import OptimizedLoadingSpinner from './OptimizedLoadingSpinner';
import {
  AboutSectionSkeleton,
  ContactSectionSkeleton,
  ExperienceSectionSkeleton,
  HeroSectionSkeleton,
  WatchSectionSkeleton,
  WorkSectionSkeleton,
} from './skeletons';

// Lazy load all heavy components with content-specific loading states
export const LazyHeroSection = dynamic(() => import('./HeroSection'), {
  loading: () => <HeroSectionSkeleton />,
  ssr: false,
});

export const LazyWatchSection = dynamic(() => import('./WatchSection'), {
  loading: () => <WatchSectionSkeleton />,
  ssr: false,
});

export const LazyAboutSection = dynamic(() => import('./AboutSection'), {
  loading: () => <AboutSectionSkeleton />,
  ssr: false,
});

export const LazyWorkSection = dynamic(() => import('./WorkSection'), {
  loading: () => <WorkSectionSkeleton />,
  ssr: false,
});

export const LazyExperienceSection = dynamic(() => import('./ExperienceSection'), {
  loading: () => <ExperienceSectionSkeleton />,
  ssr: false,
});

export const LazyContactSection = dynamic(() => import('./ContactSection'), {
  loading: () => <ContactSectionSkeleton />,
  ssr: false,
});

export const LazyScrollIndicator = dynamic(() => import('./ScrollIndicator'), {
  loading: () => <div style={{ height: '60px' }} />, // Minimal loading state
  ssr: false,
});

export const LazyTechnicalDetailsModal = dynamic(
  () => import('./TechnicalDetailsModal').then(mod => ({ default: mod.TechnicalDetailsModal })),
  {
    loading: () => <OptimizedLoadingSpinner height={200} aria-label="Loading technical details" />,
    ssr: false,
  }
);
