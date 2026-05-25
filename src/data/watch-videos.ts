export type WatchVideoCategory =
  | 'founder-story'
  | 'product-demo'
  | 'build-log'
  | 'creative-breakdown'
  | 'life-discipline';

export type WatchVideoCollection = 'Founder Stories' | 'Software Demos' | 'Creative / Culture';

export type WatchVideoStatus = 'published' | 'unlisted' | 'coming-soon';

export interface WatchVideoLink {
  label: string;
  href: string;
}

export interface WatchVideo {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category: WatchVideoCategory;
  collection: WatchVideoCollection;
  youtubeUrl?: string;
  youtubeId?: string;
  thumbnailUrl?: string;
  duration?: string;
  publishedAt?: string;
  status: WatchVideoStatus;
  featured?: boolean;
  relatedLinks?: WatchVideoLink[];
}

export const watchCollections: WatchVideoCollection[] = [
  'Founder Stories',
  'Software Demos',
  'Creative / Culture',
];

export const watchVideos: WatchVideo[] = [
  {
    id: 'ten-years-of-april',
    slug: 'ten-years-of-april',
    title: 'How I Turned Scholarships & a Student Visa Into $250K by 24',
    subtitle: '10+ Years of April',
    description:
      'A long-form reflection on becoming a software engineer from The Bahamas, from scholarships and student visa life to fintech, layoffs, immigration, global work, forming an LLC, and building Rainy Day. The story behind BuiltByGervonte.',
    category: 'founder-story',
    collection: 'Founder Stories',
    youtubeUrl: 'https://youtu.be/AbYNHzYtm_s',
    youtubeId: 'AbYNHzYtm_s',
    duration: '1:13:01',
    status: 'published',
    featured: true,
  },
  {
    id: 'rainy-day-v0-1-0',
    slug: 'rainy-day-v0-1-0',
    title: 'Rainy Day v0.1.0',
    description:
      'A product demo covering the first Rainy Day release and the financial clarity workflow behind it.',
    category: 'product-demo',
    collection: 'Software Demos',
    youtubeUrl: 'https://www.youtube.com/watch?v=DleHQK9KH-8',
    youtubeId: 'DleHQK9KH-8',
    duration: '10:16',
    status: 'published',
  },
  {
    id: 'leetcode-beastmode',
    slug: 'leetcode-beastmode',
    title: 'LEETCODE BEASTMODE',
    description:
      'The original LeetCode BeastMode video featuring BEYWHAT’s track, connecting coding culture, music, and the creative side of Built By Gervonte.',
    category: 'creative-breakdown',
    collection: 'Creative / Culture',
    youtubeUrl: 'https://www.youtube.com/watch?v=oOWc9QAoTKg',
    youtubeId: 'oOWc9QAoTKg',
    duration: '1:07',
    status: 'published',
  },
  {
    id: 'leetcode-beastmode-breakdown',
    slug: 'leetcode-beastmode-breakdown',
    title: 'LeetCode BeastMode Breakdown',
    description:
      'Behind the scenes of “LEETCODE BEASTMODE,” a track first engineered in November 2023 originally called “1337.” I break down the DAW setup, vocal chain, mixing choices, and the 2023-2024 Bahamas era of sharpening my software engineering weaknesses including system design and LeetCode styled questions.',
    category: 'creative-breakdown',
    collection: 'Creative / Culture',
    youtubeUrl: 'https://www.youtube.com/watch?v=GlbWLTu42Ws',
    youtubeId: 'GlbWLTu42Ws',
    duration: '9:41',
    status: 'published',
  },
];

export interface WatchCollectionGroup {
  collection: WatchVideoCollection;
  videos: WatchVideo[];
}

export const getFeaturedWatchVideo = (): WatchVideo | undefined => {
  return watchVideos.find(video => video.featured);
};

export const getWatchVideoBySlug = (slug: string): WatchVideo | undefined => {
  return watchVideos.find(video => video.slug === slug);
};

export const getWatchVideosByCollection = (collection: WatchVideoCollection): WatchVideo[] => {
  return watchVideos.filter(video => video.collection === collection);
};

export const getWatchCollectionsWithVideos = (): WatchCollectionGroup[] => {
  return watchCollections.map(collection => ({
    collection,
    videos: getWatchVideosByCollection(collection),
  }));
};
