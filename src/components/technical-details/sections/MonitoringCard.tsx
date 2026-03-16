'use client';

import { Card, Group, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import { IconChartBar } from '@tabler/icons-react';
import { memo } from 'react';
import { MobileTooltip } from '../../MobileTooltip';
import { SectionCardProps } from '../types';

const MonitoringCard = memo(({ section, commonColors }: SectionCardProps) => {
  if (!section.uptime && !section.errorRate) {
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
          <IconChartBar size={24} />
        </ThemeIcon>
        <Group gap="xs" align="center">
          <Title order={5} fw={700} c={commonColors.textPrimary}>
            System Health
          </Title>
          <MobileTooltip
            label="Reliability metrics - uptime percentage and error rates to ensure stable operation."
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
        {section.uptime ? (
          <Card padding="sm" radius="md">
            <Text size="sm" c={commonColors.textSecondary} fw={600} mb="xs">
              Uptime
            </Text>
            <Text size="xl" fw={800} c={commonColors.accentPrimary}>
              {String(section.uptime)}
            </Text>
          </Card>
        ) : null}
        {section.errorRate ? (
          <Card padding="sm" radius="md">
            <Text size="sm" c={commonColors.textSecondary} fw={600} mb="xs">
              Error Rate
            </Text>
            <Text size="xl" fw={800} c={commonColors.textSecondary}>
              {String(section.errorRate)}
            </Text>
          </Card>
        ) : null}
      </SimpleGrid>
    </Card>
  );
});

MonitoringCard.displayName = 'MonitoringCard';

export default MonitoringCard;
