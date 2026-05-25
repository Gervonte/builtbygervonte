/**
 * Parallax Configuration
 *
 * This file contains all parallax speed settings for easy adjustment.
 * Speeds are relative to scroll speed:
 * - 0 = no movement (fixed)
 * - 1 = moves at scroll speed
 * - 0.5 = moves at half scroll speed
 * - -0.5 = moves at half scroll speed in opposite direction
 */

export const parallaxConfig = {
  // Main section parallax speeds
  sections: {
    watch: 0.8,
    work: 0.8,
    experience: 0.7,
    about: 0.8,
    contact: 0.4, // Gentle forward movement
  },

  // Hero section element speeds
  hero: {
    title: -0.4,
    subtitle: -0.6,
    buttons: -0.5,
  },

  // Parallax speed presets for easy reference
  presets: {
    subtle: 0.2,
    gentle: 0.5,
    moderate: 0.8,
    strong: 1.2,
    extreme: 1.8,
  },

  // Speed limits for safety
  limits: {
    min: -2.0,
    max: 2.0,
  },
} as const;

// Type for parallax speeds
export type ParallaxSpeed = number;

// Helper function to validate parallax speed
export function validateParallaxSpeed(speed: number): number {
  const { min, max } = parallaxConfig.limits;
  return Math.max(min, Math.min(max, speed));
}

// Helper function to get section speed
export function getSectionSpeed(section: keyof typeof parallaxConfig.sections): number {
  return validateParallaxSpeed(parallaxConfig.sections[section]);
}

// Helper function to get hero element speed
export function getHeroSpeed(element: keyof typeof parallaxConfig.hero): number {
  return validateParallaxSpeed(parallaxConfig.hero[element]);
}
