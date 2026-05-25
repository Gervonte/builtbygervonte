'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Container, SimpleGrid, Stack } from '@mantine/core';
import { memo } from 'react';
import BaseSkeleton from './BaseSkeleton';

const WatchSectionSkeleton = memo(() => {
  const commonColors = useCommonColors();

  return (
    <Container size="lg">
      <Stack gap="xl">
        <Box ta="center" mb="md">
          <BaseSkeleton height={28} width={110} radius="xl" />
          <Box mt="md" mx="auto" maw={760}>
            <BaseSkeleton height={48} width="80%" radius="md" />
            <Box mt="md">
              <BaseSkeleton height={24} width="100%" radius="md" />
            </Box>
          </Box>
        </Box>

        <Box
          p="xl"
          style={{
            border: `1px solid ${commonColors.borderPrimary}`,
            borderRadius: '8px',
            boxShadow: commonColors.shadowCard,
          }}
        >
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Stack gap="md" justify="center">
              <BaseSkeleton height={26} width={140} radius="xl" />
              <BaseSkeleton height={36} width="90%" radius="md" />
              <BaseSkeleton height={18} width="100%" radius="sm" />
              <BaseSkeleton height={18} width="85%" radius="sm" />
              <BaseSkeleton height={38} width={170} radius="md" />
            </Stack>
            <BaseSkeleton height={280} width="100%" radius="md" />
          </SimpleGrid>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {Array.from({ length: 6 }).map((_, index) => (
            <Box
              key={index}
              p="lg"
              style={{
                border: `1px solid ${commonColors.borderPrimary}`,
                borderRadius: '8px',
                boxShadow: commonColors.shadowCard,
              }}
            >
              <Stack gap="md">
                <BaseSkeleton height={160} width="100%" radius="md" />
                <BaseSkeleton height={24} width="75%" radius="md" />
                <BaseSkeleton height={16} width="100%" radius="sm" />
                <BaseSkeleton height={16} width="80%" radius="sm" />
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
});

WatchSectionSkeleton.displayName = 'WatchSectionSkeleton';

export default WatchSectionSkeleton;
