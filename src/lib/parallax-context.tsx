'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type Rellax from 'rellax';

// Type definitions for Rellax
export type RellaxInstance =
  | {
      destroy: () => void;
      refresh: () => void;
      start: () => void;
      stop: () => void;
      burst?: () => void;
    }
  | Rellax.RellaxInstance;

interface ParallaxContextType {
  isReducedMotion: boolean;
  globalSpeedMultiplier: number;
  createRellaxInstance: (
    element: HTMLElement,
    speed?: number,
    options?: { center?: boolean; horizontal?: boolean }
  ) => Promise<RellaxInstance | null>;
  destroyRellaxInstance: (instance: RellaxInstance) => void;
  setGlobalSpeedMultiplier: (multiplier: number) => void;
}

const ParallaxContext = createContext<ParallaxContextType | undefined>(undefined);

export const useParallax = () => {
  const context = useContext(ParallaxContext);
  if (context === undefined) {
    throw new Error('useParallax must be used within a ParallaxProvider');
  }
  return context;
};

interface ParallaxProviderProps {
  children: React.ReactNode;
}

export const ParallaxProvider: React.FC<ParallaxProviderProps> = ({ children }) => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [globalSpeedMultiplier, setGlobalSpeedMultiplier] = useState(1.0);
  const rellaxInstances = useRef<Set<RellaxInstance>>(new Set());

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleReducedMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  const createRellaxInstance = async (
    element: HTMLElement,
    speed: number = -2,
    options: { center?: boolean; horizontal?: boolean } = {}
  ): Promise<RellaxInstance | null> => {
    if (isReducedMotion || typeof window === 'undefined') {
      return null;
    }

    try {
      const { default: Rellax } = await import('rellax');
      const adjustedSpeed = speed * globalSpeedMultiplier;
      const { center = false, horizontal = false } = options;
      const instance = new Rellax(element, {
        speed: adjustedSpeed,
        center: center,
        wrapper: undefined,
        round: true,
        vertical: !horizontal,
        horizontal: horizontal,
      });

      rellaxInstances.current.add(instance);
      return instance;
    } catch (error) {
      console.warn('Failed to create Rellax instance:', error);
      return null;
    }
  };

  const destroyRellaxInstance = (instance: RellaxInstance) => {
    try {
      instance.destroy();
      rellaxInstances.current.delete(instance);
    } catch (error) {
      console.warn('Failed to destroy Rellax instance:', error);
    }
  };

  // Cleanup all instances on unmount
  useEffect(() => {
    return () => {
      const instances = rellaxInstances.current;
      instances.forEach(instance => {
        try {
          instance.destroy();
        } catch (error) {
          console.warn('Error destroying Rellax instance:', error);
        }
      });
      instances.clear();
    };
  }, []);

  const value: ParallaxContextType = {
    isReducedMotion,
    globalSpeedMultiplier,
    createRellaxInstance,
    destroyRellaxInstance,
    setGlobalSpeedMultiplier,
  };

  return <ParallaxContext.Provider value={value}>{children}</ParallaxContext.Provider>;
};
