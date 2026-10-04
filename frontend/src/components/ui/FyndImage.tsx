'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { MediaFallbackType, ResolvableImage } from '@/types/media';
import { DEFAULT_FALLBACK_IMAGES, resolveImageUrl } from '@/lib/images';

export interface FyndImageProps extends Omit<ImageProps, 'src' | 'alt'> {
  src?: ResolvableImage;
  alt: string;
  fallbackType?: MediaFallbackType;
}

export function FyndImage({
  src,
  alt,
  fallbackType = 'kit',
  className = '',
  ...props
}: FyndImageProps) {
  const initialUrl = resolveImageUrl(src, fallbackType);
  const [imgSrc, setImgSrc] = useState<string>(initialUrl);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(DEFAULT_FALLBACK_IMAGES[fallbackType]);
    }
  };

  // If using SVG data URL, unoptimized is required or img fallback
  const isDataUrl = imgSrc.startsWith('data:');

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      unoptimized={isDataUrl}
      {...props}
    />
  );
}
