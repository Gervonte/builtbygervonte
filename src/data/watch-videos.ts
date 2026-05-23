export type WatchVideoCategory =
  | 'founder-story'
  | 'product-demo'
  | 'build-log'
  | 'creative-breakdown'
  | 'life-discipline';

export type WatchVideoCollection =
  | 'Founder Stories'
  | 'Rainy Day Demos'
  | 'Build Logs'
  | 'Creative / Culture';

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
  'Rainy Day Demos',
  'Build Logs',
  'Creative / Culture',
];

export const watchVideos: WatchVideo[] = [
  {
    id: 'ten-years-of-april',
    slug: 'ten-years-of-april',
    title: 'How I Turned Scholarships & a Student Visa Into $250K by 24',
    subtitle: '10+ Years of April',
    description:
      'A long-form reflection on becoming a software engineer as a Bahamian developer, from scholarships and student visa life to fintech, layoffs, Rainy Day, and BuiltByGervonte.',
    category: 'founder-story',
    collection: 'Founder Stories',
    youtubeUrl: 'https://youtu.be/71Hcg4LCVqE',
    youtubeId: '71Hcg4LCVqE',
    duration: '1:13:04',
    status: 'published',
    featured: true,
  },
  {
    id: 'book-club',
    slug: 'book-club',
    title: 'Book Club',
    description: 'A reflective life-discipline conversation for the BuiltByGervonte Watch library.',
    category: 'life-discipline',
    collection: 'Founder Stories',
    duration: '36:47',
    status: 'coming-soon',
  },
  {
    id: 'training-for-a-5k',
    slug: 'training-for-a-5k',
    title: 'Training for a 5K',
    description:
      'A life-discipline entry about training, consistency, and showing up for the long run.',
    category: 'life-discipline',
    collection: 'Founder Stories',
    duration: '11:32',
    status: 'coming-soon',
  },
  {
    id: 'rainy-day-v0-1-0',
    slug: 'rainy-day-v0-1-0',
    title: 'Rainy Day v0.1.0',
    description:
      'A product demo covering the first Rainy Day release and the financial clarity workflow behind it.',
    category: 'product-demo',
    collection: 'Rainy Day Demos',
    duration: '10:17',
    status: 'coming-soon',
  },
  {
    id: 'rainy-day-v0-2-0',
    slug: 'rainy-day-v0-2-0',
    title: 'Rainy Day v0.2.0',
    description:
      'A product demo for the next Rainy Day iteration and its expanded personal finance workflow.',
    category: 'product-demo',
    collection: 'Rainy Day Demos',
    duration: '12:18',
    status: 'coming-soon',
  },
  {
    id: 'rainy-day-v0-3-0',
    slug: 'rainy-day-v0-3-0',
    title: 'Rainy Day v0.3.0',
    description:
      'A product demo for a later Rainy Day release focused on continued product polish and clarity.',
    category: 'product-demo',
    collection: 'Rainy Day Demos',
    duration: '11:45',
    status: 'coming-soon',
  },
  {
    id: 'the-locs-culture-shift',
    slug: 'the-locs-culture-shift',
    title: 'The Locs Culture Shift',
    description:
      'A creative breakdown exploring culture, identity, and the broader meaning behind the locs shift.',
    category: 'creative-breakdown',
    collection: 'Creative / Culture',
    duration: '15:32',
    status: 'coming-soon',
  },
  {
    id: 'beywhat-breakdowns',
    slug: 'beywhat-breakdowns',
    title: 'BEYWHAT Breakdowns',
    description:
      'Creative and cultural breakdowns shaped by Bahamian perspective, commentary, and storytelling.',
    category: 'creative-breakdown',
    collection: 'Creative / Culture',
    status: 'coming-soon',
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
