'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { FyndImage } from '@/components/ui/FyndImage';
import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatINR } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export function KitCard({
  product,
  layout = 'grid-2',
}: {
  product: Product;
  layout?: 'grid-2' | 'grid-1';
}) {
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { showToast } = useUIStore();

  const isFavorited = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    showToast(
      added ? `Saved ${product.shortTitle || product.title} to wishlist` : `Removed from wishlist`,
      'VIEW',
      '/wishlist'
    );
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      subtitle: product.subtitle,
      price: product.price,
      originalPrice: product.originalPrice,
      size: 'M',
      quantity: 1,
      image: product.primaryImage,
    });
    showToast(`Added ${product.shortTitle || product.title} to bag`, 'VIEW BAG', '/cart');
  };

  if (layout === 'grid-1') {
    return (
      <article className="flex flex-col bg-white group cursor-pointer pb-4">
        {/* Full-width image for 1-column view */}
        <div className="relative w-full aspect-[4/5] bg-[#f5f5f5] overflow-hidden">
          <Link href={`/products/${product.slug}`} className="block w-full h-full">
            <FyndImage
              src={product.primaryImage}
              alt={product.title}
              fallbackType="kit"
              fill
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Top-left Red Card Mini Pill */}
          <span className="absolute top-3 left-3 w-5 h-1.5 bg-[#e50914] rounded-full shadow-xs pointer-events-none" />

          {/* Wishlist Button */}
          <button
            type="button"
            aria-label="Wishlist"
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-black hover:text-[#e50914] transition-all active:scale-90 cursor-pointer"
          >
            <Icon
              name={isFavorited ? 'favorite' : 'favorite_border'}
              size={18}
              className={isFavorited ? 'text-[#e50914]' : 'text-neutral-700'}
            />
          </button>
        </div>

        {/* Centered Title & Price */}
        <div className="pt-3 px-2 flex flex-col items-center text-center">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-headline text-center text-sm sm:text-base font-bold uppercase tracking-tight text-black line-clamp-2 hover:text-[#e50914] transition-colors">
              {product.title}
            </h3>
          </Link>
          <div className="mt-1 flex items-baseline justify-center gap-2">
            <span className="text-black font-bold text-sm sm:text-base">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-neutral-400 line-through font-normal text-xs sm:text-sm">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Exact 2-Column Mobile Layout matching Reference Images 1 & 3
  return (
    <article className="flex flex-col bg-white group cursor-pointer pb-3 select-none">
      {/* Product Image */}
      <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[4/5] bg-[#f5f5f5] overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <FyndImage
            src={product.primaryImage}
            alt={product.title}
            fallbackType="kit"
            fill
            sizes="(max-width: 768px) 50vw, 320px"
            className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Top-left Referee Red Accent Bar (from Reference Image 3) */}
        {(product.badge || product.isNewArrival || product.discountPercent) && (
          <span
            className="absolute top-2.5 left-2.5 w-5 h-1.5 bg-[#e50914] rounded-full shadow-xs pointer-events-none z-10"
            title="RED7 Verified Drop"
          />
        )}

        {/* Subtle Wishlist action on hover/tap */}
        <button
          type="button"
          aria-label="Wishlist"
          onClick={handleWishlistClick}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-black hover:text-[#e50914] active:scale-90 cursor-pointer z-10"
        >
          <Icon
            name={isFavorited ? 'favorite' : 'favorite_border'}
            size={15}
            className={isFavorited ? 'text-[#e50914]' : 'text-neutral-700'}
          />
        </button>

        {/* Quick Add Overlay on hover (Desktop) */}
        <button
          type="button"
          onClick={handleQuickAdd}
          aria-label="Quick Add to Cart"
          className="hidden md:flex absolute bottom-2 inset-x-2 h-8 bg-black/90 hover:bg-[#e50914] text-white font-headline text-xs uppercase tracking-wider font-bold items-center justify-center opacity-0 group-hover:opacity-100 transition-all rounded-xs z-10"
        >
          Quick Add
        </button>
      </div>

      {/* Centered Title & Price matching Reference 1 & 3 */}
      <div className="pt-2 px-1 flex flex-col items-center text-center">
        <Link href={`/products/${product.slug}`} className="w-full">
          <h3 className="font-headline text-center text-xs sm:text-sm font-bold uppercase tracking-tight text-black line-clamp-2 leading-snug hover:text-[#e50914] transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="mt-1 flex items-baseline justify-center gap-1.5 flex-wrap">
          <span className="text-black font-bold text-xs sm:text-sm">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-neutral-400 line-through font-normal text-[11px] sm:text-xs">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
