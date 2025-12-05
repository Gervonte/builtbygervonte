import { Metadata } from 'next';

// SEO Configuration
export const seoConfig = {
  title: 'BuiltByGervonte — Software Engineering, Music, Ignition Labs',
  description:
    'BuiltByGervonte LLC is a digital studio by Gervonté Fowler, building modern software, AI‑enhanced tools, and the Ignition Labs product suite.',
  keywords: [
    'BuiltByGervonte',
    'Gervonté Fowler',
    'Gervonte Fowler',
    'Ignition Labs',
    'Personal Finance App',
    'Fintech Tools',
    'DBTH Records',
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
  image: 'https://builtbygervonte.com/og-image.png',
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
    name: 'BuiltByGervonte LLC',
    jobTitle: 'Digital Studio & Software Development Company',
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
    worksFor: {
      '@type': 'Person',
      name: 'Gervonté Fowler',
    },
    knowsAbout: [
      'Software Engineering',
      'AI-Enhanced Development',
      'Product Design',
      'SaaS Platforms',
      'Fintech Tools',
      'Startup Development',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Florida Polytechnic University',
    },
  };
}
