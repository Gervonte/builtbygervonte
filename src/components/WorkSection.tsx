'use client';

import { getFeaturedProjects, getProjectsByType, projectsData, type Project } from '@/lib/projects';
import { getProjectScreenshots } from '@/lib/screenshot';
import { useColorCombinations } from '@/lib/theme-aware-colors';
import { Badge, Box, Container, Group, SimpleGrid, Stack, Tabs, Text, Title } from '@mantine/core';
import {
  IconBrain,
  IconBrandGithub,
  IconCode,
  IconExternalLink,
  //IconHeart,
  IconSparkles,
  IconTools,
} from '@tabler/icons-react';
import { memo, useMemo } from 'react';
import ExpandableProjectCard from './ExpandableProjectCard';
import UnifiedCard from './UnifiedCard';

// Get projects from metadata file

const getProjectIcon = (type: Project['type']) => {
  return type === 'vibe-coded' ? <IconBrain size={20} /> : <IconCode size={20} />;
};

const getTypeColor = (type: Project['type']) => {
  return type === 'vibe-coded' ? 'sakura' : 'earth';
};

const WorkSection = memo(() => {
  const colorCombinations = useColorCombinations();
  const vibeCodedProjects = useMemo(() => getProjectsByType('vibe-coded'), []);
  const standardWorkProjects = useMemo(() => getProjectsByType('standard-work'), []);
  const featuredProjects = useMemo(() => getFeaturedProjects(), []);

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
            My Work
          </Title>
          <Text size="xl" c="dimmed" maw={800} mx="auto">
            A showcase of my most recent projects, highlighting both &apos;vibe coded&apos;
            development and traditional programming approaches
          </Text>
        </Box>

        {/* Featured Projects */}
        <Box>
          <Group justify="center" mb="xl">
            <Title order={2} ta="center">
              Featured Projects
            </Title>
          </Group>
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns:
                featuredProjects.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '2rem',
              maxWidth: featuredProjects.length === 1 ? '600px' : 'none',
              margin: featuredProjects.length === 1 ? '0 auto' : '0',
            }}
          >
            {featuredProjects.map(project => {
              const screenshots = getProjectScreenshots(project);
              return (
                <UnifiedCard
                  key={project.id}
                  title={project.title}
                  subtitle={project.category}
                  longDescription={project.longDescription}
                  thumbnail={{
                    src: screenshots.card,
                    alt: `${project.title} preview`,
                    fallbackIcon: getProjectIcon(project.type),
                    objectPosition: project.thumbnailPosition?.featured,
                    scale: project.thumbnailScale?.featured,
                  }}
                  headerIcon={getProjectIcon(project.type)}
                  headerIconColor={getTypeColor(project.type)}
                  statusBadge={{
                    text: project.type === 'vibe-coded' ? 'Vibe Coded' : 'Traditional',
                    color: getTypeColor(project.type),
                    contextType: 'projectType',
                    contextValue: project.type,
                  }}
                  technologies={project.technologies.map(tech => ({
                    name: tech,
                    color: getTypeColor(project.type),
                    contextType: 'technology' as const,
                    contextValue: tech,
                  }))}
                  aiTools={project.aiTools?.map(tool => ({
                    name: tool,
                    color: 'sakura',
                    contextType: 'aiTool' as const,
                    contextValue: tool,
                  }))}
                  timeline={project.timeline}
                  primaryAction={
                    project.liveUrl
                      ? {
                          label: 'Live Demo',
                          icon: <IconExternalLink size={14} />,
                          href: project.liveUrl,
                          tooltip: 'View Live Demo',
                        }
                      : undefined
                  }
                  secondaryAction={
                    project.githubUrl
                      ? {
                          label: 'Source Code',
                          icon: <IconBrandGithub size={14} />,
                          href: project.githubUrl,
                          tooltip: 'View Source Code',
                        }
                      : undefined
                  }
                  variant="elevated"
                  size="lg"
                  interactive={true}
                  hoverable={true}
                />
              );
            })}
          </Box>
        </Box>

        {/* Work Categories Tabs */}
        <Tabs defaultValue="vibe-coded" variant="pills" color="sakura">
          <Tabs.List justify="center" mb="xl">
            <Tabs.Tab value="vibe-coded" leftSection={<IconBrain size={16} />} fw={600}>
              Vibe Coded
            </Tabs.Tab>
            <Tabs.Tab value="standard-work" leftSection={<IconCode size={16} />} fw={600}>
              Traditional Work
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="vibe-coded">
            <Box>
              <Group justify="center" mb="xl">
                <Title order={2} ta="center">
                  Vibe Coded Projects
                </Title>
                <Badge
                  leftSection={<IconSparkles size={14} />}
                  color="sakura"
                  variant="light"
                  size="lg"
                  radius="xl"
                >
                  AI-Led Development
                </Badge>
              </Group>
              <Text ta="center" c="dimmed" mb="xl" maw={600} mx="auto">
                {projectsData.categories['vibe-coded'].description}
              </Text>
              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
                {vibeCodedProjects.map(project => (
                  <ExpandableProjectCard key={project.id} project={project} type="vibe-coded" />
                ))}
              </SimpleGrid>
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="standard-work">
            <Box>
              <Group justify="center" mb="xl">
                <Title order={2} ta="center">
                  Traditional Work Projects
                </Title>
                <Badge
                  leftSection={<IconTools size={14} />}
                  color="earth"
                  variant="light"
                  size="lg"
                  radius="xl"
                >
                  Hand Crafted Development
                </Badge>
              </Group>
              <Text ta="center" c="dimmed" mb="xl" maw={600} mx="auto">
                {projectsData.categories['standard-work'].description}
              </Text>
              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
                {standardWorkProjects.map(project => (
                  <ExpandableProjectCard key={project.id} project={project} type="standard-work" />
                ))}
              </SimpleGrid>
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
});

WorkSection.displayName = 'WorkSection';

export default WorkSection;
