'use client';

import { Box, Card, Group, Text, ThemeIcon, Title } from '@mantine/core';
import { memo } from 'react';
import { SectionCardProps } from '../types';
import { formatSectionTitle, getTechnicalIcon } from '../utils';

const OverviewCard = memo(({ section, sectionKey, commonColors }: SectionCardProps) => {
  return (
    <Card
      padding="xl"
      radius="md"
      style={{
        boxShadow: `0 2px 8px ${commonColors.shadowLight}`,
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
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
      <Group gap="sm" mb="sm" align="flex-start">
        <ThemeIcon
          color={commonColors.accentPrimary}
          variant="light"
          size="xl"
          style={{
            cursor: 'default',
            flexShrink: 0,
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
          {getTechnicalIcon(sectionKey)}
        </ThemeIcon>
        <Box style={{ flex: 1 }}>
          <Title order={3} c={commonColors.textPrimary} fw={700} mb="xs">
            {formatSectionTitle(sectionKey)} Overview
          </Title>
          <Text
            size="md"
            c={commonColors.textSecondary}
            lh={1.6}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {section.description}
          </Text>
        </Box>
      </Group>
    </Card>
  );
});

OverviewCard.displayName = 'OverviewCard';

export default OverviewCard;
