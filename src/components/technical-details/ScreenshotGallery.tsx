'use client';

import { Box, Card, Group, Image, SimpleGrid, Text, ThemeIcon, Title } from '@mantine/core';
import { IconPhoto, IconZoomIn } from '@tabler/icons-react';
import { memo } from 'react';
import { MobileTooltip } from '../MobileTooltip';
import { ScreenshotGalleryProps, ScreenshotItem } from './types';

const ScreenshotGallery = memo(
  ({ screenshots, sectionKey, commonColors, onImageSelect }: ScreenshotGalleryProps) => {
    if (!screenshots || screenshots.length === 0) {
      return null;
    }

    // Normalize screenshots to ScreenshotItem format
    const normalizedScreenshots: ScreenshotItem[] = screenshots.map((screenshot, index) => {
      if (typeof screenshot === 'string') {
        return {
          src: screenshot,
          alt: `${sectionKey} screenshot ${index + 1}`,
          caption: `Screenshot ${index + 1}`,
        };
      }
      return screenshot;
    });

    return (
      <Box
        style={{
          width: '100%',
          maxWidth: '1120px',
          margin: '0 auto',
        }}
      >
        <Card
          padding="xl"
          radius="md"
          style={{
            boxShadow: `0 2px 8px ${commonColors.shadowLight}`,
            transition: 'all 0.2s ease-in-out',
            transform: 'scale(1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = `0 4px 16px ${commonColors.shadowMedium}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = `0 2px 8px ${commonColors.shadowLight}`;
          }}
        >
          <Group gap="sm" mb="md">
            <ThemeIcon
              color={commonColors.accentPrimary}
              variant="light"
              size="lg"
              style={{
                cursor: 'default',
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
              <IconPhoto size={24} />
            </ThemeIcon>
            <Group gap="xs" align="center">
              <Title order={5} fw={700} c={commonColors.textPrimary}>
                Screenshots & Visuals
              </Title>
              <MobileTooltip
                label="Visual examples of technical systems - dashboards, monitoring tools, and behind-the-scenes interfaces."
                multiline
                w={300}
                withArrow
              >
                <ThemeIcon
                  color="sakura"
                  variant="light"
                  size="sm"
                  radius="xl"
                  style={{ cursor: 'help' }}
                >
                  ?
                </ThemeIcon>
              </MobileTooltip>
            </Group>
          </Group>
          <SimpleGrid cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 2 }} spacing="md">
            {normalizedScreenshots.map((screenshot: ScreenshotItem, index: number) => (
              <Box
                key={index}
                style={{
                  position: 'relative',
                  borderRadius: 'var(--mantine-radius-md)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  transform: 'scale(1)',
                  border: `1px solid ${commonColors.borderPrimary}`,
                }}
                onClick={() => onImageSelect(screenshot)}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 8px 25px ${commonColors.shadowMedium}`;
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Box
                  style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={`/images/technical/${screenshot.src}`}
                    alt={screenshot.alt || `${sectionKey} screenshot ${index + 1}`}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  <Box
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0, 0, 0, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  >
                    <ThemeIcon color="white" variant="filled" size="lg" radius="xl">
                      <IconZoomIn size={20} />
                    </ThemeIcon>
                  </Box>
                </Box>
                {screenshot.caption && (
                  <Box p="sm">
                    <Text
                      size="sm"
                      fw={500}
                      c={commonColors.textPrimary}
                      style={{
                        lineHeight: 1.4,
                        textAlign: 'center',
                      }}
                    >
                      {screenshot.caption}
                    </Text>
                  </Box>
                )}
              </Box>
            ))}
          </SimpleGrid>
        </Card>
      </Box>
    );
  }
);

ScreenshotGallery.displayName = 'ScreenshotGallery';

export default ScreenshotGallery;
