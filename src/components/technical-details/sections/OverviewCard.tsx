'use client';

import { Box, Card, Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconChecklist, IconDatabase, IconFileUpload, IconShieldCheck } from '@tabler/icons-react';
import { memo } from 'react';
import type { TechnicalOverviewCard } from '@/lib/projects';
import { SectionCardProps } from '../types';
import { formatSectionTitle, getTechnicalIcon } from '../utils';

const getOverviewCardIcon = (icon: TechnicalOverviewCard['icon']) => {
  switch (icon) {
    case 'file-upload':
      return <IconFileUpload size={20} />;
    case 'database':
      return <IconDatabase size={20} />;
    case 'checklist':
      return <IconChecklist size={20} />;
    case 'shield-check':
      return <IconShieldCheck size={20} />;
    default:
      return null;
  }
};

const renderOverviewCardDescription = (card: TechnicalOverviewCard) => {
  if (!card.emphasis?.length) {
    return card.description;
  }

  const emphasizedText = new Set(card.emphasis);
  const escapedTerms = card.emphasis.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const parts = card.description.split(new RegExp(`(${escapedTerms.join('|')})`, 'g'));

  return parts.map((part, index) =>
    emphasizedText.has(part) ? <strong key={`${part}-${index}`}>{part}</strong> : part
  );
};

const OverviewCard = memo(({ section, sectionKey, commonColors }: SectionCardProps) => {
  const overviewCards = section.overviewCards ?? [];
  const cardStyles = {
    boxShadow: `0 2px 8px ${commonColors.shadowLight}`,
    minHeight: '120px',
    transition: 'all 0.2s ease-in-out',
    transform: 'scale(1)',
  };
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = 'scale(1.02)';
    event.currentTarget.style.boxShadow = `0 4px 16px ${commonColors.shadowMedium}`;
  };
  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = 'scale(1)';
    event.currentTarget.style.boxShadow = `0 2px 8px ${commonColors.shadowLight}`;
  };

  if (overviewCards.length > 0) {
    return (
      <Stack gap="md">
        <Card
          padding="xl"
          radius="md"
          style={cardStyles}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Group gap="sm" align="flex-start" wrap="nowrap">
            <ThemeIcon
              color={commonColors.accentPrimary}
              variant="light"
              size="xl"
              style={{ flexShrink: 0 }}
            >
              {getTechnicalIcon(sectionKey)}
            </ThemeIcon>
            <Box style={{ flex: 1, minWidth: 0 }}>
              <Text size="xs" fw={700} tt="uppercase" c={commonColors.accentPrimary} mb={4}>
                {formatSectionTitle(sectionKey)} Overview
              </Text>
              {section.overviewHeadline && (
                <Title order={3} c={commonColors.textPrimary} fw={700} mb="xs">
                  {section.overviewHeadline}
                </Title>
              )}
              <Text size="md" c={commonColors.textSecondary} lh={1.6}>
                {section.description}
              </Text>
            </Box>
          </Group>
        </Card>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          {overviewCards.map(card => (
            <Card
              key={card.title}
              padding="lg"
              radius="md"
              style={{ ...cardStyles, height: '100%' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Group gap="sm" align="flex-start" wrap="nowrap">
                <ThemeIcon
                  color={commonColors.accentPrimary}
                  variant="light"
                  size="lg"
                  style={{ flexShrink: 0 }}
                >
                  {getOverviewCardIcon(card.icon)}
                </ThemeIcon>
                <Box style={{ flex: 1, minWidth: 0 }}>
                  <Text size="xs" fw={700} tt="uppercase" c={commonColors.accentPrimary} mb={4}>
                    {card.eyebrow}
                  </Text>
                  <Title order={4} c={commonColors.textPrimary} fw={700} mb="xs">
                    {card.title}
                  </Title>
                  <Text size="sm" c={commonColors.textSecondary} lh={1.6}>
                    {renderOverviewCardDescription(card)}
                  </Text>
                </Box>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    );
  }

  return (
    <Card
      padding="xl"
      radius="md"
      style={{ ...cardStyles, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Group gap="sm" mb="sm" align="flex-start">
        <ThemeIcon
          color={commonColors.accentPrimary}
          variant="light"
          size="xl"
          style={{
            cursor: 'default',
            flexShrink: 0,
            transition: 'all 0.2s ease-in-out',
            transform: 'scale(1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = `0 4px 12px ${commonColors.shadowMedium}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {getTechnicalIcon(sectionKey)}
        </ThemeIcon>
        <Box style={{ flex: 1 }}>
          <Title order={3} c={commonColors.textPrimary} fw={700} mb="xs">
            {formatSectionTitle(sectionKey)} Overview
          </Title>
          <Text
            size="md"
            c={commonColors.textSecondary}
            lh={1.6}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {section.description}
          </Text>
        </Box>
      </Group>
    </Card>
  );
});

OverviewCard.displayName = 'OverviewCard';

export default OverviewCard;
