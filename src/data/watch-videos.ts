export type WatchVideoCategory =
  | 'founder-story'
  | 'software-demo'
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
    title: 'How I Turned Scholarships & A Student Visa Into $250K by 24',
    subtitle: 'A Lighthouse for a Nontraditional Path',
    description:
      'A long-form reflection on becoming a software engineer from The Bahamas, covering scholarships, student visa life, access to work, fintech, career disruption, immigration, forming an LLC, and building Rainy Day. The story behind BuiltByGervonte.',
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
    subtitle: 'Personal Finance for The Bahamas',
    description:
      'A proof of concept demo for Rainy Day, showing how consumer-permissioned bank statement data can power personal finance management in markets without open banking standards or APIs.',
    category: 'software-demo',
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
    subtitle: 'From Internet Outage to Coding Anthem',
    description:
      'The original LEETCODE BEASTMODE video posted by JamesPeraltaSWE, featuring a track I first recorded, mixed, and mastered at home in November 2023, originally released as “1337” after my internet went out while I was practicing LeetCode.',
    category: 'creative-breakdown',
    collection: 'Creative / Culture',
    youtubeUrl: 'https://www.youtube.com/watch?v=oOWc9QAoTKg',
    youtubeId: 'oOWc9QAoTKg',
    duration: '1:07',
    status: 'published',
  },
  {
    id: 'leetcode-beastmode-bts',
    slug: 'leetcode-beastmode-bts',
    title: 'LEETCODE BEASTMODE - BEHIND THE SONG',
    subtitle: 'The DAW, the Mix, and the LeetCode Era',
    description:
      'Behind the scenes of “LEETCODE BEASTMODE.” I break down the DAW setup, vocal chain, mixing choices, and the early 2023 to summer 2024 era in The Bahamas, when I was sharpening my skillset across system design and LeetCode style questions while searching locally for software roles before ultimately returning to the U.S. for my master’s degree and access to a larger job market.',
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
