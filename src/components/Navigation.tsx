'use client';

import { useColorCombinations, useCommonColors, usePrimaryColors } from '@/lib/theme-aware-colors';
import { useTheme } from '@/lib/theme-context';
import { Anchor, Group, Stack } from '@mantine/core';
import { useEffect, useState } from 'react';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationProps {
  links: NavLink[];
  onLinkClick?: (href: string) => void;
  variant?: 'header' | 'footer' | 'mobile';
  scrolled?: boolean;
}

export default function Navigation({
  links,
  onLinkClick,
  variant = 'header',
  scrolled = false,
}: NavigationProps) {
  const colorCombinations = useColorCombinations();
  const commonColors = useCommonColors();
  const primaryColors = usePrimaryColors();
  const { resolvedColorScheme } = useTheme();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  const handleClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveLink(href);

    if (onLinkClick) {
      onLinkClick(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const getLinkStyles = (link: NavLink) => {
    const isActive = activeLink === link.href || link.active;

    const baseStyles = {
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'all 0.3s ease',
      position: 'relative' as const,
      padding: variant === 'mobile' ? '0.5rem 0' : '0.25rem 0',
    };

    switch (variant) {
      case 'header':
        return {
          ...baseStyles,
          color:
            scrolled || resolvedColorScheme !== 'dark'
              ? commonColors.textPrimary
              : commonColors.textInverse,
          fontSize: '0.875rem',
          '&:hover': {
            color: primaryColors[3],
          },
          ...(isActive && {
            color: primaryColors[3],
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-4px',
              left: 0,
              right: 0,
              height: '2px',
              background: colorCombinations.effectGradient,
              borderRadius: '1px',
            },
          }),
        };

      case 'footer':
        return {
          ...baseStyles,
          color: commonColors.textSecondary,
          fontSize: '0.875rem',
          '&:hover': {
            color: primaryColors[3],
          },
        };

      case 'mobile':
        return {
          ...baseStyles,
          color: commonColors.textPrimary,
          fontSize: '1rem',
          '&:hover': {
            color: primaryColors[3],
            paddingLeft: '0.5rem',
          },
          ...(isActive && {
            color: primaryColors[3],
            paddingLeft: '0.5rem',
            borderLeft: `3px solid ${primaryColors[3]}`,
          }),
        };

      default:
        return baseStyles;
    }
  };

  return variant === 'mobile' ? (
    <Stack gap={0} align="stretch">
      {links.map(link => (
        <Anchor
          key={link.href}
          href={link.href}
          onClick={e => handleClick(link.href, e)}
          style={getLinkStyles(link)}
        >
          {link.label}
        </Anchor>
      ))}
    </Stack>
  ) : (
    <Group gap="xl" align="center">
      {links.map(link => (
        <Anchor
          key={link.href}
          href={link.href}
          onClick={e => handleClick(link.href, e)}
          style={getLinkStyles(link)}
        >
          {link.label}
        </Anchor>
      ))}
    </Group>
  );
}
