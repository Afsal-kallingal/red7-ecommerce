import { MediaAsset } from './media';

export type KitSize = 'S' | 'M' | 'L' | 'XL' | '2XL';

export interface SizeInventory {
  size: KitSize;
  label: string; // e.g., 40"
  inStock: boolean;
  stock: number;
}

export interface ProductSpecs {
  material: string;
  fit: string;
  badges: string;
  print: string;
  origin?: string;
  weight?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: 'football-jerseys' | 'sportswear' | 'streetwear' | 'shoes' | 'accessories' | 'gadgets';
  department: string;
  club?: string;
  league?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  badge?: string;
  dropTag?: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  primaryImage: MediaAsset;
  gallery: MediaAsset[];
  sizes: SizeInventory[];
  specs: ProductSpecs;
  description: string;
  featured?: boolean;
  isNewArrival?: boolean;
  createdAt?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  itemCount: number;
  image: MediaAsset;
  featured: boolean;
}
