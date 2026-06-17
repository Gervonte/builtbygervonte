'use client';

import { getBadgeContext, getDefaultContext } from '@/lib/badge-contexts';
import { useCommonColors } from '@/lib/theme-aware-colors';
import { Badge, BadgeProps, List, Stack, Text, Title } from '@mantine/core';
import { memo } from 'react';
import { MobileTooltip } from './MobileTooltip';

interface BadgeWithTooltipProps extends BadgeProps {
  contextType:
    | 'skill'
    | 'projectType'
    | 'status'
    | 'technology'
    | 'aiTool'
    | 'cache'
    | 'leadership';
  contextValue: string;
  showCapabilities?: boolean;
}

const BadgeWithTooltip = memo(
  ({
    contextType,
    contextValue,
    showCapabilities = true,
    children,
    ...badgeProps
  }: BadgeWithTooltipProps) => {
    const commonColors = useCommonColors();
    const context =
      getBadgeContext(contextType, contextValue) || getDefaultContext(contextType, contextValue);

    const tooltipContent = (
      <Stack gap="xs" style={{ maxWidth: 300 }}>
        <Title order={6} size="sm" fw={600}>
          {context.title}
        </Title>
        <Text size="sm" c="dimmed">
          {context.description}
        </Text>

        {showCapabilities && context.capabilities && context.capabilities.length > 0 && (
          <Stack gap="xs">
            <Text size="xs" fw={500} c={commonColors.accentPrimary}>
              {context.capabilitiesLabel || 'What I Can Do:'}
            </Text>
            <List size="xs" spacing="xs">
              {context.capabilities.map((capability, index) => (
                <List.Item key={index}>
                  <Text size="xs">{capability}</Text>
                </List.Item>
              ))}
            </List>
          </Stack>
        )}
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
        <Badge
          {...badgeProps}
          style={{
            cursor: 'help',
            transition: 'all 0.2s ease',
            ...badgeProps.style,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {children}
        </Badge>
      </MobileTooltip>
    );
  }
);

BadgeWithTooltip.displayName = 'BadgeWithTooltip';

export default BadgeWithTooltip;
