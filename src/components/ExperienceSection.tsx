'use client';

import { aboutData } from '@/lib/about';
import { useColorCombinations } from '@/lib/theme-aware-colors';
import { Box, Container, Stack, Text, Timeline, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBriefcase, IconExternalLink, IconMapPin } from '@tabler/icons-react';
import { memo } from 'react';
import UnifiedCard from './UnifiedCard';

const ExperienceSection = memo(() => {
  const { experience } = aboutData;
  const colorCombinations = useColorCombinations();
  const isMobile = useMediaQuery('(max-width: 48em)');
  const shouldUseTimeline = experience.length > 1 && !isMobile;

  const getExperienceLocation = (company: string, location?: string) => {
    if (location) return location;
    if (company === 'NovaCredit' || company === 'Nova Credit') return 'San Francisco, California';
    return undefined;
  };

  const getExperienceCompanyUrl = (company: string, companyUrl?: string) => {
    if (companyUrl) return companyUrl;
    if (company === 'NovaCredit' || company === 'Nova Credit') return 'https://novacredit.com';
    return undefined;
  };

  return (
    <Container size="lg">
      <Stack gap="xl">
        {/* Header */}
        <Box ta="center" mb="xl">
          <Title
            order={1}
            size="h1"
            mb="md"
            style={{
              backgroundImage: colorCombinations.primaryGradient,
              backgroundSize: '100% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Professional Experience
          </Title>
          <Text size="xl" c="dimmed" maw={800} mx="auto">
            Building scalable software solutions and leading technical initiatives in fintech
          </Text>
        </Box>

        {/* Experience Timeline or Single Card */}
        {shouldUseTimeline ? (
          <Timeline bulletSize={24} lineWidth={2}>
            {experience.map((exp, index) => {
              const experienceLocation = getExperienceLocation(exp.company, exp.location);
              const experienceCompanyUrl = getExperienceCompanyUrl(exp.company, exp.companyUrl);

              return (
                <Timeline.Item key={`${exp.company}-${exp.title}-${index}`}>
                  <UnifiedCard
                    title={exp.company}
                    subtitle={exp.title}
                    description={exp.description}
                    longDescription={exp.longDescription}
                    headerIcon={<IconBriefcase size={20} />}
                    headerIconColor="sakura"
                    timeline={exp.period}
                    metadata={[
                      ...(experienceLocation
                        ? [
                            {
                              icon: <IconMapPin size={14} />,
                              text: experienceLocation,
                            },
                          ]
                        : []),
                    ]}
                    secondaryAction={
                      experienceCompanyUrl
                        ? {
                            label: 'Website',
                            icon: <IconExternalLink size={14} />,
                            href: experienceCompanyUrl,
                            tooltip: `Visit ${exp.company} website`,
                          }
                        : undefined
                    }
                    technologies={exp.technologies?.map(tech => ({
                      name: tech,
                      color: 'sakura',
                      contextType: 'technology' as const,
                      contextValue: tech,
                    }))}
                    achievements={exp.achievements}
                    professionalAchievements={true}
                    infoBoxDescription={true}
                    variant="default"
                    size="md"
                    interactive={false}
                    hoverable={true}
                  />
                </Timeline.Item>
              );
            })}
          </Timeline>
        ) : (
          <Stack gap="md">
            {experience.map((exp, index) => {
              const experienceLocation = getExperienceLocation(exp.company, exp.location);
              const experienceCompanyUrl = getExperienceCompanyUrl(exp.company, exp.companyUrl);

              return (
                <UnifiedCard
                  key={`${exp.company}-${exp.title}-${index}`}
                  title={exp.company}
                  subtitle={exp.title}
                  description={exp.description}
                  longDescription={exp.longDescription}
                  headerIcon={<IconBriefcase size={20} />}
                  headerIconColor="sakura"
                  timeline={exp.period}
                  metadata={[
                    ...(experienceLocation
                      ? [
                          {
                            icon: <IconMapPin size={14} />,
                            text: experienceLocation,
                          },
                        ]
                      : []),
                  ]}
                  secondaryAction={
                    experienceCompanyUrl
                      ? {
                          label: 'Website',
                          icon: <IconExternalLink size={14} />,
                          href: experienceCompanyUrl,
                          tooltip: `Visit ${exp.company} website`,
                        }
                      : undefined
                  }
                  technologies={exp.technologies?.map(tech => ({
                    name: tech,
                    color: 'sakura',
                    contextType: 'technology' as const,
                    contextValue: tech,
                  }))}
                  achievements={exp.achievements}
                  professionalAchievements={true}
                  infoBoxDescription={true}
                  variant="default"
                  size="md"
                  interactive={false}
                  hoverable={true}
                />
              );
            })}
          </Stack>
        )}
      </Stack>
    </Container>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

export default ExperienceSection;
