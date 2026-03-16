import { createTheme, type MantineColorsTuple } from '@mantine/core';

export type ThemeName = 'sakura' | 'ocean';
export type ResolvedColorScheme = 'light' | 'dark';

const sakuraColors = [
  '#FFEBEE', // sakura[0] - lightest red
  '#FFCDD2', // sakura[1] - light red
  '#EF9A9A', // sakura[2] - medium red
  '#F44336', // sakura[3] - deep red
  '#E53935', // sakura[4] - darker red
  '#D32F2F', // sakura[5] - darkest red
  '#C62828', // sakura[6] - very dark red
  '#B71C1C', // sakura[7] - ultra dark red
  '#8D1A1A', // sakura[8] - near black red
  '#4A0E0E', // sakura[9] - black red
] as const satisfies MantineColorsTuple;

const pinkColors = [
  '#FCE4EC', // pink[0] - lightest pink
  '#F8BBD9', // pink[1] - light pink
  '#F48FB1', // pink[2] - medium pink
  '#F06292', // pink[3] - deep pink
  '#EC407A', // pink[4] - darker pink
  '#E91E63', // pink[5] - darkest pink
  '#D81B60', // pink[6] - very dark pink
  '#C2185B', // pink[7] - ultra dark pink
  '#AD1457', // pink[8] - near black pink
  '#880E4F', // pink[9] - black pink
] as const satisfies MantineColorsTuple;

const oceanColors = [
  '#F0FDFA', // ocean[0] - lightest aqua
  '#B8E6E6', // ocean[1] - light aqua
  '#67E8F9', // ocean[2] - medium cyan
  '#0891B2', // ocean[3] - deep teal
  '#0E7490', // ocean[4] - darker teal
  '#155E75', // ocean[5] - darkest teal
  '#164E63', // ocean[6] - very dark teal
  '#134E4A', // ocean[7] - ultra dark teal
  '#0F766E', // ocean[8] - near black teal
  '#0A4A42', // ocean[9] - black teal
] as const satisfies MantineColorsTuple;

const mistColors = [
  '#F0FDFA', // mist[0] - lightest aqua
  '#B8E6E6', // mist[1] - light aqua
  '#67E8F9', // mist[2] - medium cyan
  '#5EEAD4', // mist[3] - deep aqua
  '#2DD4BF', // mist[4] - darker aqua
  '#14B8A6', // mist[5] - darkest aqua
  '#0891B2', // mist[6] - very dark aqua
  '#0E7490', // mist[7] - ultra dark aqua
  '#155E75', // mist[8] - near black aqua
  '#164E63', // mist[9] - black aqua
] as const satisfies MantineColorsTuple;

const earthColors = [
  '#FDF4E3', // earth[0] - light brown
  '#F4E4BC', // earth[1] - warm beige
  '#D4A574', // earth[2] - medium brown
  '#8B4513', // earth[3] - saddle brown
  '#654321', // earth[4] - dark brown
  '#4A2C17', // earth[5] - darker brown
  '#3D2314', // earth[6] - very dark brown
  '#2F1B0F', // earth[7] - ultra dark brown
  '#1F1209', // earth[8] - near black brown
  '#0F0905', // earth[9] - black brown
] as const satisfies MantineColorsTuple;

const lightWarmColors = [
  '#FDFCFB', // warm[0] - cream white
  '#F5F5F5', // warm[1] - light gray
  '#E8E8E8', // warm[2] - border gray
  '#999999', // warm[3] - muted text
  '#666666', // warm[4] - secondary text
  '#2C2C2C', // warm[5] - primary text
  '#1A1A1A', // warm[6] - near black
  '#141414', // warm[7] - very dark gray
  '#0F0F0F', // warm[8] - ultra dark gray
  '#0A0A0A', // warm[9] - near black
] as const satisfies MantineColorsTuple;

const darkWarmColors = [
  '#0E141B', // warm[0] - app background
  '#101820', // warm[1] - elevated surface
  '#273341', // warm[2] - border color
  '#6C7C8B', // warm[3] - muted text
  '#96A7B5', // warm[4] - secondary text
  '#D9E2EA', // warm[5] - primary text
  '#EEF3F7', // warm[6] - bright text
  '#F8FAFC', // warm[7] - near white
  '#FFFFFF', // warm[8] - pure white
  '#FFFFFF', // warm[9] - pure white
] as const satisfies MantineColorsTuple;

const darkScale = [
  '#C1C2C5',
  '#A6A7AB',
  '#909296',
  '#5C5F66',
  '#373A40',
  '#2C2E33',
  '#25262B',
  '#1A1B1E',
  '#141517',
  '#101113',
] as const satisfies MantineColorsTuple;

const sharedThemeConfig = {
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Fira Code, Consolas, monospace',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
  components: {
    Tooltip: {
      defaultProps: {
        multiline: true,
        withArrow: true,
        withinPortal: true,
        zIndex: 1000,
      },
      styles: {
        tooltip: {
          fontSize: '14px',
          maxWidth: '280px',
          padding: '8px 12px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
        },
        arrow: {
          zIndex: 1001,
        },
      },
    },
    ActionIcon: {
      styles: {
        root: {
          minHeight: '44px',
          minWidth: '44px',
        },
      },
    },
  },
} as const;

function getWarmColors(colorScheme: ResolvedColorScheme) {
  return colorScheme === 'dark' ? darkWarmColors : lightWarmColors;
}

function createPaletteColors(themeName: ThemeName, colorScheme: ResolvedColorScheme) {
  const warm = getWarmColors(colorScheme);

  if (themeName === 'sakura') {
    return {
      sakura: sakuraColors,
      warm,
      earth: earthColors,
      pink: pinkColors,
      dark: darkScale,
    };
  }

  return {
    ocean: oceanColors,
    warm,
    earth: earthColors,
    mist: mistColors,
    sakura: oceanColors,
    pink: mistColors,
    dark: darkScale,
  };
}

function createPortfolioTheme(themeName: ThemeName, colorScheme: ResolvedColorScheme) {
  return createTheme({
    ...sharedThemeConfig,
    colors: createPaletteColors(themeName, colorScheme),
    primaryColor: themeName === 'sakura' ? 'sakura' : 'ocean',
    primaryShade: colorScheme === 'dark' ? 4 : 3,
    white: colorScheme === 'dark' ? '#F8FAFC' : '#FFFFFF',
    black: colorScheme === 'dark' ? '#0B1117' : '#1A1A1A',
    defaultRadius: 'md',
  });
}

export const themes = {
  sakura: {
    light: createPortfolioTheme('sakura', 'light'),
    dark: createPortfolioTheme('sakura', 'dark'),
  },
  ocean: {
    light: createPortfolioTheme('ocean', 'light'),
    dark: createPortfolioTheme('ocean', 'dark'),
  },
} as const;

export const getTheme = (themeName: ThemeName, colorScheme: ResolvedColorScheme = 'light') =>
  themes[themeName][colorScheme];

export const defaultTheme: ThemeName = 'sakura';
