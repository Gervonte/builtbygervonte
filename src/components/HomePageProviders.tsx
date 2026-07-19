'use client';

import { ModalProvider } from '@/lib/modal-context';
import { ParallaxProvider } from '@/lib/parallax-context';
import type { ReactNode } from 'react';

interface HomePageProvidersProps {
  children: ReactNode;
}

export default function HomePageProviders({ children }: HomePageProvidersProps) {
  return (
    <ModalProvider>
      <ParallaxProvider>{children}</ParallaxProvider>
    </ModalProvider>
  );
}
