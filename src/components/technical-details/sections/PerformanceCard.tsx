'use client';

import { Box, Card, Group, Progress, Text, ThemeIcon, Title } from '@mantine/core';
import { IconActivity, IconRocket } from '@tabler/icons-react';
import { memo } from 'react';
import { MobileTooltip } from '../../MobileTooltip';
import { SectionCardProps } from '../types';

const PerformanceCard = memo(({ section, commonColors }: SectionCardProps) => {
  const hasLighthouseScore = section.lighthouseScore;
  const hasCoreWebVitals = section.coreWebVitals && Object.keys(section.coreWebVitals).length > 0;

  if (!hasLighthouseScore && !hasCoreWebVitals) {
    return null;
  }

  return (
    <>
      {/* Lighthouse Score */}
      {hasLighthouseScore && (
        <Card
          padding="lg"
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
              <IconRocket size={24} />
            </ThemeIcon>
            <Group gap="xs" align="center">
              <Title order={5} fw={700} c={commonColors.textPrimary}>
                Performance Metrics
              </Title>
              <MobileTooltip
                label="Performance indicators and optimization metrics for the application."
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
          <Box>
            <Group justify="space-between" mb="sm">
              <Text size="sm" fw={500}>
                Lighthouse Score
              </Text>
              <Text size="lg" fw={700} c={commonColors.accentPrimary}>
                {String(section.lighthouseScore)}
              </Text>
            </Group>
            <Progress
              value={Number(section.lighthouseScore)}
              color={
                Number(section.lighthouseScore) >= 90
                  ? commonColors.accentPrimary
                  : Number(section.lighthouseScore) >= 70
                    ? commonColors.accentSecondary
                    : commonColors.textSecondary
              }
              size="lg"
              radius="xl"
              style={{
                height: '12px',
              }}
            />
          </Box>
        </Card>
      )}

      {/* Core Web Vitals */}
      {hasCoreWebVitals && (
        <Card
          padding="lg"
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
              <IconActivity size={24} />
            </ThemeIcon>
            <Group gap="xs" align="center">
              <Title order={5} fw={700} c={commonColors.textPrimary}>
                Core Web Vitals
              </Title>
              <MobileTooltip
                label="Google's Core Web Vitals metrics measuring user experience and performance."
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
          <Box>
            <Group gap="sm">
              {Object.entries(section.coreWebVitals as Record<string, unknown>).map(
                ([vital, value]) => (
                  <Box
                    key={vital}
                    p="sm"
                    style={{
                      background: commonColors.backgroundModal,
                      borderRadius: '12px',
                      textAlign: 'center',
                      transition: 'all 0.2s ease-in-out',
                      transform: 'scale(1)',
                      flex: 1,
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 4px 12px ${commonColors.shadowMedium}`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Text size="xs" c={commonColors.textSecondary} tt="uppercase" fw={600} mb="xs">
                      {vital}
                    </Text>
                    <Text size="xl" fw={700} c={commonColors.accentPrimary}>
                      {String(value)}
                    </Text>
                  </Box>
                )
              )}
            </Group>
          </Box>
        </Card>
      )}
    </>
  );
});

PerformanceCard.displayName = 'PerformanceCard';

export default PerformanceCard;
