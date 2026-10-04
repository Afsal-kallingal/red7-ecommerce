'use client';

import React, { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import { KitCard } from '@/components/storefront/KitCard';

export function ProductCatalogSection({
  initialProducts,
  totalCount = 409,
}: {
  initialProducts: Product[];
  totalCount?: number;
}) {
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState<'2' | '1'>('2');

  const sortedProducts = useMemo(() => {
    const list = [...initialProducts];
    switch (sortBy) {
      case 'alpha-asc':
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case 'alpha-desc':
        return list.sort((a, b) => b.title.localeCompare(a.title));
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'best-selling':
        return list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
      case 'featured':
      default:
        return list;
    }
  }, [initialProducts, sortBy]);

  return (
    <section className="w-full px-3 sm:px-4 md:px-0 pt-6 sm:pt-8 pb-12 sm:pb-16 flex flex-col">
      {/* Title & Product Count Badge matching Reference Image 1 & 3 */}
      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
        <h2 className="font-headline text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
          Products
        </h2>
        <span className="bg-[#eeeeee] text-[#444444] text-xs font-bold px-2 py-0.5 rounded-xs tracking-wider">
          {totalCount}
        </span>
      </div>

      {/* Sorting Dropdown & Grid Layout Toggles */}
      <div className="flex items-center justify-between py-2 sm:py-2.5 border-b border-neutral-150 mb-3 sm:mb-4">
        {/* Sort Select */}
        <div className="relative inline-flex items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-transparent pr-6 py-1 font-body text-xs sm:text-sm text-black font-medium cursor-pointer focus:outline-none"
            aria-label="Sort products"
          >
            <option value="featured">Alphabetically, A-Z</option>
            <option value="alpha-asc">Alphabetically, A-Z</option>
            <option value="alpha-desc">Alphabetically, Z-A</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="best-selling">Best selling</option>
          </select>
          <svg
            className="absolute right-0.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none text-neutral-800"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* View Mode Layout Toggle (2x2 vs 1-Column) */}
        <div className="flex items-center gap-2">
          {/* 2x2 Grid View Icon */}
          <button
            type="button"
            onClick={() => setGridCols('2')}
            aria-label="2-column grid view"
            className={`p-1.5 cursor-pointer transition-colors ${
              gridCols === '2' ? 'text-black' : 'text-neutral-350 hover:text-neutral-600'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <rect x="1" y="1" width="7" height="7" rx="0.5" />
              <rect x="10" y="1" width="7" height="7" rx="0.5" />
              <rect x="1" y="10" width="7" height="7" rx="0.5" />
              <rect x="10" y="10" width="7" height="7" rx="0.5" />
            </svg>
          </button>

          {/* 1x1 Single View Icon */}
          <button
            type="button"
            onClick={() => setGridCols('1')}
            aria-label="Single column view"
            className={`p-1.5 cursor-pointer transition-colors ${
              gridCols === '1' ? 'text-black' : 'text-neutral-350 hover:text-neutral-600'
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="2" width="14" height="14" rx="0.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Grid matching Reference Images 1 & 3 */}
      {gridCols === '2' ? (
        <div className="grid grid-cols-2 gap-x-2.5 sm:gap-x-3.5 gap-y-5 sm:gap-y-6 md:grid-cols-4 md:gap-x-4 md:gap-y-8">
          {sortedProducts.map((product) => (
            <KitCard key={product.id} product={product} layout="grid-2" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-lg mx-auto w-full">
          {sortedProducts.map((product) => (
            <KitCard key={product.id} product={product} layout="grid-1" />
          ))}
        </div>
      )}
    </section>
  );
}
