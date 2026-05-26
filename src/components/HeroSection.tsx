'use client';

import { getHeroSpeed } from '@/lib/parallax-config';
import { useColorCombinations, useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { memo } from 'react';
import ParallaxElement from './ParallaxElement';
import SakuraBackground from './SakuraBackground';

const HeroSection = memo(() => {
  // Theme-aware colors
  const colorCombinations = useColorCombinations();
  const commonColors = useCommonColors();

  return (
    <SakuraBackground intensity="moderate" variant="falling">
      <Box
        id="hero"
        role="banner"
        aria-label="Hero section with introduction"
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '3rem',
        }}
      >
        <Container size="lg" py="xl">
          <Stack align="center" gap="xl">
            <ParallaxElement speed={getHeroSpeed('title')}>
              <Title
                order={1}
                ta="center"
                mb="md"
                style={{
                  backgroundImage: colorCombinations.primaryGradient,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                  fontWeight: 700,
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                }}
              >
                Hello, I&apos;m Gervonte Fowler
              </Title>
            </ParallaxElement>
            <ParallaxElement speed={getHeroSpeed('subtitle')}>
              <Text
                ta="center"
                size="xl"
                mb="xl"
                style={{
                  maxWidth: '900px',
                  lineHeight: 1.6,
                  color: commonColors.textSecondary,
                }}
                role="text"
                aria-label="Software, content, and systems built by a creative engineer born and raised in The Bahamas"
              >
                Full-stack software engineer building fintech products, technical content, and 0 to
                1 creative systems.
                <br />
                <span aria-hidden="true">🇧🇸</span>
              </Text>
            </ParallaxElement>
            <ParallaxElement speed={getHeroSpeed('buttons')}>
              <Group justify="center" gap="md" role="group" aria-label="Navigation actions">
                <Button
                  size="lg"
                  color="sakura"
                  aria-label="Explore founder stories, product demos, and creative content"
                  role="button"
                  tabIndex={0}
                  style={{
                    background: colorCombinations.primaryGradient,
                    border: 'none',
                    boxShadow: `0 4px 15px ${commonColors.shadowPrimary}`,
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => {
                    document.getElementById('watch')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 20px ${commonColors.shadowPrimary}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 15px ${commonColors.shadowPrimary}`;
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      document.getElementById('watch')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Explore Content
                </Button>
                <Button
                  size="lg"
                  color="sakura"
                  variant="filled"
                  aria-label="Explore software projects and product work"
                  role="button"
                  tabIndex={0}
                  style={{
                    background: commonColors.accentSecondary + '1A',
                    color: commonColors.accentPrimary,
                    border: 'none',
                    boxShadow: `0 4px 15px ${commonColors.shadowMedium}`,
                    borderColor: commonColors.accentPrimary,
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => {
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 20px ${commonColors.shadowMedium}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 15px ${commonColors.shadowMedium}`;
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Explore Software
                </Button>
              </Group>
            </ParallaxElement>
          </Stack>
        </Container>
      </Box>
    </SakuraBackground>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
