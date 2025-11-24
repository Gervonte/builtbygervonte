'use client';

import {
  LazyAboutSection,
  LazyContactSection,
  LazyExperienceSection,
  LazyHeroSection,
  LazyWorkSection,
} from '@/components/LazyComponents';
import ParallaxElement from '@/components/ParallaxElement';
import { ModalProvider } from '@/lib/modal-context';
import { getSectionSpeed } from '@/lib/parallax-config';
import { ParallaxProvider } from '@/lib/parallax-context';
import { useCommonColors } from '@/lib/theme-aware-colors';
import { Box } from '@mantine/core';
import { memo } from 'react';

const HomePage = memo(() => {
  // Theme-aware colors
  const commonColors = useCommonColors();

  return (
    <ModalProvider>
      <ParallaxProvider>
        {/* Hero Section */}
        <LazyHeroSection />

        <ParallaxElement speed={getSectionSpeed('work')}>
          <Box
            id="work"
            role="region"
            aria-label="Work projects"
            style={{
              minHeight: '100vh',
              padding: '4rem 0',
              background: commonColors.backgroundPrimary,
            }}
          >
            <LazyWorkSection />
          </Box>
        </ParallaxElement>

        <ParallaxElement speed={getSectionSpeed('experience')}>
          <Box
            id="experience"
            role="region"
            aria-label="Professional experience"
            style={{
              minHeight: '100vh',
              padding: '4rem 0',
            }}
          >
            <LazyExperienceSection />
          </Box>
        </ParallaxElement>

        {/* About Section */}
        <ParallaxElement speed={getSectionSpeed('about')}>
          <Box
            id="about"
            role="main"
            style={{
              minHeight: '100vh',
              padding: '4rem 0',
              background: commonColors.backgroundPrimary,
            }}
          >
            <LazyAboutSection />
          </Box>
        </ParallaxElement>

        <ParallaxElement speed={getSectionSpeed('contact')}>
          <Box
            id="contact"
            role="region"
            aria-label="Contact information"
            style={{
              padding: '4rem 0 2rem',
            }}
          >
            <LazyContactSection />
          </Box>
        </ParallaxElement>

        {/* Scroll Indicator - Disabled!*/}
        {/* <LazyScrollIndicator
          sections={['hero', 'work', 'experience', 'about', 'contact']}
          showProgress={true}
          showNavigation={true}
          position="bottom"
          orientation="horizontal"
          variant="detailed"
        /> */}
      </ParallaxProvider>
    </ModalProvider>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
