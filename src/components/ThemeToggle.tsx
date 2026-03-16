'use client';

import { useIsHydrated, useTheme } from '@/lib/theme-context';
import { ActionIcon, Loader, Tooltip } from '@mantine/core';
import { IconDroplet, IconPalette } from '@tabler/icons-react';
import { useState } from 'react';

export default function ThemeToggle() {
  const { currentTheme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const isHydrated = useIsHydrated();

  // Show loading state while hydrating to prevent mismatch
  if (!isHydrated) {
    return (
      <Tooltip label="Loading palette..." position="bottom" withArrow>
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
          aria-label="Palette toggle (loading)"
        >
          <Loader size="sm" />
        </ActionIcon>
      </Tooltip>
    );
  }

  const isSakura = currentTheme === 'sakura';
  const Icon = isSakura ? IconDroplet : IconPalette;

  return (
    <Tooltip
      label={isSakura ? 'Switch palette to Ocean' : 'Switch palette to Sakura'}
      position="bottom"
      withArrow
    >
      <ActionIcon
        variant="subtle"
        size="lg"
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: 'all 0.2s ease-in-out',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
        aria-label={`Switch palette to ${isSakura ? 'Ocean' : 'Sakura'}`}
      >
        <Icon
          size={20}
          style={{
            transition: 'all 0.2s ease-in-out',
            transform: isHovered ? 'rotate(15deg)' : 'rotate(0deg)',
          }}
        />
      </ActionIcon>
    </Tooltip>
  );
}
