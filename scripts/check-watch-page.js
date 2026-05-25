import { readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

const root = process.cwd();

const files = {
  layout: 'src/app/layout.tsx',
  page: 'src/app/page.tsx',
  footer: 'src/components/Footer.tsx',
  watchSection: 'src/components/WatchSection.tsx',
  watchVideos: 'src/data/watch-videos.ts',
};

const readSource = filePath => readFileSync(resolve(root, filePath), 'utf8');

const sources = Object.fromEntries(
  Object.entries(files).map(([key, filePath]) => [key, readSource(filePath)])
);

const failures = [];

const check = (condition, message) => {
  if (!condition) {
    failures.push(message);
  }
};

const includes = (source, text) => source.includes(text);
const pathLabel = filePath => relative(root, resolve(root, filePath));

check(
  includes(sources.page, 'id="watch"'),
  `${pathLabel(files.page)} must define the #watch section.`
);
check(
  includes(sources.page, '<LazyWatchSection />'),
  `${pathLabel(files.page)} must render LazyWatchSection in the homepage.`
);
check(
  includes(sources.layout, "link: '#watch'"),
  `${pathLabel(files.layout)} must expose the #watch target in primary navigation.`
);
check(
  includes(sources.footer, "href: '#watch'"),
  `${pathLabel(files.footer)} must expose the #watch target in footer navigation.`
);
check(
  includes(sources.watchVideos, 'youtubeUrl:') && includes(sources.watchVideos, 'featured: true'),
  `${pathLabel(files.watchVideos)} featured video must include a YouTube URL.`
);
check(
  includes(sources.watchVideos, 'youtubeId:') && includes(sources.watchVideos, 'featured: true'),
  `${pathLabel(files.watchVideos)} featured video must include a YouTube ID.`
);
check(
  includes(sources.watchVideos, 'featured: true'),
  `${pathLabel(files.watchVideos)} must mark a featured Watch video.`
);
check(
  includes(sources.watchVideos, 'export const getFeaturedWatchVideo'),
  `${pathLabel(files.watchVideos)} must expose the featured video helper.`
);
check(
  includes(sources.watchVideos, 'export const getWatchCollectionsWithVideos'),
  `${pathLabel(files.watchVideos)} must expose the collection grouping helper.`
);
check(
  includes(
    sources.watchSection,
    'const collectionGroups = useMemo(() => getWatchCollectionsWithVideos(), [])'
  ),
  `${pathLabel(files.watchSection)} must render collections from structured Watch data.`
);
check(
  includes(sources.watchSection, 'collectionGroups.map'),
  `${pathLabel(files.watchSection)} must map over Watch collection groups.`
);
check(
  includes(sources.watchSection, 'href={featuredVideo.youtubeUrl}'),
  `${pathLabel(files.watchSection)} featured CTA must use the featured video URL.`
);
check(
  includes(sources.watchSection, 'href={video.youtubeUrl}'),
  `${pathLabel(files.watchSection)} playable video cards must link to their YouTube URL.`
);
check(
  includes(sources.watchSection, 'if (!isPlayable)') &&
    includes(sources.watchSection, '<Box role="group"'),
  `${pathLabel(files.watchSection)} non-playable videos must render as non-link cards.`
);
check(
  includes(sources.watchSection, "video.status === 'coming-soon'"),
  `${pathLabel(files.watchSection)} must communicate coming-soon video state.`
);

if (failures.length > 0) {
  console.error('Watch page checks failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Watch page checks passed.');
