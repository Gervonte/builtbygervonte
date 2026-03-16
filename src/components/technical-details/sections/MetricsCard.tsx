'use client';

import { Card, Group, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import { IconChartBar } from '@tabler/icons-react';
import { memo } from 'react';
import { MobileTooltip } from '../../MobileTooltip';
import { SectionCardProps } from '../types';

const MetricsCard = memo(({ section, commonColors }: SectionCardProps) => {
  if (!section.metrics || Object.keys(section.metrics).length === 0) {
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
          <IconChartBar size={24} />
        </ThemeIcon>
        <Group gap="xs" align="center">
          <Title order={5} fw={700} c={commonColors.textPrimary}>
            Key Metrics
          </Title>
          <MobileTooltip
            label="Performance indicators - visitor counts, session duration, and engagement metrics."
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
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }} spacing="sm">
        {Object.entries(section.metrics).map(([metricKey, value]) => (
          <Card
            key={metricKey}
            padding="lg"
            radius="md"
            style={{
              textAlign: 'center',
              transition: 'all 0.2s ease-in-out',
              cursor: 'default',
              transform: 'scale(1)',
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
            <Text
              size="xs"
              c={commonColors.textSecondary}
              tt="uppercase"
              fw={600}
              mb="xs"
              style={{ letterSpacing: '0.5px' }}
            >
              {metricKey.replace(/([A-Z])/g, ' $1').trim()}
            </Text>
            <Text size="xl" fw={800} c={commonColors.accentPrimary}>
              {String(value)}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Card>
  );
});

MetricsCard.displayName = 'MetricsCard';

export default MetricsCard;
