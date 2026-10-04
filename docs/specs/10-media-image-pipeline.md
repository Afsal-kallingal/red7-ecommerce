# Feature Spec: Centralized Media & Image Pipeline

## Purpose
Ensures that NO component hardcodes image URLs, provides a centralized fallback mechanism, and guarantees immediate deployability with zero rewrites when real backend media is provisioned.

## Core Hierarchy
```
product.image
    ↓
backend image when available (S3 / R2 CDN)
    ↓
default placeholder when unavailable
```

## Central Architecture Files
1. `/src/types/media.ts`:
   - `MediaImage`: `{ id: string; url: string; alt: string; isPrimary?: boolean; width?: number; height?: number }`
   - `FallbackType`: `'kit' | 'streetwear' | 'department' | 'hero' | 'avatar' | 'banner'`
2. `/src/lib/images.ts`:
   - `resolveImageUrl(image?: string | MediaImage | null, fallbackType?: FallbackType): string`
   - Returns valid URL or high-resolution inline SVG / base placeholder data URL.
   - Handles image load errors gracefully with `onError` event listener.
   - All presentation components import `resolveImageUrl` or use `<FyndImage />`.

## Acceptance Criteria
- Zero broken images in production build.
- Easily testable and inspectable.
- Future API integration only requires updating `NEXT_PUBLIC_CDN_URL` and API payload response.
