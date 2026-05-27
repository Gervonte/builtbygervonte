'use client';

import {
  useCommonColors,
  usePrimaryColors,
  useWarmColors,
  useWithOpacity,
} from '@/lib/theme-aware-colors';
import { useTheme } from '@/lib/theme-context';
import { Anchor, Box, Burger, Container, Group, Paper, Stack, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import ProfileAvatar from './ProfileAvatar';
import ThemeModeSelector from './ThemeModeSelector';
import ThemeToggle from './ThemeToggle';

const HEADER_HEIGHT = 60;
const HEADER_Z_INDEX = 1100;

interface HeaderProps {
  links: Array<{ link: string; label: string }>;
}

export default function Header({ links }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);

  // Theme-aware colors
  const { resolvedColorScheme } = useTheme();
  const commonColors = useCommonColors();
  const primaryColors = usePrimaryColors();
  const warmColors = useWarmColors();
  const withOpacity = useWithOpacity;
  const headerTextColor =
    scrolled || resolvedColorScheme !== 'dark'
      ? commonColors.textPrimary
      : commonColors.textInverse;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = links.map(link => (
    <Anchor
      key={link.label}
      href={link.link}
      size="sm"
      aria-label={`Navigate to ${link.label} section`}
      style={{
        textDecoration: 'none',
        color: headerTextColor,
        fontWeight: 500,
        transition: 'color 0.3s ease',
        position: 'relative',
      }}
      onClick={e => {
        e.preventDefault();
        const element = document.querySelector(link.link);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        close();
      }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Box
      component="header"
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: HEADER_Z_INDEX,
        transition: 'all 0.3s ease',
        background: scrolled
          ? withOpacity(warmColors[0] ?? '#FDFCFB', 0.95)
          : withOpacity(warmColors[0] ?? '#FDFCFB', 0.1),
        borderBottom: scrolled
          ? `1px solid ${withOpacity(primaryColors[1] || '#FFCDD2', 0.2)}`
          : 'none',
      }}
    >
      <Container size="lg" style={{ height: HEADER_HEIGHT }}>
        <Group justify="space-between" h="100%">
          {/* Logo */}
          <Anchor
            href="#hero"
            aria-label="Back to top"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              borderRadius: '999px',
            }}
            onClick={e => {
              e.preventDefault();
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
              close();
            }}
          >
            <ProfileAvatar />
          </Anchor>

          {/* Desktop Navigation */}
          <Group gap="xl" visibleFrom="sm" role="navigation" aria-label="Main navigation">
            {items}
            <Group gap="xs">
              <ThemeModeSelector />
              <ThemeToggle />
            </Group>
          </Group>

          {/* Mobile Menu Button */}
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            color={headerTextColor}
            hiddenFrom="sm"
            aria-label="Toggle mobile menu"
            aria-expanded={opened}
          />
        </Group>
      </Container>

      {/* Mobile Navigation */}
      <Transition transition="pop-top-right" duration={200} mounted={opened}>
        {styles => (
          <Paper
            role="navigation"
            aria-label="Mobile navigation"
            style={{
              ...styles,
              position: 'absolute',
              top: HEADER_HEIGHT,
              left: 0,
              right: 0,
              zIndex: 0,
              background: withOpacity(warmColors[0] ?? '#FDFCFB', 0.98),
              backdropFilter: 'blur(10px)',
              borderTop: `1px solid ${withOpacity(primaryColors[1] || '#FFCDD2', 0.2)}`,
            }}
            hiddenFrom="sm"
          >
            <Container py="md">
              <Stack gap="md">
                {items}
                <Group justify="center" mt="md">
                  <ThemeModeSelector />
                  <ThemeToggle />
                </Group>
              </Stack>
            </Container>
          </Paper>
        )}
      </Transition>
    </Box>
  );
}
