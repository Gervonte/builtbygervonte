'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { useIsHydrated } from '@/lib/theme-context';
import { Avatar, Box, Loader } from '@mantine/core';

interface ProfileAvatarProps {
  size?: number;
  src?: string;
  alt?: string;
  name?: string;
  imagePosition?: string;
  imageScale?: number;
}

export default function ProfileAvatar({
  size = 45,
  src = '/images/profile/gervonte-profile.jpg',
  alt = 'Portrait of Gervonte Fowler',
  name = 'Gervonte Fowler',
  imagePosition = 'center 53%',
  imageScale = 1.35,
}: ProfileAvatarProps) {
  const commonColors = useCommonColors();
  const isHydrated = useIsHydrated();

  if (!isHydrated) {
    return (
      <Box
        role="status"
        aria-label="Profile image loading"
        style={{
          width: size,
          height: size,
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: commonColors.backgroundCard,
          opacity: 0.6,
          overflow: 'hidden',
        }}
      >
        <Loader size={size <= 48 ? 'xs' : 'sm'} />
      </Box>
    );
  }

  return (
    <Avatar
      src={src}
      alt={alt}
      name={name}
      size={size}
      radius="xl"
      styles={{
        root: {
          background: commonColors.backgroundCard,
          overflow: 'hidden',
        },
        image: {
          objectFit: 'cover',
          objectPosition: imagePosition,
          transform: `scale(${imageScale})`,
        },
        placeholder: {
          color: commonColors.textPrimary,
          background: commonColors.backgroundCard,
        },
      }}
    />
  );
}
