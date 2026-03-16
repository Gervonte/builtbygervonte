/**
 * Utility functions for generating project screenshots
 */

export interface ScreenshotOptions {
  width?: number;
  height?: number;
  quality?: number;
}

/**
 * Generate a screenshot URL for a project
 */
export function getProjectScreenshot(
  projectUrl: string,
  options: ScreenshotOptions & { fullPage?: boolean } = {}
): string {
  const { width = 1200, height = 630, fullPage = true } = options;

  // Use our API route for screenshots
  const baseUrl =
    process.env.NODE_ENV === 'production' ? 'https://builtbygervonte.com' : 'http://localhost:3001';

  const params = new URLSearchParams({
    url: projectUrl,
    width: width.toString(),
    height: height.toString(),
    fullPage: fullPage.toString(),
  });

  return `${baseUrl}/api/screenshot?${params.toString()}`;
}

/**
 * Generate a fallback image URL for projects without live URLs
 */
export function getProjectFallbackImage(
  projectTitle: string,
  projectType: 'vibe-coded' | 'standard-work',
  options: ScreenshotOptions = {}
): string {
  const { width = 1200, height = 630 } = options;

  const bgColor = projectType === 'vibe-coded' ? 'E91E63' : '228BE6';
  const textColor = 'FFFFFF';
  const text = encodeURIComponent(projectTitle);

  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${text}`;
}

/**
 * Generate a project thumbnail URL
 */
export function getProjectThumbnail(
  project: {
    title: string;
    type: 'vibe-coded' | 'standard-work';
    liveUrl?: string;
    imagePath?: string; // New: local image path
  },
  options: ScreenshotOptions & { fullPage?: boolean } = {}
): string {
  // First priority: local image file
  if (project.imagePath) {
    return `/images/projects/${project.imagePath}`;
  }

  // Second priority: live URL screenshot
  if (project.liveUrl) {
    return getProjectScreenshot(project.liveUrl, options);
  }

  // Fallback: generated placeholder
  return getProjectFallbackImage(project.title, project.type, options);
}

/**
 * Check if a screenshot is cached
 */
export async function isScreenshotCached(
  url: string,
  width: number,
  height: number
): Promise<boolean> {
  try {
    const response = await fetch(
      `/api/screenshot?url=${encodeURIComponent(url)}&width=${width}&height=${height}`,
      { method: 'HEAD' }
    );
    return response.headers.get('X-Cache') === 'HIT';
  } catch {
    return false;
  }
}

/**
 * Preload screenshots for better performance
 */
export async function preloadScreenshots(projects: Array<{ liveUrl?: string }>): Promise<void> {
  const preloadPromises = projects
    .filter(project => project.liveUrl)
    .map(project =>
      getProjectScreenshots({
        title: '',
        type: 'vibe-coded',
        liveUrl: project.liveUrl,
      })
    );

  try {
    await Promise.allSettled(preloadPromises);
  } catch (error) {
    console.warn('Failed to preload some screenshots:', error);
  }
}

/**
 * Generate multiple screenshot sizes for responsive images
 */
export function getProjectScreenshots(project: {
  title: string;
  type: 'vibe-coded' | 'standard-work';
  liveUrl?: string;
  imagePath?: string;
}) {
  return {
    // Thumbnail: Full page, cropped to 4:3 aspect ratio
    thumbnail: getProjectThumbnail(project, {
      width: 160,
      height: 120,
      fullPage: true,
    }),
    // Card: Full page, cropped to 3:2 aspect ratio
    card: getProjectThumbnail(project, {
      width: 300,
      height: 200,
      fullPage: true,
    }),
    // Hero: Full page, cropped to 16:9 aspect ratio
    hero: getProjectThumbnail(project, {
      width: 1200,
      height: 675,
      fullPage: true,
    }),
    // Full: Full page, cropped to 16:9 aspect ratio
    full: getProjectThumbnail(project, {
      width: 1920,
      height: 1080,
      fullPage: true,
    }),
  };
}
