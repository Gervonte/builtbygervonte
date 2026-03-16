'use client';

import { Box, Card, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconBuilding } from '@tabler/icons-react';
import { memo } from 'react';
import BadgeWithTooltip from '../../BadgeWithTooltip';
import { MobileTooltip } from '../../MobileTooltip';
import { SectionCardProps } from '../types';

const ArchitectureCard = memo(({ section, commonColors }: SectionCardProps) => {
  const hasComponents =
    section.components && Array.isArray(section.components) && section.components.length > 0;
  const hasDeployment = section.deployment;

  if (!hasComponents && !hasDeployment) {
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
          <IconBuilding size={24} />
        </ThemeIcon>
        <Group gap="xs" align="center">
          <Title order={5} fw={700} c={commonColors.textPrimary}>
            Architecture & Deployment
          </Title>
          <MobileTooltip
            label="Technical blueprint and deployment strategy - the foundation and delivery system."
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
      <Stack gap="sm">
        {hasComponents ? (
          <Box
            p="lg"
            style={{
              background: commonColors.backgroundModal,
              borderRadius: '12px',
            }}
          >
            <Text size="sm" c={commonColors.textSecondary} fw={600} mb="sm">
              Key Components
            </Text>
            <Group gap="sm">
              {(section.components as string[]).map((component: string) => (
                <BadgeWithTooltip
                  key={component}
                  contextType="technology"
                  contextValue={component}
                  size="sm"
                  variant="outline"
                  color={commonColors.accentPrimary}
                >
                  {component}
                </BadgeWithTooltip>
              ))}
            </Group>
          </Box>
        ) : null}
        {hasDeployment ? (
          <Box
            p="lg"
            style={{
              background: commonColors.backgroundModal,
              borderRadius: '12px',
            }}
          >
            <Text size="sm" c={commonColors.textSecondary} fw={600} mb="sm">
              Deployment
            </Text>
            <Text size="md" fw={600} c={commonColors.textPrimary}>
              {String(section.deployment)}
            </Text>
          </Box>
        ) : null}
      </Stack>
    </Card>
  );
});

ArchitectureCard.displayName = 'ArchitectureCard';

export default ArchitectureCard;
