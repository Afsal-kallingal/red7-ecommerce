import { MediaAsset, MediaFallbackType, ResolvableImage } from '@/types/media';

// High-fidelity fallback SVG placeholders rendered with the FYND brand aesthetic
const createFallbackSvg = (title: string, subtitle: string, bgColor: string = '#1b3b2b', textColor: string = '#ffffff') => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgColor}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#032517" stop-opacity="1"/>
        </linearGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="800" height="1000" fill="url(#g)"/>
      <rect width="800" height="1000" fill="url(#grid)"/>
      <circle cx="400" cy="450" r="140" fill="none" stroke="rgba(255,223,155,0.2)" stroke-width="2"/>
      <path d="M360 410 L440 410 L400 480 Z" fill="#ffdf9b" opacity="0.8"/>
      <text x="400" y="550" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${textColor}" text-anchor="middle" letter-spacing="4">${title.toUpperCase()}</text>
      <text x="400" y="590" font-family="Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.7)" text-anchor="middle" letter-spacing="2">${subtitle.toUpperCase()}</text>
      <text x="400" y="920" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#ffdf9b" text-anchor="middle" letter-spacing="5">FYND // AUTHENTIC DROP</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
};

export const DEFAULT_FALLBACK_IMAGES: Record<MediaFallbackType, string> = {
  kit: createFallbackSvg('Matchday Kit', 'Official Terrace Edition', '#1b3b2b', '#ffffff'),
  streetwear: createFallbackSvg('Streetwear', 'Drop Oversized Cut', '#252525', '#ffffff'),
  department: createFallbackSvg('Department', 'FYND Catalog Collection', '#2b1e00', '#ffdf9b'),
  hero: createFallbackSvg('Drop 26 Live', 'Terrace Culture Curated', '#032517', '#ffffff'),
  avatar: 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#1b3b2b"/>
      <circle cx="50" cy="40" r="18" fill="#c7ebd4"/>
      <path d="M 22 84 C 25 64, 40 60, 50 60 C 60 60, 75 64, 78 84 Z" fill="#c7ebd4"/>
    </svg>
  `),
  banner: createFallbackSvg('Limited Flash Sale', 'Pan-India Express 48h', '#032517', '#ffdf9b'),
  accessory: createFallbackSvg('Gear & Accessories', 'Terrace Stadium Essentials', '#313030', '#ffffff')
};

/**
 * Resolves an image URL following the 3-tier cascade:
 * 1. Explicit URL string / MediaAsset url (if provided and non-empty)
 * 2. Remote backend / CDN image when available
 * 3. Default SVG brand placeholder when unavailable
 */
export function resolveImageUrl(
  image?: ResolvableImage,
  fallbackType: MediaFallbackType = 'kit'
): string {
  if (!image) {
    return DEFAULT_FALLBACK_IMAGES[fallbackType];
  }

  if (typeof image === 'string') {
    const trimmed = image.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
    return DEFAULT_FALLBACK_IMAGES[fallbackType];
  }

  if (typeof image === 'object' && image.url) {
    const trimmed = image.url.trim();
    if (trimmed.length > 0) {
      return trimmed;
    }
  }

  return DEFAULT_FALLBACK_IMAGES[fallbackType];
}

/**
 * Helper to build media asset objects cleanly
 */
export function buildMediaAsset(id: string, url: string, alt: string, isPrimary = false): MediaAsset {
  return {
    id,
    url: resolveImageUrl(url),
    alt,
    isPrimary
  };
}
