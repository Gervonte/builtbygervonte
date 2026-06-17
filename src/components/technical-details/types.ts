import { Project, TechnicalSection } from '@/lib/projects';

// Extended section type with all possible properties
export interface ExtendedTechnicalSection extends TechnicalSection {
  metrics?: Record<string, unknown>;
  tools?: string[];
  workflows?: string[];
  components?: string[];
  uptime?: string | number;
  errorRate?: string | number;
  deployment?: string;
  deploymentFrequency?: string | number;
  leadTime?: string | number;
  lighthouseScore?: number;
  coreWebVitals?: Record<string, unknown>;
}

export interface TechnicalSectionWithKey {
  key: string;
  section: ExtendedTechnicalSection;
  icon: React.ReactNode;
}

export interface TechnicalDetailsModalProps {
  project: Project;
  opened: boolean;
  onClose: () => void;
}

export interface CommonColors {
  backgroundModal: string;
  backgroundCard: string;
  backgroundSecondary: string;
  borderModal: string;
  borderPrimary: string;
  textPrimary: string;
  textSecondary: string;
  accentPrimary: string;
  accentSecondary: string;
  shadowLight: string;
  shadowMedium: string;
  shadowHeavy: string;
}

export interface SectionCardProps {
  section: ExtendedTechnicalSection;
  sectionKey: string;
  commonColors: CommonColors;
}

export interface ScreenshotItem {
  src: string;
  caption?: string;
  alt?: string;
  modalPosition?: string;
  modalScale?: number;
  modalFit?: 'contain' | 'cover';
}

export interface ScreenshotGalleryProps {
  screenshots: Array<string | ScreenshotItem>;
  sectionKey: string;
  commonColors: CommonColors;
  onImageSelect: (image: ScreenshotItem) => void;
}

export interface TabNavigationProps {
  technicalSections: TechnicalSectionWithKey[];
  activeTab: string | null;
  onTabChange: (tab: string) => void;
  commonColors: CommonColors;
}

export interface ModalHeaderProps {
  project: Project;
  activeTab: string | null;
  commonColors: CommonColors;
}

// Modal configuration constants
export const MODAL_CONFIG = {
  detailsSize: '86vw',
  detailsMaxWidth: '1120px',
  detailsMaxHeight: '78vh',
  imageMaxHeight: '86vh',
  /** Above site header (Header.tsx uses 1100) */
  detailsZIndex: 1150,
  lightboxZIndex: 1200,
} as const;
