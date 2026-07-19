'use client';

import {
  getFeaturedWatchVideo,
  getWatchCollectionsWithVideos,
  type WatchVideo,
} from '@/data/watch-videos';
import { useModal } from '@/lib/modal-context';
import { getProjectById } from '@/lib/projects';
import {
  useColorCombinations,
  useCommonColors,
  usePrimaryColors,
  useWarmColors,
  useWithOpacity,
} from '@/lib/theme-aware-colors';
import { useTheme } from '@/lib/theme-context';
import {
  Anchor,
  Badge,
  Box,
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBrandYoutube,
  IconClock,
  IconPlayerPlay,
  IconSettings,
  IconVideoOff,
} from '@tabler/icons-react';
import { memo, useMemo, useState } from 'react';
import { LazyTechnicalDetailsModal } from './LazyComponents';
import ResumeYouTubeEmbed from './ResumeYouTubeEmbed';

const YOUTUBE_THUMBNAIL_BASE_URL = 'https://img.youtube.com/vi';

const getVideoStatusLabel = (video: WatchVideo) => {
  if (video.status === 'coming-soon') {
    return 'Coming soon';
  }

  if (!video.youtubeUrl) {
    return 'Link pending';
  }

  return video.status === 'unlisted' ? 'Unlisted' : 'Watch Now';
};

const getVideoThumbnailUrl = (video: WatchVideo) => {
  if (video.thumbnailUrl) {
    return video.thumbnailUrl;
  }

  if (video.youtubeId) {
    return `${YOUTUBE_THUMBNAIL_BASE_URL}/${video.youtubeId}/maxresdefault.jpg`;
  }

  return undefined;
};

const VideoCard = ({ video }: { video: WatchVideo }) => {
  const commonColors = useCommonColors();
  const colorCombinations = useColorCombinations();
  const withOpacity = useWithOpacity;
  const isPlayable = Boolean(video.youtubeUrl);
  const thumbnailUrl = getVideoThumbnailUrl(video);

  const cardContent = (
    <Paper
      className="bbg-watch-video-card-surface"
      p="lg"
      radius="md"
      withBorder
      style={{
        height: '100%',
        borderColor: commonColors.borderPrimary,
        boxShadow: commonColors.shadowCard,
        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
      }}
    >
      <Stack gap="md" h="100%">
        <Box
          style={{
            position: 'relative',
            aspectRatio: '16 / 9',
            borderRadius: '8px',
            background: thumbnailUrl
              ? `linear-gradient(rgba(14, 20, 27, 0.04), rgba(14, 20, 27, 0.08)), url(${thumbnailUrl}) center / cover`
              : colorCombinations.primaryGradientLight,
            border: `1px solid ${commonColors.borderPrimary}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {video.duration && (
            <Badge
              color="dark"
              variant="filled"
              radius="sm"
              leftSection={<IconClock size={12} />}
              style={{
                position: 'absolute',
                top: '0.75rem',
                right: '0.75rem',
                background: 'rgba(14, 20, 27, 0.82)',
                color: '#FFFFFF',
                backdropFilter: 'blur(8px)',
              }}
            >
              {video.duration}
            </Badge>
          )}

          {!thumbnailUrl && (
            <Box
              style={{
                color: commonColors.accentPrimary,
                background: withOpacity(commonColors.backgroundPrimary, 0.72),
                borderRadius: '999px',
                padding: '0.75rem',
              }}
            >
              {isPlayable ? <IconPlayerPlay size={28} /> : <IconVideoOff size={28} />}
            </Box>
          )}
        </Box>

        <Stack gap="xs" style={{ flex: 1 }}>
          <Group gap="xs">
            <Badge color={isPlayable ? 'sakura' : 'gray'} variant="light" radius="sm">
              {getVideoStatusLabel(video)}
            </Badge>
          </Group>

          <Title order={3} size="h4" c={commonColors.textPrimary}>
            {video.title}
          </Title>
          {video.subtitle && (
            <Text size="sm" fw={600} c={commonColors.accentPrimary}>
              {video.subtitle}
            </Text>
          )}
          <Text size="sm" c={commonColors.textSecondary} style={{ flex: 1 }}>
            {video.description}
          </Text>
        </Stack>
      </Stack>
    </Paper>
  );

  if (!isPlayable) {
    return (
      <Box role="group" aria-label={`${video.title}: ${getVideoStatusLabel(video)}`}>
        {cardContent}
      </Box>
    );
  }

  return (
    <Anchor
      className="bbg-watch-video-card"
      href={video.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${video.title} on YouTube`}
      style={{ display: 'block', height: '100%', textDecoration: 'none' }}
    >
      {cardContent}
    </Anchor>
  );
};

const WatchSection = memo(() => {
  const commonColors = useCommonColors();
  const colorCombinations = useColorCombinations();
  const primaryColors = usePrimaryColors();
  const warmColors = useWarmColors();
  const { resolvedColorScheme } = useTheme();
  const { setModalOpen } = useModal();
  const [technicalDetailsOpened, setTechnicalDetailsOpened] = useState(false);
  const featuredVideo = useMemo(() => getFeaturedWatchVideo(), []);
  const featuredTechnicalProject = useMemo(
    () =>
      featuredVideo?.technicalDetailsProjectId
        ? getProjectById(featuredVideo.technicalDetailsProjectId)
        : undefined,
    [featuredVideo]
  );
  const collectionGroups = useMemo(() => getWatchCollectionsWithVideos(), []);
  const isDark = resolvedColorScheme === 'dark';
  const featuredCardStyles = {
    borderColor: commonColors.borderPrimary,
    boxShadow: commonColors.shadowCard,
  };
  const featuredTitleColor = commonColors.textPrimary;
  const featuredSubtitleColor = isDark
    ? (primaryColors[1] ?? commonColors.accentSecondary)
    : commonColors.accentPrimary;
  const featuredDescriptionColor = commonColors.textSecondary;
  const featuredVideoBackground = isDark
    ? (warmColors[0] ?? commonColors.backgroundPrimary)
    : commonColors.backgroundSecondary;
  const featuredVideoShadow = commonColors.shadowCard;
  const featuredButtonShadow = `0 4px 15px ${commonColors.shadowPrimary}`;
  const featuredSecondaryButtonShadow = `0 4px 15px ${commonColors.shadowMedium}`;

  return (
    <Container size="lg">
      <style jsx global>{`
        .bbg-watch-video-card:focus-visible {
          outline: 3px solid ${commonColors.borderFocus};
          outline-offset: 4px;
          border-radius: 10px;
        }

        .bbg-watch-video-card:hover .bbg-watch-video-card-surface,
        .bbg-watch-video-card:focus-visible .bbg-watch-video-card-surface {
          transform: translateY(-4px);
          border-color: ${commonColors.borderSecondary};
          box-shadow: 0 18px 36px ${commonColors.shadowPrimaryLight};
        }

        .bbg-watch-featured-grid {
          display: grid;
          grid-template-columns: minmax(540px, 1fr) minmax(500px, 1.1fr);
          grid-template-areas:
            'content video'
            'actions video';
          column-gap: 2rem;
          row-gap: 1rem;
          align-items: start;
          align-content: center;
        }

        .bbg-watch-featured-content {
          grid-area: content;
        }

        .bbg-watch-featured-video {
          grid-area: video;
          align-self: center;
        }

        .bbg-watch-featured-actions {
          grid-area: actions;
          flex-wrap: nowrap;
        }

        @media (max-width: 78em) {
          .bbg-watch-featured-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              'content'
              'video'
              'actions';
            row-gap: 1.5rem;
          }

          .bbg-watch-featured-actions {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: 100%;
          }

          .bbg-watch-featured-actions > * {
            width: 100%;
          }
        }

        @media (max-width: 48em) {
          .bbg-watch-featured-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
      <Stack gap="xl">
        <Box ta="center" mb="md">
          <Title
            order={2}
            size="h1"
            mb="md"
            style={{
              backgroundImage: colorCombinations.primaryGradient,
              backgroundSize: '100% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Content
          </Title>
          <Text size="xl" c={commonColors.textSecondary} maw={800} mx="auto">
            Watch Rainy Day evolve through product demos, engineering decisions, and lessons from
            user feedback, alongside creative work from the studio.
          </Text>
        </Box>

        {featuredVideo?.youtubeId && (
          <Paper p={{ base: 'md', md: 'xl' }} radius="md" withBorder style={featuredCardStyles}>
            <Box className="bbg-watch-featured-grid">
              <Stack className="bbg-watch-featured-content" gap="md" justify="center">
                <Group gap="xs">
                  <Badge color="sakura" variant="filled" radius="sm">
                    Featured Demo
                  </Badge>
                  {featuredVideo.duration && (
                    <Badge
                      color="earth"
                      variant="light"
                      radius="sm"
                      leftSection={<IconClock size={12} />}
                    >
                      {featuredVideo.duration}
                    </Badge>
                  )}
                </Group>

                <Box>
                  <Title order={2} c={featuredTitleColor}>
                    {featuredVideo.title}
                  </Title>
                  {featuredVideo.subtitle && (
                    <Text mt="xs" fw={700} c={featuredSubtitleColor}>
                      {featuredVideo.subtitle}
                    </Text>
                  )}
                </Box>

                <Text c={featuredDescriptionColor}>{featuredVideo.description}</Text>
              </Stack>

              <Box
                className="bbg-watch-featured-video"
                style={{
                  aspectRatio: '16 / 9',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  background: featuredVideoBackground,
                  boxShadow: featuredVideoShadow,
                }}
              >
                <ResumeYouTubeEmbed
                  youtubeId={featuredVideo.youtubeId}
                  title={`${featuredVideo.title} video`}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>

              {(featuredVideo.youtubeUrl || featuredTechnicalProject?.enableTechnicalDetails) && (
                <Group className="bbg-watch-featured-actions">
                  {featuredTechnicalProject?.enableTechnicalDetails && (
                    <Button
                      leftSection={<IconSettings size={18} />}
                      radius="md"
                      style={{
                        background: colorCombinations.primaryGradient,
                        border: 'none',
                        boxShadow: featuredButtonShadow,
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => {
                        setTechnicalDetailsOpened(true);
                        setModalOpen(true);
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 6px 20px ${commonColors.shadowPrimary}`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = featuredButtonShadow;
                      }}
                    >
                      View Technical Details
                    </Button>
                  )}
                  {featuredVideo.youtubeUrl && (
                    <Button
                      component="a"
                      href={featuredVideo.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="sakura"
                      variant="filled"
                      leftSection={<IconBrandYoutube size={18} />}
                      radius="md"
                      style={{
                        background: commonColors.accentSecondary + '1A',
                        color: commonColors.accentPrimary,
                        border: 'none',
                        borderColor: commonColors.accentPrimary,
                        boxShadow: featuredSecondaryButtonShadow,
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 6px 20px ${commonColors.shadowMedium}`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = featuredSecondaryButtonShadow;
                      }}
                    >
                      Watch on YouTube
                    </Button>
                  )}
                </Group>
              )}
            </Box>
          </Paper>
        )}

        <Stack gap="xl">
          {collectionGroups.map(group => (
            <Box key={group.collection}>
              <Group justify="space-between" align="end" mb="md">
                <Title order={2} size="h3" c={commonColors.textPrimary}>
                  {group.collection}
                </Title>
                <Text size="sm" c={commonColors.textMuted}>
                  {group.videos.length} {group.videos.length === 1 ? 'video' : 'videos'}
                </Text>
              </Group>
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {group.videos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </Stack>
      </Stack>
      {featuredTechnicalProject?.enableTechnicalDetails && (
        <LazyTechnicalDetailsModal
          project={featuredTechnicalProject}
          opened={technicalDetailsOpened}
          onClose={() => {
            setTechnicalDetailsOpened(false);
            setModalOpen(false);
          }}
        />
      )}
    </Container>
  );
});

WatchSection.displayName = 'WatchSection';

export default WatchSection;
