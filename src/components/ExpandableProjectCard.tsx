'use client';

import { useModal } from '@/lib/modal-context';
import { Project } from '@/lib/projects';
import { getProjectScreenshots } from '@/lib/screenshot';
import { IconBrain, IconBrandGithub, IconCode, IconExternalLink } from '@tabler/icons-react';
import { memo, useState } from 'react';
import { LazyTechnicalDetailsModal } from './LazyComponents';
import UnifiedCard from './UnifiedCard';

interface ExpandableProjectCardProps {
  project: Project;
  type: 'vibe-coded' | 'standard-work';
}

const getProjectIcon = (type: Project['type']) => {
  return type === 'vibe-coded' ? <IconBrain size={20} /> : <IconCode size={20} />;
};

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'live':
      return 'sakura';
    case 'in-progress':
      return 'pink';
    case 'planned':
      return 'gray';
    default:
      return 'gray';
  }
};

const ExpandableProjectCard = memo(({ project, type }: ExpandableProjectCardProps) => {
  const [modalOpened, setModalOpened] = useState(false);
  const { setModalOpen } = useModal();
  const screenshots = getProjectScreenshots(project);

  return (
    <>
      <UnifiedCard
        title={project.title}
        subtitle={project.category}
        description={project.description}
        thumbnail={{
          src: screenshots.thumbnail,
          alt: project.title,
          fallbackIcon: getProjectIcon(type),
        }}
        headerIcon={getProjectIcon(type)}
        headerIconColor={type === 'vibe-coded' ? 'sakura' : 'earth'}
        statusBadge={{
          text: project.status,
          color: getStatusColor(project.status),
          contextType: 'status',
          contextValue: project.status,
        }}
        technologies={project.technologies.map(tech => ({
          name: tech,
          color: type === 'vibe-coded' ? 'sakura' : 'earth',
          contextType: 'technology' as const,
          contextValue: tech,
        }))}
        aiTools={
          type === 'vibe-coded' && project.aiTools
            ? project.aiTools.map(tool => ({
                name: tool,
                color: 'sakura',
                contextType: 'aiTool' as const,
                contextValue: tool,
              }))
            : undefined
        }
        timeline={project.timeline}
        primaryAction={
          project.liveUrl
            ? {
                label: 'Live Site',
                icon: <IconExternalLink size={14} />,
                href: project.liveUrl,
                tooltip: 'View Live Site',
              }
            : undefined
        }
        secondaryAction={
          project.githubUrl
            ? {
                label: 'Source Code',
                icon: <IconBrandGithub size={14} />,
                href: project.githubUrl,
                tooltip: 'View Source Code',
              }
            : undefined
        }
        enableTechnicalDetails={project.enableTechnicalDetails}
        onTechnicalDetailsClick={() => {
          setModalOpened(true);
          setModalOpen(true);
        }}
        limitBadges={true}
        variant="default"
        size="md"
        interactive={true}
        hoverable={true}
      />

      {/* Technical Details Modal */}
      <LazyTechnicalDetailsModal
        project={project}
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setModalOpen(false);
        }}
      />
    </>
  );
});

ExpandableProjectCard.displayName = 'ExpandableProjectCard';

export default ExpandableProjectCard;
