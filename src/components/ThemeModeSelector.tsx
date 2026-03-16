'use client';

import { useIsHydrated, useTheme, type ThemeMode } from '@/lib/theme-context';
import { ActionIcon, Loader, Tooltip } from '@mantine/core';
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { useState } from 'react';

const themeModeOrder: ThemeMode[] = ['auto', 'light', 'dark'];

function getNextThemeMode(themeMode: ThemeMode): ThemeMode {
  const currentIndex = themeModeOrder.indexOf(themeMode);
  return themeModeOrder[(currentIndex + 1) % themeModeOrder.length];
}

function ThemeModeIcon({ themeMode, isHovered }: { themeMode: ThemeMode; isHovered: boolean }) {
  const iconProps = {
    size: 20,
    style: {
      transition: 'all 0.2s ease-in-out',
      transform: isHovered ? 'rotate(15deg)' : 'rotate(0deg)',
    },
  };

  switch (themeMode) {
    case 'light':
      return <IconSun {...iconProps} />;
    case 'dark':
      return <IconMoon {...iconProps} />;
    default:
      return <IconDeviceDesktop {...iconProps} />;
  }
}

export default function ThemeModeSelector() {
  const { themeMode, setThemeMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return (
      <Tooltip label="Loading appearance..." position="bottom" withArrow>
        <ActionIcon
          variant="subtle"
          size="lg"
          disabled
          style={{
            minHeight: '44px',
            minWidth: '44px',
            opacity: 0.6,
            cursor: 'not-allowed',
          }}
          aria-label="Appearance toggle (loading)"
        >
          <Loader size="sm" />
        </ActionIcon>
      </Tooltip>
    );
  }

  const nextThemeMode = getNextThemeMode(themeMode);
  return (
    <Tooltip label={`Switch appearance to ${nextThemeMode}`} position="bottom" withArrow>
      <ActionIcon
        variant="subtle"
        size="lg"
        onClick={() => setThemeMode(nextThemeMode)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: 'all 0.2s ease-in-out',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
        aria-label={`Switch appearance to ${nextThemeMode}`}
      >
        <ThemeModeIcon themeMode={themeMode} isHovered={isHovered} />
      </ActionIcon>
    </Tooltip>
  );
}
