'use client';

import { defaultTheme, getTheme, type ResolvedColorScheme, type ThemeName } from '@/lib/themes';
import { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'auto' | 'light' | 'dark';

interface ThemeContextType {
  currentTheme: ThemeName;
  themeMode: ThemeMode;
  resolvedColorScheme: ResolvedColorScheme;
  setTheme: (theme: ThemeName) => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'portfolio-theme';
const THEME_MODE_STORAGE_KEY = 'portfolio-theme-mode';

function getSystemColorScheme(): ResolvedColorScheme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): ThemeName {
  if (typeof window === 'undefined') {
    return defaultTheme;
  }

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme === 'sakura' || storedTheme === 'ocean' ? storedTheme : defaultTheme;
}

function getStoredThemeMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'auto';
  }

  const storedThemeMode = localStorage.getItem(THEME_MODE_STORAGE_KEY);
  return storedThemeMode === 'light' || storedThemeMode === 'dark' || storedThemeMode === 'auto'
    ? storedThemeMode
    : 'auto';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(defaultTheme);
  const [themeMode, setCurrentThemeMode] = useState<ThemeMode>('auto');
  const [autoColorScheme, setAutoColorScheme] = useState<ResolvedColorScheme>('light');
  const [isHydrated, setIsHydrated] = useState(false);

  const resolvedColorScheme =
    themeMode === 'auto' ? autoColorScheme : (themeMode as ResolvedColorScheme);

  useEffect(() => {
    setIsHydrated(true);
    setCurrentTheme(getStoredTheme());
    setCurrentThemeMode(getStoredThemeMode());
    setAutoColorScheme(getSystemColorScheme());
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
  }, [currentTheme, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(THEME_MODE_STORAGE_KEY, themeMode);
  }, [themeMode, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (themeMode !== 'auto') {
      setAutoColorScheme(themeMode);
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncAutoColorScheme = () => {
      setAutoColorScheme(mediaQuery.matches ? 'dark' : 'light');
    };
    const handleChange = (event: MediaQueryListEvent) => {
      setAutoColorScheme(event.matches ? 'dark' : 'light');
    };

    syncAutoColorScheme();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }

    mediaQuery.addListener(handleChange);
    return () => {
      mediaQuery.removeListener(handleChange);
    };
  }, [themeMode, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    document.documentElement.dataset.paletteTheme = currentTheme;
    document.documentElement.dataset.appearanceMode = resolvedColorScheme;
  }, [currentTheme, resolvedColorScheme, isHydrated]);

  const value = {
    currentTheme,
    themeMode,
    resolvedColorScheme,
    setTheme: (theme: ThemeName) => {
      setCurrentTheme(theme);
    },
    setThemeMode: (mode: ThemeMode) => {
      setCurrentThemeMode(mode);
    },
    toggleTheme: () => {
      setCurrentTheme(previousTheme => (previousTheme === 'sakura' ? 'ocean' : 'sakura'));
    },
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export function useCurrentTheme() {
  const { currentTheme, resolvedColorScheme } = useTheme();
  return getTheme(currentTheme, resolvedColorScheme);
}

export function useResolvedColorScheme() {
  const { resolvedColorScheme } = useTheme();
  return resolvedColorScheme;
}

export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
