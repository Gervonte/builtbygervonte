'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Container, SimpleGrid, Stack } from '@mantine/core';
import { memo } from 'react';
import BaseSkeleton from './BaseSkeleton';

const AboutSectionSkeleton = memo(() => {
  const commonColors = useCommonColors();

  return (
    <Container size="lg">
      <Stack gap="xl">
        {/* Hero Section */}
        <Box ta="center" mb="xl">
          <BaseSkeleton height={48} width={200} radius="md" className="skeleton-title" />
          <Box mt="md" mx="auto" maw={800}>
            <BaseSkeleton height={24} width="100%" radius="md" />
            <Box mt="xs">
              <BaseSkeleton height={24} width="85%" radius="md" />
            </Box>
          </Box>
        </Box>

        {/* Skills Section */}
        <Box>
          <Box ta="center" mb="xl">
            <BaseSkeleton height={32} width={200} radius="md" />
          </Box>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {Array.from({ length: 5 }).map((_, index) => (
              <Box
                key={index}
                p="md"
                style={{
                  border: `1px solid ${commonColors.borderPrimary}`,
                  borderRadius: '12px',
                  boxShadow: commonColors.shadowCard,
                }}
              >
                <Stack gap="sm">
                  <BaseSkeleton height={20} width="80%" radius="md" />
                  <BaseSkeleton height={16} width="100%" radius="sm" />
                  <BaseSkeleton height={16} width="90%" radius="sm" />
                  <BaseSkeleton height={16} width="80%" radius="sm" />
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Research Projects */}
        <Box>
          <Box ta="center" mb="xl">
            <BaseSkeleton height={32} width={250} radius="md" />
          </Box>
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
            {Array.from({ length: 2 }).map((_, index) => (
              <Box
                key={index}
                p="xl"
                style={{
                  border: `1px solid ${commonColors.borderPrimary}`,
                  borderRadius: '16px',
                  boxShadow: commonColors.shadowCard,
                }}
              >
                <Stack gap="md">
                  <BaseSkeleton height={24} width="80%" radius="md" />
                  <BaseSkeleton height={16} width="100%" radius="sm" />
                  <BaseSkeleton height={16} width="90%" radius="sm" />
                  <Box style={{ display: 'flex', gap: '8px' }}>
                    <BaseSkeleton height={24} width={60} radius="xl" />
                    <BaseSkeleton height={24} width={60} radius="xl" />
                    <BaseSkeleton height={24} width={60} radius="xl" />
                  </Box>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Education & Leadership */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {Array.from({ length: 2 }).map((_, index) => (
            <Box
              key={index}
              p="xl"
              style={{
                border: `1px solid ${commonColors.borderPrimary}`,
                borderRadius: '12px',
                boxShadow: commonColors.shadowCard,
              }}
            >
              <Stack gap="md">
                <BaseSkeleton height={24} width="80%" radius="md" />
                <BaseSkeleton height={16} width="100%" radius="sm" />
                <BaseSkeleton height={16} width="90%" radius="sm" />
                <BaseSkeleton height={16} width="80%" radius="sm" />
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
});

AboutSectionSkeleton.displayName = 'AboutSectionSkeleton';

export default AboutSectionSkeleton;
