'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { Box, List, Stack, Text } from '@mantine/core';
import { memo } from 'react';
import { AchievementsSectionProps } from '../types';

const AchievementsSection = memo(
  ({ achievements, highlights, professionalAchievements }: AchievementsSectionProps) => {
    const commonColors = useCommonColors();

    if (achievements.length === 0 && highlights.length === 0) return null;

    return (
      <Box mb="sm">
        {professionalAchievements ? (
          <Stack gap="sm">
            {(achievements.length > 0 ? achievements : highlights).slice(0, 3).map((item, idx) => (
              <Text key={idx} size="sm" lh={1.5} c={commonColors.textSecondary} fs="italic">
                {item}
              </Text>
            ))}
          </Stack>
        ) : (
          <List size="sm" spacing="xs">
            {(achievements.length > 0 ? achievements : highlights).slice(0, 3).map((item, idx) => (
              <List.Item key={idx}>{item}</List.Item>
            ))}
          </List>
        )}
      </Box>
    );
  }
);

AchievementsSection.displayName = 'AchievementsSection';

export default AchievementsSection;
