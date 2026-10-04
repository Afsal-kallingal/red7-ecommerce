import { describe, it } from 'node:test';
import assert from 'node:assert';
import { resolveImageUrl, DEFAULT_FALLBACK_IMAGES } from '../lib/images';

describe('Image Fallback & Resolution Engine', () => {
  it('should return fallback SVG when image is undefined or null', () => {
    const url = resolveImageUrl(undefined, 'kit');
    assert.strictEqual(url, DEFAULT_FALLBACK_IMAGES.kit);

    const nullUrl = resolveImageUrl(null, 'hero');
    assert.strictEqual(nullUrl, DEFAULT_FALLBACK_IMAGES.hero);
  });

  it('should return fallback SVG when image is an empty string', () => {
    const url = resolveImageUrl('   ', 'streetwear');
    assert.strictEqual(url, DEFAULT_FALLBACK_IMAGES.streetwear);
  });

  it('should return remote CDN URL when provided directly', () => {
    const validUrl = 'https://cdn.fynd.in/products/test-jersey.webp';
    const result = resolveImageUrl(validUrl, 'kit');
    assert.strictEqual(result, validUrl);
  });

  it('should resolve MediaAsset object URL correctly', () => {
    const asset = {
      id: 'med-1',
      url: 'https://cdn.fynd.in/banner.webp',
      alt: 'Banner'
    };
    const result = resolveImageUrl(asset, 'banner');
    assert.strictEqual(result, 'https://cdn.fynd.in/banner.webp');
  });
});
