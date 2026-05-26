import { readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

const files = {
  layout: 'src/app/layout.tsx',
  page: 'src/app/page.tsx',
  footer: 'src/components/Footer.tsx',
  resumeYouTubeEmbed: 'src/components/ResumeYouTubeEmbed.tsx',
  watchSection: 'src/components/WatchSection.tsx',
  watchVideos: 'src/data/watch-videos.ts',
};

const failures = [];

const pathLabel = filePath => relative(root, resolve(root, filePath));

const check = (condition, message) => {
  if (!condition) {
    failures.push(message);
  }
};

const readSource = filePath => {
  try {
    return readFileSync(resolve(root, filePath), 'utf8');
  } catch (error) {
    failures.push(`${pathLabel(filePath)} could not be read: ${error.message}`);
    return '';
  }
};

const sources = Object.fromEntries(
  Object.entries(files).map(([key, filePath]) => [key, readSource(filePath)])
);

const includes = (source, text) => source.includes(text);

const getWatchVideoBlocks = source => {
  const declarationIndex = source.indexOf('export const watchVideos');
  if (declarationIndex === -1) {
    return [];
  }

  const assignmentIndex = source.indexOf('=', declarationIndex);
  if (assignmentIndex === -1) {
    return [];
  }

  const arrayStart = source.indexOf('[', assignmentIndex);
  if (arrayStart === -1) {
    return [];
  }

  const blocks = [];
  let arrayDepth = 0;
  let objectDepth = 0;
  let blockStart = -1;
  let quote = '';
  let escaped = false;

  for (let index = arrayStart; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = '';
      }
      continue;
    }

    if (char === "'" || char === '"' || char === '`') {
      quote = char;
      continue;
    }

    if (char === '[') {
      arrayDepth += 1;
      continue;
    }

    if (char === ']') {
      arrayDepth -= 1;
      if (arrayDepth === 0) {
        break;
      }
      continue;
    }

    if (arrayDepth !== 1) {
      continue;
    }

    if (char === '{') {
      if (objectDepth === 0) {
        blockStart = index;
      }
      objectDepth += 1;
      continue;
    }

    if (char === '}') {
      objectDepth -= 1;
      if (objectDepth === 0 && blockStart !== -1) {
        blocks.push(source.slice(blockStart, index + 1));
        blockStart = -1;
      }
    }
  }

  return blocks;
};

const featuredVideoBlock = getWatchVideoBlocks(sources.watchVideos).find(block =>
  includes(block, 'featured: true')
);

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
  Boolean(featuredVideoBlock) && includes(featuredVideoBlock, 'youtubeUrl:'),
  `${pathLabel(files.watchVideos)} featured video must include a YouTube URL.`
);
check(
  Boolean(featuredVideoBlock) && includes(featuredVideoBlock, 'youtubeId:'),
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
check(
  includes(sources.resumeYouTubeEmbed, 'enablejsapi: 1') &&
    includes(sources.resumeYouTubeEmbed, "enablejsapi: '1'"),
  `${pathLabel(files.resumeYouTubeEmbed)} must enable the YouTube IFrame API for embedded players.`
);
check(
  includes(sources.resumeYouTubeEmbed, 'autoplay: 0') &&
    includes(sources.resumeYouTubeEmbed, "autoplay: '0'"),
  `${pathLabel(files.resumeYouTubeEmbed)} must not autoplay the native YouTube player.`
);
check(
  includes(sources.resumeYouTubeEmbed, "const YOUTUBE_EMBED_HOST = 'https://www.youtube.com'") &&
    includes(sources.resumeYouTubeEmbed, 'host: YOUTUBE_EMBED_HOST'),
  `${pathLabel(files.resumeYouTubeEmbed)} must use the standard YouTube embed host for native player controls.`
);
check(
  includes(sources.resumeYouTubeEmbed, 'const getCurrentOrigin') &&
    includes(sources.resumeYouTubeEmbed, 'window.location.origin') &&
    includes(sources.resumeYouTubeEmbed, 'origin: getCurrentOrigin()') &&
    includes(sources.resumeYouTubeEmbed, "params.set('origin', origin)"),
  `${pathLabel(files.resumeYouTubeEmbed)} must pass the current page origin to YouTube embeds.`
);

if (failures.length > 0) {
  console.error('Watch page checks failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Watch page checks passed.');
