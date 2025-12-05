import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SkipLink from '@/components/SkipLink';
import ThemeWrapper from '@/components/ThemeWrapper';
import {
  generatePageMetadata,
  generatePersonStructuredData,
  generateStructuredData,
} from '@/lib/seo';
import { ThemeProvider } from '@/lib/theme-context';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import '../styles/critical.css';
import '../styles/mobile-tooltips.css';
import '../styles/sakura-optimized.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter',
});

// Navigation links
const navigationLinks = [
  { link: '#work', label: 'Work' },
  { link: '#experience', label: 'Experience' },
  { link: '#about', label: 'About' },
  { link: '#contact', label: 'Contact' },
];

export const metadata: Metadata = generatePageMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationStructuredData = generateStructuredData();
  const personStructuredData = generatePersonStructuredData();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Fonts are handled by Next.js Google Fonts */}
      </head>
      <body className={inter.className} style={{ scrollBehavior: 'auto' }}>
        <ThemeProvider>
          <ThemeWrapper>
            <SkipLink />
            <Header links={navigationLinks} />
            <main style={{ paddingTop: '60px' }}>{children}</main>
            <Footer />
          </ThemeWrapper>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
