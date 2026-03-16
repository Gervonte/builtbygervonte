'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { Badge, Group, Text } from '@mantine/core';
import { memo } from 'react';
import { TouchActionIcon } from '../../TouchActionIcon';
import { FooterSectionProps } from '../types';
import { isUrl } from '../utils';

const FooterSection = memo(
  ({
    timeline,
    metadata,
    primaryAction,
    secondaryAction,
    infoBoxDescription,
  }: FooterSectionProps) => {
    const commonColors = useCommonColors();

    return (
      <Group justify="space-between" mt="md">
        <Group gap="xs">
          {/* Timeline for project cards (not work experience) */}
          {timeline && !infoBoxDescription && (
            <Badge
              color="sakura"
              variant="light"
              size="sm"
              style={{
                cursor: 'default',
                transition: 'all 0.2s ease',
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
              {timeline}
            </Badge>
          )}
          {metadata.map((meta, index) => {
            if (isUrl(meta.text)) {
              return (
                <TouchActionIcon
                  key={index}
                  tooltip={`Visit ${meta.text}`}
                  href={meta.text.startsWith('http') ? meta.text : `https://${meta.text}`}
                  target="_blank"
                  color="sakura"
                  variant="light"
                  size="sm"
                >
                  {meta.icon}
                </TouchActionIcon>
              );
            }

            return (
              <Group key={index} gap="xs">
                {meta.icon}
                <Text size="sm" c={commonColors.textSecondary}>
                  {meta.text}
                </Text>
              </Group>
            );
          })}
        </Group>

        <Group gap="xs">
          {primaryAction && (
            <TouchActionIcon
              tooltip={primaryAction.tooltip || primaryAction.label}
              href={primaryAction.href}
              onClick={primaryAction.onClick}
              color="sakura"
              variant="light"
              size="sm"
            >
              {primaryAction.icon || primaryAction.label}
            </TouchActionIcon>
          )}

          {secondaryAction && (
            <TouchActionIcon
              tooltip={secondaryAction.tooltip || secondaryAction.label}
              href={secondaryAction.href}
              onClick={secondaryAction.onClick}
              color="sakura"
              variant="light"
              size="sm"
            >
              {secondaryAction.icon || secondaryAction.label}
            </TouchActionIcon>
          )}
        </Group>
      </Group>
    );
  }
);

FooterSection.displayName = 'FooterSection';

export default FooterSection;
