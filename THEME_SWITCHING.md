# Theme Switching Implementation

## Overview

The portfolio now has two separate theme controls:

- **Palette**: `Sakura` or `Ocean`
- **Appearance Mode**: `Auto`, `Light`, or `Dark`

`Auto` follows the user's system theme preference. Palette and appearance mode are stored separately in `localStorage`, so both settings persist across refreshes.

## How It Works

### 1. Palette Toggle

- Located in the header navigation on desktop and mobile
- Switches between the `sakura` and `ocean` color palettes
- Does not change light/dark appearance mode

### 2. Appearance Mode Selector

- Located next to the palette toggle
- Uses a single icon button that cycles through `Auto`, `Light`, and `Dark`
- `Auto` follows `prefers-color-scheme`
- `Light` and `Dark` override the system preference until the user switches back to `Auto`

### 3. Mantine Integration

- Mantine applies the resolved light/dark mode with `forceColorScheme`
- `ColorSchemeScript` bootstraps the initial color scheme in the document head
- Custom theme-aware helpers keep app-specific backgrounds, borders, shadows, and gradients aligned with the same resolved mode

## Implementation Details

### Primary Files

- `src/lib/themes.ts` - palette-aware Mantine theme variants for light and dark appearance
- `src/lib/theme-context.tsx` - palette state, appearance mode state, persistence, and resolved system theme handling
- `src/components/ThemeModeSelector.tsx` - appearance-mode icon toggle
- `src/components/ThemeToggle.tsx` - palette-only toggle
- `src/components/ThemeWrapper.tsx` - Mantine provider wiring and shared CSS variables
- `src/app/layout.tsx` - `ColorSchemeScript` integration

### Usage in Components

```tsx
import { useCurrentTheme, useTheme } from '@/lib/theme-context';

function MyComponent() {
  const { currentTheme, themeMode, resolvedColorScheme, toggleTheme, setThemeMode } = useTheme();
  const theme = useCurrentTheme();

  return (
    <div>
      <p>Palette: {currentTheme}</p>
      <p>Mode: {themeMode}</p>
      <p>Resolved appearance: {resolvedColorScheme}</p>
      <button onClick={toggleTheme}>Switch palette</button>
      <button onClick={() => setThemeMode('dark')}>Force dark</button>
    </div>
  );
}
```

## Testing

1. Start the dev server with `npm run dev`
2. Toggle the palette button and confirm colors switch between `sakura` and `ocean`
3. Change the appearance selector to `Light` and `Dark`
4. Switch back to `Auto` and confirm the page follows your system theme
5. Refresh the page and confirm both settings persist
6. Check desktop and mobile navigation

## Browser Support

- Modern browsers with `localStorage` support
- Modern browsers with `prefers-color-scheme` support
- Graceful fallback to light mode when the system preference cannot be detected
