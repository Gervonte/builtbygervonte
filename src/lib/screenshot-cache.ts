import crypto from 'crypto';
import { promises as fs } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

interface CacheEntry {
  url: string;
  filename: string;
  createdAt: number;
  expiresAt: number;
  width: number;
  height: number;
}

interface CacheConfig {
  maxAge: number; // in milliseconds
  maxSize: number; // in bytes
  cacheDir: string;
}

const CACHE_CONFIG: CacheConfig = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  maxSize: 100 * 1024 * 1024, // 100MB
  cacheDir: path.join(tmpdir(), 'portfolio-ai', 'screenshots'),
};

/**
 * Generate a cache key for a screenshot request
 */
function generateCacheKey(url: string, width: number, height: number): string {
  const hash = crypto.createHash('md5').update(`${url}-${width}-${height}`).digest('hex');
  return `${hash}.png`;
}

/**
 * Get cache file path
 */
function getCacheFilePath(filename: string): string {
  return path.join(CACHE_CONFIG.cacheDir, filename);
}

/**
 * Get cache metadata file path
 */
function getCacheMetadataPath(): string {
  return path.join(CACHE_CONFIG.cacheDir, 'metadata.json');
}

/**
 * Ensure cache directory exists
 */
async function ensureCacheDir(): Promise<void> {
  try {
    await fs.mkdir(CACHE_CONFIG.cacheDir, { recursive: true });
  } catch {
    console.error('Failed to create cache directory');
  }
}

/**
 * Load cache metadata
 */
async function loadCacheMetadata(): Promise<Record<string, CacheEntry>> {
  try {
    const metadataPath = getCacheMetadataPath();
    const data = await fs.readFile(metadataPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {};
  }
}

/**
 * Save cache metadata
 */
async function saveCacheMetadata(metadata: Record<string, CacheEntry>): Promise<void> {
  try {
    const metadataPath = getCacheMetadataPath();
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2));
  } catch {
    console.error('Failed to save cache metadata');
  }
}

/**
 * Check if cache entry is valid
 */
function isCacheEntryValid(entry: CacheEntry): boolean {
  return Date.now() < entry.expiresAt;
}

/**
 * Clean up expired cache entries
 */
async function cleanupExpiredCache(): Promise<void> {
  try {
    const metadata = await loadCacheMetadata();
    const validEntries: Record<string, CacheEntry> = {};

    for (const [key, entry] of Object.entries(metadata)) {
      if (isCacheEntryValid(entry)) {
        validEntries[key] = entry;
      } else {
        // Remove expired file
        try {
          await fs.unlink(getCacheFilePath(entry.filename));
        } catch {
          // File might not exist, ignore error
        }
      }
    }

    await saveCacheMetadata(validEntries);
  } catch {
    console.error('Failed to cleanup expired cache');
  }
}

/**
 * Get cache size
 */
async function getCacheSize(): Promise<number> {
  try {
    const metadata = await loadCacheMetadata();
    let totalSize = 0;

    for (const entry of Object.values(metadata)) {
      try {
        const stats = await fs.stat(getCacheFilePath(entry.filename));
        totalSize += stats.size;
      } catch {
        // File might not exist, ignore
      }
    }

    return totalSize;
  } catch {
    return 0;
  }
}

/**
 * Clean up cache if it exceeds max size
 */
async function cleanupCacheIfNeeded(): Promise<void> {
  const currentSize = await getCacheSize();

  if (currentSize > CACHE_CONFIG.maxSize) {
    try {
      const metadata = await loadCacheMetadata();
      const entries = Object.entries(metadata)
        .map(([key, entry]) => ({ key, ...entry }))
        .sort((a, b) => a.createdAt - b.createdAt); // Oldest first

      let sizeToRemove = currentSize - CACHE_CONFIG.maxSize;
      const entriesToRemove: string[] = [];

      for (const entry of entries) {
        if (sizeToRemove <= 0) break;

        try {
          const stats = await fs.stat(getCacheFilePath(entry.filename));
          sizeToRemove -= stats.size;
          entriesToRemove.push(entry.key);
        } catch {
          // File might not exist, ignore
        }
      }

      // Remove selected entries
      for (const key of entriesToRemove) {
        const entry = metadata[key];
        if (entry) {
          try {
            await fs.unlink(getCacheFilePath(entry.filename));
            delete metadata[key];
          } catch {
            // File might not exist, ignore
          }
        }
      }

      await saveCacheMetadata(metadata);
    } catch {
      console.error('Failed to cleanup cache');
    }
  }
}

/**
 * Get cached screenshot if available
 */
export async function getCachedScreenshot(
  url: string,
  width: number,
  height: number
): Promise<Buffer | null> {
  try {
    await ensureCacheDir();
    await cleanupExpiredCache();

    const cacheKey = generateCacheKey(url, width, height);
    const metadata = await loadCacheMetadata();
    const entry = metadata[cacheKey];

    if (entry && isCacheEntryValid(entry)) {
      const filePath = getCacheFilePath(entry.filename);
      const data = await fs.readFile(filePath);
      return data;
    }

    return null;
  } catch {
    console.error('Failed to get cached screenshot');
    return null;
  }
}

/**
 * Cache a screenshot
 */
export async function cacheScreenshot(
  url: string,
  width: number,
  height: number,
  imageData: Buffer
): Promise<void> {
  try {
    await ensureCacheDir();
    await cleanupCacheIfNeeded();

    const cacheKey = generateCacheKey(url, width, height);
    const filename = `${cacheKey}`;
    const filePath = getCacheFilePath(filename);

    // Save image file
    await fs.writeFile(filePath, imageData);

    // Update metadata
    const metadata = await loadCacheMetadata();
    metadata[cacheKey] = {
      url,
      filename,
      createdAt: Date.now(),
      expiresAt: Date.now() + CACHE_CONFIG.maxAge,
      width,
      height,
    };

    await saveCacheMetadata(metadata);
  } catch {
    console.error('Failed to cache screenshot');
  }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
  totalEntries: number;
  totalSize: number;
  maxSize: number;
  hitRate?: number;
}> {
  try {
    const metadata = await loadCacheMetadata();
    const totalSize = await getCacheSize();

    return {
      totalEntries: Object.keys(metadata).length,
      totalSize,
      maxSize: CACHE_CONFIG.maxSize,
    };
  } catch {
    return {
      totalEntries: 0,
      totalSize: 0,
      maxSize: CACHE_CONFIG.maxSize,
    };
  }
}

/**
 * Clear all cache
 */
export async function clearCache(): Promise<void> {
  try {
    const metadata = await loadCacheMetadata();

    // Remove all files
    for (const entry of Object.values(metadata)) {
      try {
        await fs.unlink(getCacheFilePath(entry.filename));
      } catch {
        // File might not exist, ignore
      }
    }

    // Clear metadata
    await saveCacheMetadata({});
  } catch {
    console.error('Failed to clear cache');
  }
}
