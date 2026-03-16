'use client';

import { useColorCombinations } from '@/lib/theme-aware-colors';
import { Box, Skeleton } from '@mantine/core';
import { memo } from 'react';

interface OptimizedLoadingSpinnerProps {
  height?: number | string;
  width?: number | string;
  count?: number;
  className?: string;
  'aria-label'?: string;
}

const OptimizedLoadingSpinner = memo(
  ({
    height = 400,
    width = '100%',
    count = 1,
    className = '',
    'aria-label': ariaLabel = 'Loading content',
  }: OptimizedLoadingSpinnerProps) => {
    const colorCombinations = useColorCombinations();

    return (
      <Box
        className={`loading-placeholder ${className}`}
        role="status"
        aria-label={ariaLabel}
        style={{
          minHeight: height,
          width,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '2rem',
        }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton
            key={index}
            height={60}
            radius="md"
            style={{
              background: colorCombinations.skeletonGradient,
              backgroundSize: '200% 100%',
              animation: 'loading 1.5s infinite',
            }}
          />
        ))}
        <style jsx>{`
          @keyframes loading {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}</style>
      </Box>
    );
  }
);

OptimizedLoadingSpinner.displayName = 'OptimizedLoadingSpinner';

export default OptimizedLoadingSpinner;
