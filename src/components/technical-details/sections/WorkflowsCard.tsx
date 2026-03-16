'use client';

import { Card, Group, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { memo } from 'react';
import { MobileTooltip } from '../../MobileTooltip';
import { SectionCardProps } from '../types';

const WorkflowsCard = memo(({ section, commonColors }: SectionCardProps) => {
  if (!section.workflows || !Array.isArray(section.workflows) || section.workflows.length === 0) {
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
          <IconSettings size={24} />
        </ThemeIcon>
        <Group gap="xs" align="center">
          <Title order={5} fw={700} c={commonColors.textPrimary}>
            CI/CD Workflows
          </Title>
          <MobileTooltip
            label="Automated processes for testing, building, and deploying code changes without manual intervention."
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
        {section.workflows.map((workflow: string, index: number) => (
          <Card
            key={index}
            padding="lg"
            radius="md"
            withBorder
            style={{
              textAlign: 'center',
              transition: 'all 0.2s ease-in-out',
              cursor: 'default',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = commonColors.accentPrimary;
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = commonColors.borderPrimary;
            }}
          >
            <Text size="md" fw={600} c={commonColors.textPrimary}>
              {workflow}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Card>
  );
});

WorkflowsCard.displayName = 'WorkflowsCard';

export default WorkflowsCard;
