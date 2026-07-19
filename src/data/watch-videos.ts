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
  technicalDetailsProjectId?: string;
  // Preserve videos for future pages while excluding them from the homepage Content grid.
  showInMainContent?: boolean;
  relatedLinks?: WatchVideoLink[];
}

export const watchCollections: WatchVideoCollection[] = [
  'Software Demos',
  'Founder Stories',
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
    showInMainContent: false,
  },
  {
    id: 'rainy-day-v0-1-0',
    slug: 'rainy-day-v0-1-0',
    title: 'Rainy Day v0.1.0',
    subtitle: 'Personal Finance Management for The Bahamas and Caribbean',
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
    id: 'rainy-day-v0-2-0',
    slug: 'rainy-day-v0-2-0',
    title: 'Rainy Day v0.2.0',
    subtitle: 'Deterministic Intelligence, Observability & Public Demo',
    description:
      'See how Rainy Day turns consumer-permissioned data into a clearer financial picture across 4 local institutions, moving beyond manual statement review with 10 automatic default categories, subscription tracking, and cash-flow forecasts.',
    category: 'software-demo',
    collection: 'Software Demos',
    youtubeUrl: 'https://www.youtube.com/watch?v=98GISOrBvts',
    youtubeId: '98GISOrBvts',
    duration: '27:30',
    status: 'published',
  },
  {
    id: 'rainy-day-v0-2-1',
    slug: 'rainy-day-v0-2-1',
    title: 'Rainy Day v0.2.1',
    subtitle: "Don't Make Me Think: Guided Demo & Field Testing Updates",
    description:
      'See how I applied Steve Krug’s Don’t Make Me Think principles after PostHog revealed a 77% onboarding drop-off, redesigning onboarding around a guided walkthrough that increased first-time product entry from 23% to 97% and full-product reach from 0% to 27% across 100+ demo users.',
    category: 'build-log',
    collection: 'Software Demos',
    youtubeUrl: 'https://www.youtube.com/watch?v=G8AT6G2Vm_Q',
    youtubeId: 'G8AT6G2Vm_Q',
    status: 'published',
    featured: true,
    technicalDetailsProjectId: 'rainy-day',
  },
  {
    id: 'leetcode-beastmode',
    slug: 'leetcode-beastmode',
    title: 'LEETCODE BEASTMODE',
    subtitle: 'From Internet Outage to Coding Anthem',
    description:
      'Recorded, mixed, and mastered at home in The Bahamas after my internet went out while writing code. The song later reached thousands of programmers through software engineering creator James Peralta’s channel, becoming part of listeners’ routines before contests, after solving problems, and during late-night practice sessions.',
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
      'Originally recorded in November 2023, this is a behind-the-scenes look at the engineering of “LEETCODE BEASTMODE.” I break down the vocal chain, stereo imaging, arrangement, and mix decisions while revisiting the Bahamas coding era that inspired the record.',
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
  return watchVideos.filter(
    video => video.collection === collection && video.showInMainContent !== false
  );
};

export const getWatchCollectionsWithVideos = (): WatchCollectionGroup[] => {
  return watchCollections
    .map(collection => ({
      collection,
      videos: getWatchVideosByCollection(collection),
    }))
    .filter(group => group.videos.length > 0);
};
