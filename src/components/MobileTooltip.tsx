'use client';

import { useMobileTooltip } from '@/hooks/useMobileTooltip';
import { Tooltip, TooltipProps } from '@mantine/core';
import { createContext, ReactNode, useContext } from 'react';

const TooltipZIndexContext = createContext<number | undefined>(undefined);

export function TooltipZIndexProvider({ value, children }: { value: number; children: ReactNode }) {
  return <TooltipZIndexContext.Provider value={value}>{children}</TooltipZIndexContext.Provider>;
}

interface MobileTooltipProps extends Omit<
  TooltipProps,
  'opened' | 'onOpen' | 'onClose' | 'zIndex'
> {
  children: ReactNode;
  label: string | ReactNode;
  delay?: number;
  disabled?: boolean;
  trigger?: 'hover' | 'click' | 'both';
  mobileBehavior?: 'tap' | 'hold' | 'both';
  zIndex?: number;
}

/**
 * Mobile-optimized tooltip component that handles both hover and touch interactions
 * Provides better UX on mobile devices with appropriate touch handling
 */
export function MobileTooltip({
  children,
  label,
  delay = 200,
  disabled = false,
  trigger = 'both',
  mobileBehavior = 'tap',
  multiline = true,
  withArrow = true,
  position = 'top',
  offset = 8,
  zIndex,
  ...props
}: MobileTooltipProps) {
  const contextZIndex = useContext(TooltipZIndexContext);
  const resolvedZIndex = zIndex ?? contextZIndex ?? 1000;

  const { opened, handlers, ref } = useMobileTooltip({
    delay,
    disabled,
    trigger,
    // mobileBehavior is available for future enhancements
  });

  // Enhanced props for mobile
  const tooltipProps: TooltipProps = {
    ...props,
    opened,
    label,
    multiline,
    withArrow,
    position,
    offset,
    zIndex: resolvedZIndex,
    // Mobile-specific styling
    styles: {
      tooltip: {
        fontSize: '14px',
        maxWidth: '280px',
        padding: '8px 12px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: resolvedZIndex,
      },
      arrow: {
        zIndex: resolvedZIndex + 1,
      },
    },
    // Prevent tooltip from being cut off on mobile
    withinPortal: true,
  };

  return (
    <Tooltip {...tooltipProps}>
      <span
        ref={ref}
        {...handlers}
        className="mobile-tooltip-wrapper"
        style={{
          // Responsive touch targets: 5px on desktop, 44px on mobile
          minHeight: '5px',
          minWidth: '5px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </span>
    </Tooltip>
  );
}
