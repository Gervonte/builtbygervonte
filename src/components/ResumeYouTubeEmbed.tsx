'use client';

import { Box, type BoxProps } from '@mantine/core';
import { memo, useEffect, useRef, useState } from 'react';

const YOUTUBE_IFRAME_API_SRC = 'https://www.youtube.com/iframe_api';
const YOUTUBE_EMBED_BASE_URL = 'https://www.youtube.com/embed';
const PROGRESS_KEY_PREFIX = 'bbg-video-progress';
const RESUME_AFTER_SECONDS = 10;
const NEAR_END_SECONDS = 15;
const SAVE_INTERVAL_MS = 4000;
const YOUTUBE_API_TIMEOUT_MS = 8000;

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
  videoId: string;
  width?: string;
  playerVars?: {
    enablejsapi?: 1;
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

const getFallbackEmbedUrl = (youtubeId: string) =>
  `${YOUTUBE_EMBED_BASE_URL}/${youtubeId}?rel=0&playsinline=1`;

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

    useEffect(() => {
      let isMounted = true;
      setUseFallbackEmbed(false);

      const clearSaveInterval = () => {
        if (saveIntervalRef.current) {
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
            videoId: youtubeId,
            width: '100%',
            playerVars: {
              enablejsapi: 1,
              playsinline: 1,
              rel: 0,
            },
            events: {
              onReady: event => {
                const iframe = event.target.getIframe();
                iframe.title = title;
                iframe.allow =
                  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.allowFullscreen = true;
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
    }, [title, youtubeId]);

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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
