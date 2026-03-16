'use client';

import { useColorCombinations, useCommonColors } from '@/lib/theme-aware-colors';
import { useCurrentTheme, useTheme } from '@/lib/theme-context';
import { Box, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { CSSProperties, ReactNode } from 'react';

interface ThemeWrapperProps {
  children: ReactNode;
}

export default function ThemeWrapper({ children }: ThemeWrapperProps) {
  const theme = useCurrentTheme();
  const { currentTheme, resolvedColorScheme } = useTheme();
  const colorCombinations = useColorCombinations();
  const commonColors = useCommonColors();

  return (
    <MantineProvider theme={theme} forceColorScheme={resolvedColorScheme}>
      <Box
        data-theme-mode={resolvedColorScheme}
        data-palette-theme={currentTheme}
        style={
          {
            minHeight: '100vh',
            background: commonColors.backgroundPrimary,
            color: commonColors.textPrimary,
            transition: 'background-color 0.2s ease, color 0.2s ease',
            '--skeleton-gradient': colorCombinations.skeletonGradient,
          } as CSSProperties
        }
      >
        <Notifications />
        {children}
      </Box>
    </MantineProvider>
  );
}
