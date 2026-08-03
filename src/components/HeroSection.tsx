'use client';

import { getHeroSpeed } from '@/lib/parallax-config';
import { useColorCombinations, useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { memo } from 'react';
import HeroTypewriter from './HeroTypewriter';
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
            <ParallaxElement speed={getHeroSpeed('title')} deferUntilInteraction>
              <Title
                className="hero-title"
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
                  minHeight: 'var(--hero-title-min-height, 3.6em)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                }}
              >
                <HeroTypewriter />
              </Title>
            </ParallaxElement>
            <ParallaxElement speed={getHeroSpeed('subtitle')} deferUntilInteraction>
              <Text
                className="hero-credentials"
                ta="center"
                size="xl"
                mb="xl"
                style={{
                  width: '100%',
                  maxWidth: '1100px',
                  lineHeight: 1.6,
                  color: commonColors.textSecondary,
                }}
                role="text"
                aria-label="Series B Fintech Startup Experience, M.S. Computer Science, IEEE LLM Research, Building Rainy Day"
              >
                Series B Fintech Startup Experience • M.S. Computer Science • IEEE LLM Research •
                Building Rainy Day
                <br />
                <span aria-hidden="true">🇧🇸</span>
              </Text>
            </ParallaxElement>
            <ParallaxElement speed={getHeroSpeed('buttons')} deferUntilInteraction>
              <Group
                className="hero-actions"
                justify="center"
                gap="sm"
                wrap="nowrap"
                role="group"
                aria-label="Navigation actions"
              >
                <Button
                  component="a"
                  href="https://rainyday.ignitionlabs.app/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  color="sakura"
                  aria-label="Try the Rainy Day public guided demo"
                  style={{
                    background: colorCombinations.primaryGradient,
                    border: 'none',
                    boxShadow: `0 4px 15px ${commonColors.shadowPrimary}`,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 6px 20px ${commonColors.shadowPrimary}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 4px 15px ${commonColors.shadowPrimary}`;
                  }}
                >
                  Try Rainy Day
                </Button>
                <Button
                  size="lg"
                  color="sakura"
                  variant="filled"
                  aria-label="Watch the Rainy Day demo in the content section"
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
                    document.getElementById('watch')?.scrollIntoView({ behavior: 'smooth' });
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
                      document.getElementById('watch')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Watch Demo
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
