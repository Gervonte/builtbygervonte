import { useCurrentTheme, useTheme } from './theme-context';

const LIGHT_PRIMARY_FALLBACK = ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#F44336'];
const LIGHT_EFFECT_FALLBACK = ['#FCE4EC', '#F8BBD9', '#F48FB1', '#F06292'];
const EARTH_FALLBACK = ['#FDF4E3', '#F4E4BC', '#D4A574', '#8B4513'];
const LIGHT_WARM_FALLBACK = ['#FDFCFB', '#F5F5F5', '#E8E8E8', '#999999', '#666666', '#2C2C2C'];
const DARK_WARM_FALLBACK = ['#0E141B', '#16202A', '#273341', '#6C7C8B', '#96A7B5', '#D9E2EA'];

/**
 * Theme-aware color utility functions
 * These functions automatically adapt to the current theme and appearance mode.
 */

function getWarmFallback(resolvedColorScheme: 'light' | 'dark') {
  return resolvedColorScheme === 'dark' ? DARK_WARM_FALLBACK : LIGHT_WARM_FALLBACK;
}

export function useThemeColors() {
  const theme = useCurrentTheme();
  return theme.colors || {};
}

export function usePrimaryColors() {
  const theme = useCurrentTheme();
  const primaryColorName = theme.primaryColor as keyof typeof theme.colors;
  return (theme.colors?.[primaryColorName] as readonly string[]) || LIGHT_PRIMARY_FALLBACK;
}

export function useEffectColors() {
  const theme = useCurrentTheme();
  const isSakura = theme.primaryColor === 'sakura';
  const effectColorName = isSakura ? 'pink' : 'mist';

  return (
    (theme.colors?.[effectColorName as keyof typeof theme.colors] as readonly string[]) || [
      ...LIGHT_EFFECT_FALLBACK,
    ]
  );
}

export function useWarmColors() {
  const theme = useCurrentTheme();
  const { resolvedColorScheme } = useTheme();

  return (theme.colors?.warm as readonly string[]) || getWarmFallback(resolvedColorScheme);
}

export function useEarthColors() {
  const theme = useCurrentTheme();
  return (theme.colors?.earth as readonly string[]) || EARTH_FALLBACK;
}

export function useColorCombinations() {
  const { resolvedColorScheme } = useTheme();
  const primaryColors = usePrimaryColors();
  const effectColors = useEffectColors();
  const warmColors = useWarmColors();
  const earthColors = useEarthColors();
  const isDark = resolvedColorScheme === 'dark';

  const safePrimary = primaryColors.length >= 4 ? primaryColors : LIGHT_PRIMARY_FALLBACK;
  const safeEffect = effectColors.length >= 4 ? effectColors : LIGHT_EFFECT_FALLBACK;
  const safeWarm =
    warmColors.length >= 3 ? warmColors : getWarmFallback(resolvedColorScheme ?? 'light');
  const safeEarth = earthColors.length >= 4 ? earthColors : EARTH_FALLBACK;
  const footerAccent = isDark
    ? `rgba(${hexToRgb(safePrimary[4] || safePrimary[3])}, 0.24)`
    : safePrimary[0];
  const primaryModalStart = isDark
    ? `rgba(${hexToRgb(safePrimary[4] || safePrimary[3])}, 0.2)`
    : safePrimary[0];
  const primaryModalEnd = isDark
    ? `rgba(${hexToRgb(safePrimary[6] || safePrimary[3])}, 0.42)`
    : safePrimary[1];

  return {
    primaryGradient: `linear-gradient(135deg, ${safePrimary[3]}, ${safePrimary[1]})`,
    primaryGradientLight: isDark
      ? `linear-gradient(135deg, rgba(${hexToRgb(safePrimary[3])}, 0.45), rgba(${hexToRgb(safePrimary[1])}, 0.15))`
      : `linear-gradient(135deg, ${safePrimary[1]}, ${safePrimary[0]})`,
    effectGradient: `linear-gradient(135deg, ${safeEffect[3]}, ${safeEffect[1]})`,
    effectGradientLight: isDark
      ? `linear-gradient(135deg, rgba(${hexToRgb(safeEffect[3])}, 0.4), rgba(${hexToRgb(safeEffect[1])}, 0.14))`
      : `linear-gradient(135deg, ${safeEffect[1]}, ${safeEffect[0]})`,
    footerGradient: `linear-gradient(135deg, ${footerAccent}, ${safeWarm[1]})`,
    earthGradientModal: `linear-gradient(135deg, ${safeEarth[0]}, ${safeEarth[1]})`,
    warmGradientModal: `linear-gradient(135deg, ${safeWarm[0]}, ${safeWarm[1]})`,
    primaryGradientModal: `linear-gradient(135deg, ${primaryModalStart}, ${primaryModalEnd})`,
    skeletonGradient: `linear-gradient(90deg, ${safeWarm[1]} 25%, ${safeWarm[2]} 50%, ${safeWarm[1]} 75%)`,
    skeletonGradientDark: `linear-gradient(90deg, ${safeWarm[1]} 25%, ${safeWarm[2]} 50%, ${safeWarm[1]} 75%)`,
  };
}

export function useCommonColors() {
  const { resolvedColorScheme } = useTheme();
  const primaryColors = usePrimaryColors();
  const warmColors = useWarmColors();
  const earthColors = useEarthColors();
  const isDark = resolvedColorScheme === 'dark';

  const primaryAccent = primaryColors[3] ?? '#F44336';
  const primaryStrongAccent = primaryColors[4] ?? primaryAccent;
  const primarySoftAccent = primaryColors[1] ?? '#FFCDD2';
  const warmSurface = warmColors[0] ?? (isDark ? '#0E141B' : '#FDFCFB');
  const warmElevated = warmColors[1] ?? (isDark ? '#16202A' : '#F5F5F5');
  const warmBorder = warmColors[2] ?? (isDark ? '#273341' : '#E8E8E8');
  const warmMuted = warmColors[3] ?? (isDark ? '#6C7C8B' : '#999999');
  const warmSecondary = warmColors[4] ?? (isDark ? '#96A7B5' : '#666666');
  const warmPrimary = warmColors[5] ?? (isDark ? '#D9E2EA' : '#2C2C2C');
  const inverseText = isDark ? (warmColors[8] ?? '#FFFFFF') : warmSurface;
  const earthAccent = earthColors[2] ?? '#D4A574';

  return {
    textPrimary: warmPrimary,
    textSecondary: warmSecondary,
    textMuted: warmMuted,
    textInverse: inverseText,
    textOnPrimary: isDark ? inverseText : (primaryColors[6] ?? '#C62828'),
    textOnPrimaryLight: isDark ? (warmColors[6] ?? '#EEF3F7') : (primaryColors[5] ?? '#D32F2F'),

    backgroundPrimary: warmSurface,
    backgroundSecondary: warmElevated,
    backgroundCard: isDark ? warmElevated : warmSurface,
    backgroundHero: isDark
      ? `linear-gradient(135deg, ${warmSurface}, rgba(${hexToRgb(primaryStrongAccent)}, 0.22))`
      : `linear-gradient(135deg, ${warmSurface}, ${primaryColors[0] ?? '#FFEBEE'})`,
    backgroundWork: isDark
      ? `linear-gradient(135deg, ${warmSurface}, rgba(${hexToRgb(earthColors[6] ?? '#3D2314')}, 0.24))`
      : (earthColors[0] ?? '#FDF4E3'),
    backgroundContact: isDark
      ? `rgba(${hexToRgb(primaryStrongAccent)}, 0.16)`
      : (primaryColors[0] ?? '#FFEBEE'),
    backgroundPrimaryLight: isDark
      ? `rgba(${hexToRgb(primaryStrongAccent)}, 0.18)`
      : (primaryColors[0] ?? '#FFEBEE'),
    backgroundPrimarySubtle: isDark ? `rgba(${hexToRgb(primaryAccent)}, 0.12)` : primarySoftAccent,

    borderPrimary: warmBorder,
    borderSecondary: isDark ? `rgba(${hexToRgb(primaryAccent)}, 0.3)` : primarySoftAccent,
    borderFocus: primaryStrongAccent,
    borderPrimaryLight: isDark
      ? `rgba(${hexToRgb(primaryColors[2] ?? primaryAccent)}, 0.35)`
      : (primaryColors[2] ?? '#EF9A9A'),

    accentPrimary: isDark ? (primaryColors[2] ?? primaryAccent) : (primaryColors[5] ?? '#D32F2F'),
    accentSecondary: isDark ? primarySoftAccent : primarySoftAccent,
    accentPrimaryDark: isDark ? primaryAccent : primaryStrongAccent,

    shadowLight: isDark ? 'rgba(0, 0, 0, 0.35)' : 'rgba(0, 0, 0, 0.05)',
    shadowMedium: isDark ? 'rgba(0, 0, 0, 0.45)' : 'rgba(0, 0, 0, 0.1)',
    shadowHeavy: isDark ? 'rgba(0, 0, 0, 0.72)' : 'rgba(0, 0, 0, 0.15)',
    shadowCard: isDark ? '0 12px 32px rgba(0, 0, 0, 0.35)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
    shadowPrimary: `rgba(${hexToRgb(primaryAccent)}, ${isDark ? 0.35 : 0.25})`,
    shadowPrimaryLight: `rgba(${hexToRgb(primaryAccent)}, ${isDark ? 0.24 : 0.15})`,

    backgroundModal: isDark ? warmElevated : warmSurface,
    borderModal: warmBorder,
    borderEarth: isDark ? `rgba(${hexToRgb(earthAccent)}, 0.4)` : earthAccent,
    borderWarm: warmBorder,
    borderPrimaryColor: isDark ? `rgba(${hexToRgb(primaryAccent)}, 0.3)` : primarySoftAccent,
  };
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
  }

  return '0, 0, 0';
}

export function useWithOpacity(color: string, opacity: number): string {
  const rgb = hexToRgb(color);
  return `rgba(${rgb}, ${opacity})`;
}

export function useThemeColor(colorName: string, shade: number = 3): string {
  const theme = useCurrentTheme();
  const colors = theme.colors?.[colorName as keyof typeof theme.colors] as readonly string[];
  return colors?.[shade] ?? '#000000';
}
