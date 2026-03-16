'use client';

import { ActionIcon, Box, Group, Text, UnstyledButton } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { memo } from 'react';
import { TabNavigationProps } from './types';
import { formatSectionTitle } from './utils';

const TabNavigation = memo(
  ({ technicalSections, activeTab, onTabChange, commonColors }: TabNavigationProps) => {
    if (technicalSections.length <= 1) {
      return null;
    }

    const currentIndex = technicalSections.findIndex(section => section.key === activeTab);
    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const activeSection = technicalSections[safeIndex];
    const showPager = technicalSections.length > 4;

    if (showPager) {
      const canGoPrevious = safeIndex > 0;
      const canGoNext = safeIndex < technicalSections.length - 1;

      return (
        <Group
          justify="space-between"
          align="center"
          wrap="nowrap"
          style={{
            padding: '0.6rem 0.75rem',
            borderRadius: '999px',
            border: `1px solid ${commonColors.borderPrimary}`,
            background: commonColors.backgroundSecondary,
            boxShadow: `0 10px 24px ${commonColors.shadowLight}`,
          }}
        >
          <ActionIcon
            variant="subtle"
            radius="xl"
            size="lg"
            aria-label="Previous section"
            disabled={!canGoPrevious}
            onClick={() => {
              if (canGoPrevious) {
                onTabChange(technicalSections[safeIndex - 1].key);
              }
            }}
            style={{
              color: canGoPrevious ? commonColors.textPrimary : commonColors.textSecondary,
              background: canGoPrevious ? commonColors.backgroundCard : 'transparent',
              border: `1px solid ${commonColors.borderPrimary}`,
              opacity: canGoPrevious ? 1 : 0.4,
            }}
          >
            <IconChevronLeft size={16} />
          </ActionIcon>

          <Group gap="xs" wrap="nowrap" style={{ minWidth: 0, flex: 1, justifyContent: 'center' }}>
            <Text
              size="xs"
              fw={700}
              tt="uppercase"
              c={commonColors.textSecondary}
              style={{ letterSpacing: '0.14em', flexShrink: 0 }}
            >
              Section
            </Text>
            <Box
              role="tab"
              aria-selected={true}
              aria-controls={`tabpanel-${activeSection.key}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                minWidth: 0,
                padding: '0.55rem 0.85rem',
                borderRadius: '999px',
                background: commonColors.backgroundCard,
                border: `1px solid ${commonColors.borderPrimary}`,
                boxShadow: `0 4px 12px ${commonColors.shadowLight}`,
                color: commonColors.accentPrimary,
              }}
            >
              {activeSection.icon}
              <Text
                size="sm"
                fw={700}
                c="inherit"
                style={{ lineHeight: 1.1, whiteSpace: 'nowrap', overflow: 'hidden' }}
              >
                {formatSectionTitle(activeSection.key)}
              </Text>
              <Text size="xs" c={commonColors.textSecondary} style={{ flexShrink: 0 }}>
                {safeIndex + 1}/{technicalSections.length}
              </Text>
            </Box>
          </Group>

          <ActionIcon
            variant="subtle"
            radius="xl"
            size="lg"
            aria-label="Next section"
            disabled={!canGoNext}
            onClick={() => {
              if (canGoNext) {
                onTabChange(technicalSections[safeIndex + 1].key);
              }
            }}
            style={{
              color: canGoNext ? commonColors.textPrimary : commonColors.textSecondary,
              background: canGoNext ? commonColors.backgroundCard : 'transparent',
              border: `1px solid ${commonColors.borderPrimary}`,
              opacity: canGoNext ? 1 : 0.4,
            }}
          >
            <IconChevronRight size={16} />
          </ActionIcon>
        </Group>
      );
    }

    return (
      <Box
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <Text
          size="xs"
          fw={700}
          tt="uppercase"
          c={commonColors.textSecondary}
          style={{
            letterSpacing: '0.14em',
            whiteSpace: 'nowrap',
          }}
        >
          Sections
        </Text>

        <Group
          gap="xs"
          wrap="wrap"
          role="tablist"
          aria-label="Technical detail sections"
          style={{
            padding: '0.35rem',
            borderRadius: '999px',
            border: `1px solid ${commonColors.borderPrimary}`,
            background: commonColors.backgroundSecondary,
            boxShadow: `0 10px 24px ${commonColors.shadowLight}`,
          }}
        >
          {technicalSections.map(({ key, icon }) => {
            const isActive = activeTab === key;

            return (
              <UnstyledButton
                key={key}
                id={`tab-${key}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${key}`}
                onClick={() => onTabChange(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem 0.85rem',
                  borderRadius: '999px',
                  color: isActive ? commonColors.accentPrimary : commonColors.textSecondary,
                  background: isActive ? commonColors.backgroundCard : 'transparent',
                  border: `1px solid ${isActive ? commonColors.borderPrimary : 'transparent'}`,
                  boxShadow: isActive ? `0 4px 12px ${commonColors.shadowLight}` : 'none',
                  transform: isActive ? 'translateY(-1px)' : 'translateY(0)',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = commonColors.backgroundCard;
                    e.currentTarget.style.color = commonColors.textPrimary;
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = commonColors.textSecondary;
                  }
                }}
              >
                {icon}
                <Text size="sm" fw={700} c="inherit" style={{ lineHeight: 1.1 }}>
                  {formatSectionTitle(key)}
                </Text>
              </UnstyledButton>
            );
          })}
        </Group>
      </Box>
    );
  }
);

TabNavigation.displayName = 'TabNavigation';

export default TabNavigation;
