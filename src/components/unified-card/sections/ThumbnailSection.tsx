'use client';

import { getBadgeContext, getDefaultContext } from '@/lib/badge-contexts';
import { Badge, Box, Image, ThemeIcon, Tooltip } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { memo } from 'react';
import { ThumbnailSectionProps } from '../types';

const ThumbnailSection = memo(
  ({
    thumbnail,
    headerIcon,
    statusBadge,
    primaryAction,
    interactive,
    backgroundGradient,
    aspectRatio,
  }: ThumbnailSectionProps) => {
    const baseScale = thumbnail.scale ?? 1;
    const hoverScale = interactive ? baseScale * 1.05 : baseScale;

    return (
      <Box
        component={thumbnail.src ? 'a' : 'div'}
        {...(thumbnail.src
          ? {
              href: primaryAction?.href || '#',
              target: '_blank',
              rel: 'noopener noreferrer',
            }
          : {})}
        style={{
          position: 'relative',
          aspectRatio: aspectRatio,
          borderRadius: '8px',
          overflow: 'hidden',
          background: backgroundGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: interactive ? 'pointer' : 'default',
          textDecoration: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={
          interactive
            ? (e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                // Show click indicator
                const clickIndicator = e.currentTarget.querySelector(
                  '[data-click-indicator]'
                ) as HTMLElement;
                if (clickIndicator) clickIndicator.style.opacity = '1';
              }
            : undefined
        }
        onMouseLeave={
          interactive
            ? (e: React.MouseEvent<HTMLElement>) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                // Hide click indicator
                const clickIndicator = e.currentTarget.querySelector(
                  '[data-click-indicator]'
                ) as HTMLElement;
                if (clickIndicator) clickIndicator.style.opacity = '0';
              }
            : undefined
        }
      >
        {thumbnail.src && (
          <Image
            src={thumbnail.src}
            alt={thumbnail.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: thumbnail.objectPosition || 'center top',
              transition: 'transform 0.3s ease',
              transform: `scale(${baseScale})`,
              transformOrigin: 'center center',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            onMouseEnter={
              interactive
                ? (e: React.MouseEvent<HTMLImageElement>) => {
                    e.currentTarget.style.transform = `scale(${hoverScale})`;
                  }
                : undefined
            }
            onMouseLeave={
              interactive
                ? (e: React.MouseEvent<HTMLImageElement>) => {
                    e.currentTarget.style.transform = `scale(${baseScale})`;
                  }
                : undefined
            }
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        )}

        {/* Fallback content */}
        <Box
          style={{
            width: '100%',
            height: '100%',
            display: thumbnail.src ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: backgroundGradient,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {thumbnail.fallbackIcon || (
            <ThemeIcon color="white" variant="filled" size="xl" radius="xl">
              {headerIcon}
            </ThemeIcon>
          )}
        </Box>

        {/* Click indicator overlay */}
        {interactive && thumbnail.src && (
          <Box
            data-click-indicator
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '50%',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.2s ease',
              pointerEvents: 'none',
            }}
          >
            <IconExternalLink size={16} color="white" />
          </Box>
        )}

        {/* Status badge overlay */}
        {statusBadge && (
          <Box
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
            }}
          >
            <Tooltip
              label={(() => {
                const contextType = statusBadge.contextType || 'status';
                const contextValue = statusBadge.contextValue || statusBadge.text;
                const context =
                  getBadgeContext(contextType, contextValue) ||
                  getDefaultContext(contextType, contextValue);

                return (
                  <div style={{ maxWidth: 300 }}>
                    <div style={{ fontWeight: 600, marginBottom: '8px' }}>{context.title}</div>
                    <div style={{ color: 'var(--mantine-color-dimmed)', marginBottom: '8px' }}>
                      {context.description}
                    </div>
                    {context.capabilities && context.capabilities.length > 0 && (
                      <div>
                        <div
                          style={{
                            fontSize: '12px',
                            fontWeight: 500,
                            color: 'var(--mantine-color-sakura-5)',
                            marginBottom: '4px',
                          }}
                        >
                          {context.capabilitiesLabel || 'What I Can Do:'}
                        </div>
                        <ul style={{ fontSize: '12px', paddingLeft: '16px', margin: 0 }}>
                          {context.capabilities.map((capability, index) => (
                            <li key={index}>{capability}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })()}
              multiline
              position="bottom"
              withArrow
              offset={8}
              w={300}
            >
              <Badge
                color={statusBadge.color}
                variant="filled"
                size="sm"
                style={{
                  cursor: 'help',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {statusBadge.text}
              </Badge>
            </Tooltip>
          </Box>
        )}
      </Box>
    );
  }
);

ThumbnailSection.displayName = 'ThumbnailSection';

export default ThumbnailSection;
