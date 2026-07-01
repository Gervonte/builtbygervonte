import {
  IconBuilding,
  IconChartBar,
  IconDeviceDesktop,
  IconGauge,
  IconRocket,
  IconShield,
} from '@tabler/icons-react';

export const getTechnicalIcon = (section: string) => {
  switch (section) {
    case 'analytics':
      return <IconChartBar size={16} />;
    case 'monitoring':
      return <IconShield size={16} />;
    case 'cicd':
      return <IconRocket size={16} />;
    case 'performance':
      return <IconGauge size={16} />;
    case 'architecture':
      return <IconBuilding size={16} />;
    case 'product':
      return <IconDeviceDesktop size={16} />;
    default:
      return <IconChartBar size={16} />;
  }
};

export const shouldShowSection = (section: Record<string, unknown>, sectionType: string) => {
  if (!section) return false;

  switch (sectionType) {
    case 'metrics':
      return section.metrics && Object.keys(section.metrics as Record<string, unknown>).length > 0;
    case 'tools':
      return section.tools && Array.isArray(section.tools) && section.tools.length > 0;
    case 'workflows':
      return section.workflows && Array.isArray(section.workflows) && section.workflows.length > 0;
    case 'components':
      return (
        section.components && Array.isArray(section.components) && section.components.length > 0
      );
    case 'monitoring':
      return section.uptime || section.errorRate;
    case 'screenshots':
      return (
        section.showScreenshots !== false &&
        section.screenshots &&
        Array.isArray(section.screenshots) &&
        section.screenshots.length > 0
      );
    case 'architecture':
      return (
        (section.components &&
          Array.isArray(section.components) &&
          section.components.length > 0) ||
        section.deployment
      );
    case 'deployment':
      return section.deploymentFrequency || section.leadTime;
    default:
      return true;
  }
};

export const formatSectionTitle = (key: string) => {
  if (key === 'cicd') return 'CI/CD';
  if (key === 'product') return 'Product';
  if (key === 'monitoring') return 'Observability';
  return key.charAt(0).toUpperCase() + key.slice(1);
};
