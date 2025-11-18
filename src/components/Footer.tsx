'use client';

import { useColorCombinations, useCommonColors } from '@/lib/theme-aware-colors';
import {
  Anchor,
  Box,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCode,
  IconHeart,
  IconMail,
  IconMapPin,
} from '@tabler/icons-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Theme-aware colors
  const colorCombinations = useColorCombinations();
  const commonColors = useCommonColors();

  return (
    <Box
      component="footer"
      style={{
        background: colorCombinations.footerGradient,
        padding: '4rem 0 2rem',
        marginTop: '1rem',
        position: 'relative',
        overflow: 'hidden',
        borderTop: `1px solid ${commonColors.borderSecondary}`,
      }}
    >
      {/* Enhanced Sakura petal decoration */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 0L60 40L100 50L60 60L50 100L40 60L0 50L40 40Z' fill='%23F8BBD9' opacity='0.08'/%3E%3C/svg%3E\")",
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap="xl">
          {/* Header Section */}
          <Box ta="center" mb="xl">
            <Group justify="center" gap="md" mb="md">
              <IconCode size={32} style={{ color: commonColors.accentPrimary }} />
              <Title
                order={2}
                size="h2"
                style={{
                  backgroundImage: colorCombinations.primaryGradient,
                  backgroundSize: '100% 100%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Gervonte&apos;s Portfolio
              </Title>
            </Group>
            <Text size="lg" c="dimmed" maw={600} mx="auto" mb="md">
              M.S. Computer Science | 2 Years of Engineering Experience at Series B Fintech Startup
            </Text>
          </Box>

          {/* Main Footer Content */}
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl">
            {/* About Section */}
            <Stack gap="md">
              <Title order={4} c={commonColors.textPrimary}>
                About
              </Title>
              <Text size="sm" c="dimmed" lh={1.6}>
                Professional portfolio showcasing AI-assisted and traditional development work with
                a touch of mono no aware aesthetics.
              </Text>
              <Group gap="xs">
                <IconMapPin size={16} style={{ color: commonColors.accentPrimary }} />
                <Text size="sm" c="dimmed">
                  Available for opportunities
                </Text>
              </Group>
            </Stack>

            {/* Quick Links */}
            <Stack gap="md">
              <Title order={4} c={commonColors.textPrimary}>
                Navigation
              </Title>
              <Stack gap="xs">
                {[
                  { label: 'Work & Projects', href: '#work' },
                  { label: 'Experience', href: '#experience' },
                  { label: 'About Me', href: '#about' },
                  { label: 'Contact', href: '#contact' },
                ].map(link => (
                  <Anchor
                    key={link.label}
                    href={link.href}
                    size="sm"
                    c={commonColors.textSecondary}
                    style={{
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = commonColors.accentPrimary;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = commonColors.textSecondary;
                    }}
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>
            </Stack>

            {/* Connect Section */}
            <Stack gap="md">
              <Title order={4} c={commonColors.textPrimary}>
                Connect
              </Title>
              <Stack gap="sm">
                <Anchor
                  href="https://github.com/gervonte"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: commonColors.textSecondary,
                    transition: 'color 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = commonColors.accentPrimary;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = commonColors.textSecondary;
                  }}
                >
                  <IconBrandGithub size={18} />
                  GitHub
                </Anchor>
                <Anchor
                  href="https://www.linkedin.com/in/gervonte-fowler-5a7781158"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: commonColors.textSecondary,
                    transition: 'color 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = commonColors.accentPrimary;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = commonColors.textSecondary;
                  }}
                >
                  <IconBrandLinkedin size={18} />
                  LinkedIn
                </Anchor>
                <Anchor
                  href="mailto:gervonte@builtbygervonte.com"
                  style={{
                    color: commonColors.textSecondary,
                    transition: 'color 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = commonColors.accentPrimary;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = commonColors.textSecondary;
                  }}
                >
                  <IconMail size={18} />
                  Email
                </Anchor>
              </Stack>
            </Stack>

            {/* Tech Stack */}
            <Stack gap="md">
              <Title order={4} c={commonColors.textPrimary}>
                Built With
              </Title>
              <Text size="sm" c="dimmed" lh={1.6}>
                Built with Cursor AI, Next.js, TypeScript, Mantine UI, and sakura.js for a modern,
                responsive experience.
              </Text>
              <Group gap="xs">
                <IconHeart size={16} style={{ color: commonColors.accentPrimary }} />
                <Text size="xs" c="dimmed">
                  Made with passion and sakura petals
                </Text>
              </Group>
            </Stack>
          </SimpleGrid>

          <Divider color="rgba(248, 187, 217, 0.4)" />

          {/* Copyright */}
          <Group justify="center" align="center">
            <Text size="sm" c="dimmed">
              © {currentYear} Gervonte Fowler. All rights reserved.
            </Text>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
