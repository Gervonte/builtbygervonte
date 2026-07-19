'use client';

import { useParallax, type RellaxInstance } from '@/lib/parallax-context';
import { Box } from '@mantine/core';
import { useEffect, useRef } from 'react';

interface ParallaxElementProps {
  speed?: number;
  center?: boolean;
  horizontal?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  deferUntilInteraction?: boolean;
}

export default function ParallaxElement({
  speed = -2,
  center = false,
  horizontal = false,
  className = '',
  children,
  style = {},
  deferUntilInteraction = false,
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<RellaxInstance | null>(null);
  const { createRellaxInstance, destroyRellaxInstance, isReducedMotion, globalSpeedMultiplier } =
    useParallax();

  useEffect(() => {
    const element = elementRef.current;

    if (!element || isReducedMotion) {
      return;
    }

    // Clean up existing instance
    if (instanceRef.current) {
      destroyRellaxInstance(instanceRef.current);
      instanceRef.current = null;
    }

    let isCancelled = false;
    let delayId: number | undefined;
    let idleId: number | undefined;
    let observer: IntersectionObserver | undefined;
    let isWaitingForInteraction = false;

    const initialize = async () => {
      if (isCancelled || !element.isConnected || instanceRef.current) {
        return;
      }

      const instance = await createRellaxInstance(element, speed, { center, horizontal });

      if (isCancelled && instance) {
        destroyRellaxInstance(instance);
      } else if (instance) {
        instanceRef.current = instance;
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('pointerdown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      isWaitingForInteraction = false;
    };

    const scheduleInitialization = (delay = 750) => {
      observer?.disconnect();

      // Parallax is progressive enhancement. Keep it out of initial render and hydration work.
      delayId = window.setTimeout(() => {
        if ('requestIdleCallback' in window) {
          idleId = window.requestIdleCallback(() => void initialize(), { timeout: 2000 });
        } else {
          void initialize();
        }
      }, delay);
    };

    function handleInteraction() {
      removeInteractionListeners();
      scheduleInitialization(0);
    }

    const requestInitialization = () => {
      if (!deferUntilInteraction) {
        scheduleInitialization();
        return;
      }

      if (isWaitingForInteraction) {
        return;
      }

      isWaitingForInteraction = true;
      window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
      window.addEventListener('pointerdown', handleInteraction, { passive: true, once: true });
      window.addEventListener('keydown', handleInteraction, { once: true });
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            requestInitialization();
          }
        },
        { rootMargin: '150px' }
      );
      observer.observe(element);
    } else {
      requestInitialization();
    }

    return () => {
      isCancelled = true;
      observer?.disconnect();
      removeInteractionListeners();
      if (delayId !== undefined) {
        window.clearTimeout(delayId);
      }
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (instanceRef.current) {
        destroyRellaxInstance(instanceRef.current);
        instanceRef.current = null;
      }
    };
  }, [
    speed,
    center,
    horizontal,
    createRellaxInstance,
    destroyRellaxInstance,
    isReducedMotion,
    globalSpeedMultiplier,
    deferUntilInteraction,
  ]);

  return (
    <Box ref={elementRef} className={className} style={style}>
      {children}
    </Box>
  );
}
