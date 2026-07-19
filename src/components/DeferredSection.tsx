'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import ParallaxElement from './ParallaxElement';

interface DeferredSectionProps {
  id: string;
  label: string;
  children: ReactNode;
  minHeight?: string;
  padding: string;
  scrollMarginTop?: string;
  speed?: number;
}

export default function DeferredSection({
  id,
  label,
  children,
  minHeight,
  padding,
  scrollMarginTop,
  speed,
}: DeferredSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || shouldRender) {
      return;
    }

    if (window.location.hash === `#${id}` || !('IntersectionObserver' in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      {
        // Begin loading just before the section becomes visible without hydrating the whole page.
        rootMargin: '0px 0px 10% 0px',
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [id, shouldRender]);

  return (
    <section
      ref={sectionRef}
      id={id}
      role="region"
      aria-label={label}
      style={{ minHeight, padding, scrollMarginTop }}
    >
      <ParallaxElement speed={speed}>{shouldRender ? children : null}</ParallaxElement>
    </section>
  );
}
