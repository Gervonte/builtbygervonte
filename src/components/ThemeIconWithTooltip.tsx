'use client';

import { getBadgeContext } from '@/lib/badge-contexts';
import { useCommonColors } from '@/lib/theme-aware-colors';
import { List, Stack, Text, ThemeIcon, ThemeIconProps, Title } from '@mantine/core';
import { memo } from 'react';
import { MobileTooltip } from './MobileTooltip';

interface ThemeIconWithTooltipProps extends ThemeIconProps {
  technologyName: string;
  showCapabilities?: boolean;
  maxWidth?: number;
}

const ThemeIconWithTooltip = memo(
  ({
    technologyName,
    showCapabilities = true,
    maxWidth = 300,
    children,
    ...themeIconProps
  }: ThemeIconWithTooltipProps) => {
    const commonColors = useCommonColors();
    const context = getBadgeContext('technology', technologyName);

    const tooltipContent = context ? (
      <Stack gap="xs" style={{ maxWidth }}>
        <Title order={6} size="sm" fw={600}>
          {context.title}
        </Title>
        <Text size="sm" c="dimmed">
          {context.description}
        </Text>
        {showCapabilities && context.capabilities && context.capabilities.length > 0 && (
          <Stack gap="xs">
            <Text size="xs" fw={500} c={commonColors.accentPrimary}>
              {context.capabilitiesLabel || 'What It Does:'}
            </Text>
            <List size="xs" spacing="xs">
              {context.capabilities.map((capability: string, index: number) => (
                <List.Item key={index}>
                  <Text size="xs">{capability}</Text>
                </List.Item>
              ))}
            </List>
          </Stack>
        )}
      </Stack>
    ) : (
      <Stack gap="xs" style={{ maxWidth }}>
        <Title order={6} size="sm" fw={600}>
          {technologyName}
        </Title>
        <Text size="sm" c="dimmed">
          Technology skill
        </Text>
      </Stack>
    );

    return (
      <MobileTooltip
        label={tooltipContent}
        multiline
        withinPortal
        withArrow
        position="top"
        offset={8}
      >
        <ThemeIcon
          {...themeIconProps}
          style={{
            cursor: 'help',
            transition: 'all 0.2s ease',
            ...themeIconProps.style,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            themeIconProps.onMouseEnter?.(e);
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
            themeIconProps.onMouseLeave?.(e);
          }}
        >
          {children}
        </ThemeIcon>
      </MobileTooltip>
    );
  }
);

ThemeIconWithTooltip.displayName = 'ThemeIconWithTooltip';

export default ThemeIconWithTooltip;
