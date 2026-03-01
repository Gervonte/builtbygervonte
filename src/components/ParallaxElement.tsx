'use client';

import { useParallax } from '@/lib/parallax-context';
import { Box } from '@mantine/core';
import { useEffect, useRef } from 'react';

interface ParallaxElementProps {
  speed?: number;
  center?: boolean;
  horizontal?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function ParallaxElement({
  speed = -2,
  center = false,
  horizontal = false,
  className = '',
  children,
  style = {},
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const instanceRef =
    useRef<
      ReturnType<typeof useParallax>['createRellaxInstance'] extends (...args: any[]) => infer R
        ? R
        : never | null
    >(null);
  const { createRellaxInstance, destroyRellaxInstance, isReducedMotion, globalSpeedMultiplier } =
    useParallax();

  useEffect(() => {
    if (!elementRef.current || isReducedMotion) {
      return;
    }

    // Clean up existing instance
    if (instanceRef.current) {
      destroyRellaxInstance(instanceRef.current);
      instanceRef.current = null;
    }

    // Wait a bit for the element to be fully rendered
    const timer = setTimeout(() => {
      const instance = createRellaxInstance(elementRef.current!, speed, {
        center,
        horizontal,
      });

      if (instance) {
        instanceRef.current = instance;
      }
    }, 200);

    return () => {
      clearTimeout(timer);
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
  ]);

  return (
    <Box ref={elementRef} className={className} style={style}>
      {children}
    </Box>
  );
}
