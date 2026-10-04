export type MediaFallbackType = 
  | 'kit' 
  | 'streetwear' 
  | 'department' 
  | 'hero' 
  | 'avatar' 
  | 'banner' 
  | 'accessory';

export interface MediaAsset {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  isPrimary?: boolean;
  blurDataUrl?: string;
}

export type ResolvableImage = string | MediaAsset | null | undefined;
