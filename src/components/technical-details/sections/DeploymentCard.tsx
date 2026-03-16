'use client';

import { Card, Group, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import { IconCode } from '@tabler/icons-react';
import { memo } from 'react';
import { MobileTooltip } from '../../MobileTooltip';
import { SectionCardProps } from '../types';

const DeploymentCard = memo(({ section, commonColors }: SectionCardProps) => {
  if (!section.deploymentFrequency && !section.leadTime) {
    return null;
  }

  return (
    <Card
      padding="xl"
      radius="md"
      style={{
        boxShadow: `0 2px 8px ${commonColors.shadowLight}`,
        transition: 'all 0.2s ease-in-out',
        transform: 'scale(1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.02)';
        e.currentTarget.style.boxShadow = `0 4px 16px ${commonColors.shadowMedium}`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = `0 2px 8px ${commonColors.shadowLight}`;
      }}
    >
      <Group gap="sm" mb="md">
        <ThemeIcon
          color={commonColors.accentPrimary}
          variant="light"
          size="lg"
          style={{
            cursor: 'default',
            transition: 'all 0.2s ease-in-out',
            transform: 'scale(1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = `0 4px 12px ${commonColors.shadowMedium}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <IconCode size={24} />
        </ThemeIcon>
        <Group gap="xs" align="center">
          <Title order={5} fw={700} c={commonColors.textPrimary}>
            Deployment Metrics
          </Title>
          <MobileTooltip
            label="Release frequency and speed metrics - how often and how quickly updates are deployed."
            multiline
            w={300}
            withArrow
          >
            <ThemeIcon
              color="sakura"
              variant="light"
              size="sm"
              radius="xl"
              style={{ cursor: 'help' }}
            >
              ?
            </ThemeIcon>
          </MobileTooltip>
        </Group>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
        {section.deploymentFrequency ? (
          <Card padding="sm" radius="md">
            <Text size="sm" c={commonColors.textSecondary} fw={600} mb="xs">
              Deployment Frequency
            </Text>
            <Text size="lg" fw={800} c={commonColors.accentPrimary}>
              {String(section.deploymentFrequency)}
            </Text>
          </Card>
        ) : null}
        {section.leadTime ? (
          <Card padding="sm" radius="md">
            <Text size="sm" c={commonColors.textSecondary} fw={600} mb="xs">
              Lead Time
            </Text>
            <Text size="lg" fw={800} c={commonColors.accentPrimary}>
              {String(section.leadTime)}
            </Text>
          </Card>
        ) : null}
      </SimpleGrid>
    </Card>
  );
});

DeploymentCard.displayName = 'DeploymentCard';

export default DeploymentCard;
