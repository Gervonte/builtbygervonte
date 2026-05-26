'use client';

import { Box, Stack, Text, type BoxProps } from '@mantine/core';
import { IconPlayerPlay } from '@tabler/icons-react';
import { memo, useEffect, useRef, useState } from 'react';

const YOUTUBE_IFRAME_API_SRC = 'https://www.youtube.com/iframe_api';
const YOUTUBE_EMBED_HOST = 'https://www.youtube.com';
const YOUTUBE_EMBED_BASE_URL = `${YOUTUBE_EMBED_HOST}/embed`;
const PROGRESS_KEY_PREFIX = 'bbg-video-progress';
const RESUME_AFTER_SECONDS = 10;
const NEAR_END_SECONDS = 15;
const SAVE_INTERVAL_MS = 4000;
const YOUTUBE_API_TIMEOUT_MS = 8000;
const YOUTUBE_REFERRER_POLICY = 'strict-origin-when-cross-origin';

interface ResumeYouTubeEmbedProps extends Omit<BoxProps, 'children'> {
  youtubeId: string;
  title: string;
}

interface YouTubePlayer {
  destroy: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getIframe: () => HTMLIFrameElement;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
}

interface YouTubePlayerEvent {
  data: number;
  target: YouTubePlayer;
}

interface YouTubePlayerOptions {
  height?: string;
  host?: string;
  videoId: string;
  width?: string;
  playerVars?: {
    autoplay?: 0;
    enablejsapi?: 1;
    origin?: string;
    playsinline?: 1;
    rel?: 0;
  };
  events?: {
    onReady?: (event: YouTubePlayerEvent) => void;
    onStateChange?: (event: YouTubePlayerEvent) => void;
  };
}

interface YouTubeApi {
  Player: new (element: HTMLElement, options: YouTubePlayerOptions) => YouTubePlayer;
  PlayerState: {
    ENDED: number;
    PLAYING: number;
  };
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<YouTubeApi> | undefined;

const getProgressKey = (youtubeId: string) => `${PROGRESS_KEY_PREFIX}:${youtubeId}`;

const getCurrentOrigin = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return window.location.origin;
};

const getEmbedSearchParams = () => {
  const params = new URLSearchParams({
    autoplay: '0',
    enablejsapi: '1',
    playsinline: '1',
    rel: '0',
  });
  const origin = getCurrentOrigin();

  if (origin) {
    params.set('origin', origin);
  }

  return params;
};

const getFallbackEmbedUrl = (youtubeId: string) =>
  `${YOUTUBE_EMBED_BASE_URL}/${youtubeId}?${getEmbedSearchParams().toString()}`;

const getThumbnailUrl = (youtubeId: string, quality: 'hqdefault' | 'mqdefault' = 'hqdefault') =>
  `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;

const getStoredProgress = (youtubeId: string) => {
  try {
    const savedTime = Number(window.localStorage.getItem(getProgressKey(youtubeId)));
    return Number.isFinite(savedTime) ? savedTime : 0;
  } catch {
    return 0;
  }
};

const setStoredProgress = (youtubeId: string, seconds: number) => {
  try {
    window.localStorage.setItem(getProgressKey(youtubeId), String(seconds));
  } catch {
    // Progress resume is optional; blocked storage should not break playback.
  }
};

const clearStoredProgress = (youtubeId: string) => {
  try {
    window.localStorage.removeItem(getProgressKey(youtubeId));
  } catch {
    // Progress resume is optional; blocked storage should not break playback.
  }
};

const loadYouTubeApi = (): Promise<YouTubeApi> => {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise((resolve, reject) => {
    const existingCallback = window.onYouTubeIframeAPIReady;
    let settled = false;
    let timeoutId: number | undefined;

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${YOUTUBE_IFRAME_API_SRC}"]`
    );

    const script = existingScript ?? document.createElement('script');

    const cleanup = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      script.removeEventListener('error', handleError);
    };

    const fail = (error: Error) => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      youtubeApiPromise = undefined;

      if (window.onYouTubeIframeAPIReady === handleReady) {
        window.onYouTubeIframeAPIReady = existingCallback;
      }

      reject(error);
    };

    const handleError = () => {
      fail(new Error('YouTube iframe API failed to load'));
    };

    const handleReady = () => {
      existingCallback?.();

      if (!window.YT?.Player) {
        fail(new Error('YouTube iframe API loaded without YT.Player'));
        return;
      }

      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      resolve(window.YT);
    };

    window.onYouTubeIframeAPIReady = handleReady;
    script.addEventListener('error', handleError, { once: true });

    timeoutId = window.setTimeout(() => {
      fail(new Error('YouTube iframe API timed out'));
    }, YOUTUBE_API_TIMEOUT_MS);

    if (!existingScript) {
      script.src = YOUTUBE_IFRAME_API_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return youtubeApiPromise;
};

const shouldResume = (savedTime: number, duration: number) => {
  if (savedTime <= RESUME_AFTER_SECONDS) {
    return false;
  }

  if (Number.isFinite(duration) && duration > 0 && duration - savedTime <= NEAR_END_SECONDS) {
    return false;
  }

  return true;
};

const ResumeYouTubeEmbed = memo(
  ({ youtubeId, title, style, ...boxProps }: ResumeYouTubeEmbedProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<YouTubePlayer | null>(null);
    const saveIntervalRef = useRef<number | null>(null);
    const [useFallbackEmbed, setUseFallbackEmbed] = useState(false);
    const [shouldLoadPlayer, setShouldLoadPlayer] = useState(false);
    const [thumbnailSrc, setThumbnailSrc] = useState(() => getThumbnailUrl(youtubeId));

    useEffect(() => {
      setThumbnailSrc(getThumbnailUrl(youtubeId));
    }, [youtubeId]);

    useEffect(() => {
      let isMounted = true;
      setUseFallbackEmbed(false);

      if (!shouldLoadPlayer) {
        return () => {
          isMounted = false;
        };
      }

      const clearSaveInterval = () => {
        if (saveIntervalRef.current !== null) {
          window.clearInterval(saveIntervalRef.current);
          saveIntervalRef.current = null;
        }
      };

      const saveProgress = (player: YouTubePlayer) => {
        const currentTime = Math.floor(player.getCurrentTime());

        if (Number.isFinite(currentTime) && currentTime > 0) {
          setStoredProgress(youtubeId, currentTime);
        }
      };

      loadYouTubeApi()
        .then(YT => {
          if (!isMounted || !containerRef.current) {
            return;
          }

          playerRef.current = new YT.Player(containerRef.current, {
            height: '100%',
            host: YOUTUBE_EMBED_HOST,
            videoId: youtubeId,
            width: '100%',
            playerVars: {
              autoplay: 0,
              enablejsapi: 1,
              origin: getCurrentOrigin(),
              playsinline: 1,
              rel: 0,
            },
            events: {
              onReady: event => {
                const iframe = event.target.getIframe();
                iframe.title = title;
                iframe.allow =
                  'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.allowFullscreen = true;
                iframe.loading = 'lazy';
                iframe.referrerPolicy = YOUTUBE_REFERRER_POLICY;
                iframe.style.border = '0';

                const savedTime = getStoredProgress(youtubeId);
                const duration = event.target.getDuration();

                if (savedTime > RESUME_AFTER_SECONDS && !shouldResume(savedTime, duration)) {
                  clearStoredProgress(youtubeId);
                  return;
                }

                if (shouldResume(savedTime, duration)) {
                  event.target.seekTo(savedTime, true);
                }
              },
              onStateChange: event => {
                if (event.data === YT.PlayerState.PLAYING) {
                  clearSaveInterval();
                  saveProgress(event.target);
                  saveIntervalRef.current = window.setInterval(() => {
                    saveProgress(event.target);
                  }, SAVE_INTERVAL_MS);
                  return;
                }

                if (event.data === YT.PlayerState.ENDED) {
                  clearStoredProgress(youtubeId);
                }

                clearSaveInterval();
              },
            },
          });
        })
        .catch(() => {
          if (isMounted) {
            setUseFallbackEmbed(true);
          }
        });

      return () => {
        isMounted = false;
        clearSaveInterval();
        playerRef.current?.destroy();
        playerRef.current = null;
      };
    }, [shouldLoadPlayer, title, youtubeId]);

    if (useFallbackEmbed) {
      return (
        <Box
          {...boxProps}
          style={{
            width: '100%',
            height: '100%',
            ...style,
          }}
        >
          <iframe
            title={title}
            src={getFallbackEmbedUrl(youtubeId)}
            loading="lazy"
            referrerPolicy={YOUTUBE_REFERRER_POLICY}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              width: '100%',
              height: '100%',
              border: 0,
            }}
          />
        </Box>
      );
    }

    if (!shouldLoadPlayer) {
      return (
        <Box
          {...boxProps}
          component="button"
          type="button"
          onClick={() => setShouldLoadPlayer(true)}
          aria-label={`Play ${title}`}
          style={{
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            height: '100%',
            border: 0,
            cursor: 'pointer',
            padding: 0,
            color: '#FFFFFF',
            ...style,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            aria-hidden="true"
            src={thumbnailSrc}
            loading="lazy"
            decoding="async"
            onError={event => {
              const nextSrc = getThumbnailUrl(youtubeId, 'mqdefault');

              if (event.currentTarget.src.endsWith('/mqdefault.jpg')) {
                return;
              }

              setThumbnailSrc(nextSrc);
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
            }}
          />
          <Box
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(rgba(14, 20, 27, 0.18), rgba(14, 20, 27, 0.42))',
            }}
          />
          <Stack align="center" justify="center" gap="xs" h="100%">
            <Box
              aria-hidden="true"
              style={{
                position: 'relative',
                zIndex: 1,
                alignItems: 'center',
                background: 'rgba(14, 20, 27, 0.78)',
                borderRadius: '999px',
                display: 'inline-flex',
                height: '64px',
                justifyContent: 'center',
                width: '64px',
              }}
            >
              <IconPlayerPlay size={30} fill="currentColor" />
            </Box>
            <Text
              fw={700}
              size="sm"
              style={{
                position: 'relative',
                zIndex: 1,
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.55)',
              }}
            >
              Play video
            </Text>
          </Stack>
        </Box>
      );
    }

    return (
      <Box
        {...boxProps}
        ref={containerRef}
        title={title}
        style={{
          width: '100%',
          height: '100%',
          ...style,
        }}
      />
    );
  }
);

ResumeYouTubeEmbed.displayName = 'ResumeYouTubeEmbed';

export default ResumeYouTubeEmbed;
