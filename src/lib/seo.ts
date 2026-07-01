import { Metadata } from 'next';

// SEO Configuration
export const seoConfig = {
  title: 'BuiltByGervonte — Rainy Day, Caribbean Fintech, and Software Demos',
  description:
    'BuiltByGervonte is the software studio of Gervonté Fowler, featuring Rainy Day, a statement-based personal finance platform for Caribbean markets where connected-account coverage is limited, plus software demos, founder stories, and technical product work.',
  keywords: [
    'BuiltByGervonte',
    'Built By Gervonte',
    'BuiltByGervonte Videos',
    'Gervonté Fowler',
    'Gervonte Fowler',
    'Ignition Labs',
    'Rainy Day',
    'Rainy Day v0.2.0',
    'Rainy Day Product Demos',
    'Statement-Based Personal Finance',
    'Statement-Based PFM',
    'Personal Finance Management',
    'Bank Statement Uploads',
    'Open Banking Caribbean',
    'Caribbean Fintech',
    'Bahamas Fintech',
    'LEETCODE BEASTMODE',
    'Founder Stories',
    'Software Engineering Journey',
    'Caribbean Tech Builder',
    'Personal Finance App',
    'Fintech Tools',
    'BEYWHAT',
    'Software Engineer',
    'AI-Enhanced Developer',
    'Full-Stack Developer',
    'SaaS Studio',
    'Fintech Apps',
    'Caribbean Technology',
    'Bahamian Founder',
    'Bahamian Software Engineer',
    'Software Engineer Bahamas',
  ],
  author: 'BuiltByGervonte LLC',
  url: 'https://builtbygervonte.com',
  image: 'https://builtbygervonte.com/og-image',
  linkedinHandle: 'gervonte-fowler-5a7781158',
  githubHandle: 'gervonte',
};

// Generate metadata for pages
export function generatePageMetadata(
  title?: string,
  description?: string,
  image?: string,
  path?: string
): Metadata {
  const fullTitle = title ? `${title} | ${seoConfig.title}` : seoConfig.title;
  const fullDescription = description || seoConfig.description;
  const fullImage = image || seoConfig.image;
  const fullUrl = path ? `${seoConfig.url}${path}` : seoConfig.url;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: seoConfig.keywords,
    authors: [{ name: seoConfig.author }],
    creator: seoConfig.author,
    publisher: seoConfig.author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: fullUrl,
      title: fullTitle,
      description: fullDescription,
      siteName: 'BuiltByGervonte',
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
    },
    alternates: {
      canonical: fullUrl,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

// Generate structured data for the portfolio
export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${seoConfig.url}/#organization`,
    name: 'BuiltByGervonte LLC',
    description: seoConfig.description,
    url: seoConfig.url,
    image: seoConfig.image,
    sameAs: [
      `https://linkedin.com/in/${seoConfig.linkedinHandle}`,
      `https://github.com/${seoConfig.githubHandle}`,
      'https://instagram.com/gervonte_',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lakeland',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    founder: {
      '@type': 'Person',
      '@id': `${seoConfig.url}/#person`,
    },
  };
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${seoConfig.url}/#person`,
    name: 'Gervonté Fowler',
    url: seoConfig.url,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Florida Polytechnic University',
    },
    worksFor: {
      '@type': 'Organization',
      '@id': `${seoConfig.url}/#organization`,
    },
    sameAs: [
      `https://linkedin.com/in/${seoConfig.linkedinHandle}`,
      `https://github.com/${seoConfig.githubHandle}`,
      'https://instagram.com/gervonte_',
    ],
  };
}

export function generateRainyDayStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${seoConfig.url}/#rainy-day`,
    name: 'Rainy Day',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: 'https://rainyday.ignitionlabs.app/demo',
    description:
      'Rainy Day is a statement-based personal finance platform for Caribbean markets where connected-account coverage is limited.',
    creator: {
      '@type': 'Organization',
      '@id': `${seoConfig.url}/#organization`,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/LimitedAvailability',
    },
    keywords: [
      'Caribbean fintech',
      'statement-based personal finance',
      'bank statement uploads',
      'personal finance management',
      'cash-flow forecasting',
      'CIBC Caribbean',
      'Scotiabank Caribbean',
      'Bank of The Bahamas',
      'Teachers & Salaried Workers Co-operative Credit Union',
      'Bahamas personal finance app',
      'Bahamas budgeting app',
      'Mint for The Bahamas',
      'Rocket Money for The Bahamas',
      'Caribbean budgeting app',
      'Caribbean personal finance management',
      'Caribbean bank statement analysis',
      'open banking alternative Caribbean',
    ],
  };
}

export function generateRainyDayVideoStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${seoConfig.url}/#rainy-day-v0-2-0-video`,
    name: 'Rainy Day v0.2.0',
    description:
      'A Rainy Day software demo covering expanded statement support, deterministic intelligence, privacy-safe analytics, and the private alpha path for real users.',
    thumbnailUrl: ['https://i.ytimg.com/vi/98GISOrBvts/maxresdefault.jpg'],
    duration: 'PT27M30S',
    contentUrl: 'https://www.youtube.com/watch?v=98GISOrBvts',
    embedUrl: 'https://www.youtube.com/embed/98GISOrBvts',
    publisher: {
      '@type': 'Organization',
      '@id': `${seoConfig.url}/#organization`,
    },
    about: {
      '@type': 'SoftwareApplication',
      '@id': `${seoConfig.url}/#rainy-day`,
    },
  };
}
