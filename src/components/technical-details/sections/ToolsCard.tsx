'use client';

import { Card, Group, ThemeIcon, Title } from '@mantine/core';
import { IconTools } from '@tabler/icons-react';
import { memo } from 'react';
import BadgeWithTooltip from '../../BadgeWithTooltip';
import { MobileTooltip } from '../../MobileTooltip';
import { SectionCardProps } from '../types';

const ToolsCard = memo(({ section, commonColors }: SectionCardProps) => {
  if (!section.tools || !Array.isArray(section.tools) || section.tools.length === 0) {
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
      <Group gap="sm" mb="sm">
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
          <IconTools size={24} />
        </ThemeIcon>
        <Group gap="xs" align="center">
          <Title order={5} fw={700} c={commonColors.textPrimary}>
            Tools & Technologies
          </Title>
          <MobileTooltip
            label="Programming languages, frameworks, and tools used to build this project."
            multiline
            w={300}
            withArrow
          >
            <ThemeIcon
              color={commonColors.accentPrimary}
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
      <Group gap="sm">
        {section.tools.map((tool: string) => (
          <BadgeWithTooltip
            key={tool}
            contextType="technology"
            contextValue={tool}
            size="sm"
            color={commonColors.accentPrimary}
            variant="light"
          >
            {tool}
          </BadgeWithTooltip>
        ))}
      </Group>
    </Card>
  );
});

ToolsCard.displayName = 'ToolsCard';

export default ToolsCard;
