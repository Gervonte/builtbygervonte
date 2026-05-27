'use client';

import { useColorCombinations, useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Title } from '@mantine/core';
import Image from 'next/image';
import { useState } from 'react';

const BRAND_LOGO_SRC = '/images/brand/builtbygervonte-logo.png';

interface BrandLogoProps {
  alt?: string;
  width?: string | number;
}

export default function BrandLogo({
  alt = 'BuiltByGervonte logo',
  width = 'clamp(240px, 42vw, 520px)',
}: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);
  const colorCombinations = useColorCombinations();
  const commonColors = useCommonColors();

  if (hasError) {
    return (
      <Title
        order={2}
        size="h2"
        style={{
          backgroundImage: colorCombinations.primaryGradient,
          backgroundSize: '100% 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.03em',
        }}
      >
        BuiltByGervonte
      </Title>
    );
  }

  return (
    <Box
      style={{
        width,
        maxWidth: '100%',
      }}
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt={alt}
        width={1208}
        height={530}
        loading="lazy"
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          filter: `drop-shadow(0 1px 8px ${commonColors.shadowPrimaryLight})`,
        }}
        onError={() => setHasError(true)}
      />
    </Box>
  );
}
