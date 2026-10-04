import { MediaAsset } from './media';

export interface TickerItem {
  id: string;
  text: string;
  isHighlight?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  productName: string;
  verifiedBuyer: boolean;
  date: string;
}

export interface CouponItem {
  id: string;
  code: string;
  title: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  description: string;
  expiryDate: string;
  isActive: boolean;
}

export interface FAQItem {
  id: string;
  category: 'shipping' | 'sizing' | 'authenticity' | 'returns' | 'payment';
  question: string;
  answer: string;
}

export interface LifestyleBannerItem {
  id: string;
  title: string;
  link: string;
  image: MediaAsset;
}

export interface HomepageCms {
  hero: {
    dropBadge: string;
    headline: string;
    subheadline: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
    image: MediaAsset;
    desktopImage?: MediaAsset;
  };
  tickerStrip: TickerItem[];
  lifestyleBanners?: LifestyleBannerItem[];
  flashBanner: {
    badge: string;
    headline: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
}
