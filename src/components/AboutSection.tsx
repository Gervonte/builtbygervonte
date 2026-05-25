'use client';

import {
  aboutData,
  getSkillsByCategory,
  getThemeAwareSkillColor,
  getThemeAwareSkillVariant,
  type Skill,
} from '@/lib/about';
import { useColorCombinations, useCommonColors } from '@/lib/theme-aware-colors';
import { useTheme } from '@/lib/theme-context';
import {
  Badge,
  Box,
  Container,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconApi,
  IconBrandCss3,
  IconBrandGit,
  IconBrandGithub,
  IconBrandGraphql,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandReact,
  IconBrandTypescript,
  IconCloud,
  IconCode,
  IconDatabase,
  IconRobot,
  IconSchool,
  IconShield,
  IconTarget,
  IconTools,
  IconUsers,
} from '@tabler/icons-react';
import { memo } from 'react';
import BadgeWithTooltip from './BadgeWithTooltip';
import ThemeIconWithTooltip from './ThemeIconWithTooltip';
import UnifiedCard from './UnifiedCard';

// Use data from metadata file
const { personalInfo, education, researchProjects, leadership } = aboutData;

// Utility function to get icon component from string
const getCategoryIconComponent = (category: Skill['category']) => {
  switch (category) {
    case 'frontend':
      return <IconCode size={16} />;
    case 'backend':
      return <IconDatabase size={16} />;
    case 'database':
      return <IconDatabase size={16} />;
    case 'devops':
      return <IconCloud size={16} />;
    case 'tools':
      return <IconTools size={16} />;
    case 'ai-ml':
      return <IconRobot size={16} />;
    case 'soft':
      return <IconUsers size={16} />;
    default:
      return <IconCode size={16} />;
  }
};

// Utility function to get display name for category
const getCategoryDisplayName = (category: string) => {
  switch (category) {
    case 'frontend':
      return 'Frontend';
    case 'backend':
      return 'Backend';
    case 'database':
      return 'Database';
    case 'devops':
      return 'DevOps & Workflow';
    case 'tools':
      return 'Development Tools';
    case 'ai-ml':
      return 'AI';
    case 'soft':
      return 'Soft Skills';
    default:
      return category.charAt(0).toUpperCase() + category.slice(1);
  }
};

// Utility function to get ELI5 description for category
const getCategoryELI5Description = (category: string): string => {
  switch (category) {
    case 'frontend':
      return 'What users see and click on';
    case 'backend':
      return 'The hidden engine that powers everything';
    case 'database':
      return 'Where application data is stored, queried, and secured';
    case 'devops':
      return 'Getting software from code to users';
    case 'tools':
      return 'The digital toolbox that helps developers work smarter';
    case 'ai-ml':
      return 'AI copilots and workflow tools that sharpen product and engineering work';
    case 'soft':
      return 'The people skills that make technical work successful';
    default:
      return 'Essential skills for modern development';
  }
};

// Utility function to get skill icon component
const getSkillIconComponent = (skillName: string) => {
  const skillLower = skillName.toLowerCase();

  switch (skillLower) {
    // Frontend Technologies
    case 'react':
      return <IconBrandReact size={16} />;
    case 'typescript':
      return <IconBrandTypescript size={16} />;
    case 'javascript':
      return <IconBrandJavascript size={16} />;
    case 'html':
      return <IconBrandHtml5 size={16} />;
    case 'css':
      return <IconBrandCss3 size={16} />;

    // Backend Technologies
    case 'python':
      return <IconBrandPython size={16} />;
    case 'node.js':
    case 'nodejs':
      return <IconBrandNodejs size={16} />;
    case 'express':
      return <IconCode size={16} />; // Express uses generic code icon
    case 'rest apis':
      return <IconApi size={16} />;
    case 'graphql':
      return <IconBrandGraphql size={16} />;

    // Database
    case 'postgresql':
    case 'supabase':
      return <IconDatabase size={16} />;
    case 'supabase auth':
      return <IconShield size={16} />;

    // DevOps & Tools
    case 'git':
      return <IconBrandGit size={16} />;
    case 'github actions':
      return <IconBrandGithub size={16} />;
    case 'vercel':
      return <IconCloud size={16} />;
    case 'sentry':
      return <IconShield size={16} />;
    case 'codex':
      return <IconRobot size={16} />;
    case 'linear mcp':
      return <IconRobot size={16} />;

    // Default fallback
    default:
      return <IconCode size={16} />;
  }
};

const AboutSection = memo(() => {
  const colorCombinations = useColorCombinations();
  const commonColors = useCommonColors();
  const { currentTheme, resolvedColorScheme } = useTheme();
  const skillCategories = getSkillsByCategory();

  return (
    <Container size="lg">
      <Stack gap="xl">
        {/* Hero Section */}
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
            Qualifications
          </Title>
          <Text size="xl" c={commonColors.textSecondary} maw={800} mx="auto">
            {personalInfo.summary}
          </Text>
        </Box>

        {/* Skills Section */}
        <Box>
          <Title order={2} ta="center" mb="xl">
            Technical Skills
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {Object.entries(skillCategories).map(([category, categorySkills]) => (
              <UnifiedCard
                key={category}
                title={`${getCategoryDisplayName(category)} Skills`}
                subtitle={getCategoryELI5Description(category)}
                subtitleColor="dimmed"
                headerIcon={getCategoryIconComponent(category as Skill['category'])}
                headerIconColor="sakura"
                size="md"
                interactive={false}
                hoverable={true}
              >
                <Stack gap="sm">
                  {categorySkills.map(skill => (
                    <Group key={skill.name} justify="space-between" align="center">
                      <Group gap="xs" align="center">
                        <ThemeIconWithTooltip
                          technologyName={skill.name}
                          color={getThemeAwareSkillColor(
                            skill.level,
                            currentTheme,
                            resolvedColorScheme
                          )}
                          variant={getThemeAwareSkillVariant(
                            skill.level,
                            currentTheme,
                            resolvedColorScheme
                          )}
                          size="sm"
                          radius="sm"
                        >
                          {getSkillIconComponent(skill.name)}
                        </ThemeIconWithTooltip>
                        <Text size="sm" fw={500}>
                          {skill.name}
                        </Text>
                      </Group>
                      <BadgeWithTooltip
                        contextType="skill"
                        contextValue={skill.level}
                        color={getThemeAwareSkillColor(
                          skill.level,
                          currentTheme,
                          resolvedColorScheme
                        )}
                        variant={getThemeAwareSkillVariant(
                          skill.level,
                          currentTheme,
                          resolvedColorScheme
                        )}
                        size="sm"
                      >
                        {skill.level}
                      </BadgeWithTooltip>
                    </Group>
                  ))}
                </Stack>
              </UnifiedCard>
            ))}
          </SimpleGrid>
        </Box>

        {/* Experience Timeline
        <Box>
          <Title order={2} ta="center" mb="xl">
            Professional Experience
          </Title>
          <Timeline
            active={experience.length - 1}
            bulletSize={24}
            lineWidth={2}
          >
            {experience.map((exp, index) => (
              <Timeline.Item
                key={index}
                bullet={<IconBriefcase size={12} />}
                title={
                  <Group>
                    <Text fw={600} size="lg">
                      {exp.title}
                    </Text>
                    <Badge 
                      color="sakura" 
                      variant="light"
                      style={{
                        cursor: 'default',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      {exp.period}
                    </Badge>
                  </Group>
                }
              >
                <Text fw={500} c="sakura" size="md" mb="xs">
                  {exp.company}
                </Text>
                <Text mb="md" c="gray.6">
                  {exp.description}
                </Text>
                <Group mb="sm">
                  <Text size="sm" fw={500}>
                    Highlights:
                  </Text>
                  <Group gap="xs">
                    {exp.technologies.map(tech => (
                      <Badge
                        key={tech}
                        size="sm"
                        variant="outline"
                        color="sakura"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </Group>
                </Group>
                <List size="sm" spacing="xs">
                  {exp.achievements.map((achievement, idx) => (
                    <List.Item key={idx}>{achievement}</List.Item>
                  ))}
                </List>
              </Timeline.Item>
            ))}
          </Timeline>
        </Box> */}

        {/* Research Projects */}
        <Box>
          <Title order={2} ta="center" mb="xl">
            Graduate Research Projects
          </Title>
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
            {researchProjects.map((project, index) => (
              <UnifiedCard
                key={index}
                title={project.title}
                subtitle={project.description}
                subtitleColor="dimmed"
                headerIcon={<IconTarget size={20} />}
                headerIconColor="sakura"
                timeline={project.period}
                technologies={project.technologies.map(tech => ({
                  name: tech,
                  color: 'sakura',
                  contextType: 'technology' as const,
                  contextValue: tech,
                }))}
                achievements={project.achievements}
                professionalAchievements={true}
                variant="default"
                size="lg"
                interactive={false}
                hoverable={true}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Education & Certifications */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <UnifiedCard
              title="Education"
              headerIcon={<IconSchool size={20} />}
              headerIconColor="sakura"
              size="md"
              interactive={false}
              hoverable={true}
            >
              <Stack gap="md">
                {education.map((edu, index) => {
                  // Extract GPA from description if it exists
                  const gpaMatch = edu.description?.match(/GPA:\s*([\d.]+)/);
                  const gpa = gpaMatch ? gpaMatch[1] : null;
                  const descriptionWithoutGpa = edu.description
                    ?.replace(/GPA:\s*[\d.]+/, '')
                    .trim();

                  return (
                    <Box key={index}>
                      <Box style={{ flex: 1 }}>
                        <Group justify="space-between" align="center" mb="xs">
                          <Text fw={600} size="md">
                            {edu.degree}
                          </Text>
                          {gpa && (
                            <Badge
                              color="sakura"
                              variant="light"
                              size="md"
                              radius="md"
                              style={{
                                cursor: 'default',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              GPA: {gpa}
                            </Badge>
                          )}
                        </Group>
                        <Text c="sakura" size="sm" mb="xs">
                          {edu.institution} • {edu.year}
                        </Text>
                        <Text size="sm" c={commonColors.textSecondary} mb="xs">
                          {edu.location}
                        </Text>
                        {descriptionWithoutGpa && (
                          <Text size="sm" c={commonColors.textSecondary}>
                            {descriptionWithoutGpa}
                          </Text>
                        )}
                      </Box>
                      {index < education.length - 1 && <Divider my="md" style={{ opacity: 0 }} />}
                    </Box>
                  );
                })}
              </Stack>
            </UnifiedCard>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <UnifiedCard
              title="Leadership"
              headerIcon={<IconUsers size={20} />}
              headerIconColor="sakura"
              size="md"
              interactive={false}
              hoverable={true}
            >
              <Stack gap="md">
                {leadership.map((role, index) => (
                  <Box key={index}>
                    <Box style={{ flex: 1 }}>
                      <Group justify="space-between" align="center" mb="xs">
                        <Text fw={600} size="md">
                          {role.name}
                        </Text>
                        <BadgeWithTooltip
                          contextType="leadership"
                          contextValue={role.clubAbbreviation}
                          color="sakura"
                          variant="light"
                          size="md"
                          radius="md"
                        >
                          {role.clubAbbreviation}
                        </BadgeWithTooltip>
                      </Group>
                      <Text c="sakura" size="sm" mb="xs">
                        {role.organization}
                      </Text>
                      {role.description && (
                        <Text size="sm" c={commonColors.textSecondary}>
                          {role.description}
                        </Text>
                      )}
                    </Box>
                    {index < leadership.length - 1 && <Divider my="md" style={{ opacity: 0 }} />}
                  </Box>
                ))}
              </Stack>
            </UnifiedCard>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
