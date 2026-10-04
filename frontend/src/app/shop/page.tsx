'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/storefront/Header';
import { KitCard } from '@/components/storefront/KitCard';
import { Footer } from '@/components/storefront/Footer';
import { api } from '@/services/api';
import { Product } from '@/types/product';
import { Icon } from '@/components/ui/Icon';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('query') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [layout, setLayout] = useState<'grid-2' | 'grid-1'>('grid-2');
  const [sortOption, setSortOption] = useState<'relevant' | 'price-low' | 'price-high' | 'newest'>('relevant');
  const [selectedClubs, setSelectedClubs] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const res = await api.getProducts({
          category: initialCategory || undefined,
          query: initialQuery || undefined,
          sort: sortOption,
        });
        setProducts(res.items);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [initialCategory, initialQuery, sortOption]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedClubs.length > 0 && (!p.club || !selectedClubs.includes(p.club))) {
        return false;
      }
      if (p.price > maxPrice) {
        return false;
      }
      if (selectedSizes.length > 0) {
        const hasSize = p.sizes.some((s) => selectedSizes.includes(s.size) && s.inStock);
        if (!hasSize) return false;
      }
      return true;
    });
  }, [products, selectedClubs, selectedSizes, maxPrice]);

  const activeFilterCount =
    (selectedClubs.length > 0 ? 1 : 0) +
    (selectedSizes.length > 0 ? 1 : 0) +
    (maxPrice < 1000 ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedClubs([]);
    setSelectedSizes([]);
    setMaxPrice(1000);
  };

  const allClubs = ['Real Madrid', 'Barcelona', 'Argentina', 'AC Milan', 'Manchester City'];
  const allSizes = ['S', 'M', 'L', 'XL', '2XL'];

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 md:pb-0 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          {/* Ticker announcement bar */}
          <div className="w-full bg-surface-container overflow-hidden py-1.5 px-margin border-b border-outline-variant/20">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <span className="font-ticker-item text-ticker-item uppercase text-on-surface tracking-wider">
                PAN-INDIA 48H DISPATCH // FLASH SALE DROP
              </span>
              <span className="font-ticker-item text-ticker-item uppercase text-primary font-bold">
                BUY 4 GET 1 FREE
              </span>
            </div>
          </div>

          <div className="max-w-6xl mx-auto w-full px-margin md:px-0">
            {/* Collection Overview Header */}
            <div className="pt-space-md pb-space-sm bg-surface">
              <div className="flex items-baseline justify-between mb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg uppercase tracking-tight text-on-surface font-bold">
                    {initialCategory
                      ? initialCategory.replace('-', ' ').toUpperCase()
                      : initialQuery
                      ? `SEARCH: "${initialQuery}"`
                      : '26/27 SEASON KITS'}
                  </h1>
                  <span className="bg-surface-container-high px-1.5 py-0.5 text-on-surface-variant font-ticker-item text-ticker-item rounded font-bold">
                    {filteredProducts.length}
                  </span>
                </div>

                {/* Filters Trigger */}
                <button
                  type="button"
                  onClick={() => setIsFilterModalOpen(true)}
                  className="flex items-center gap-1 bg-surface-container px-2.5 py-1 text-on-surface font-label-caps text-label-caps uppercase active:bg-surface-container-high transition-colors font-bold shadow-sm cursor-pointer"
                >
                  <Icon name="tune" size={16} className="text-primary" />
                  <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
                </button>
              </div>

              {/* Controls Row: Sort dropdown & Grid View Switcher */}
              <div className="flex items-center justify-between py-1">
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as any)}
                    className="bg-transparent text-on-surface-variant font-label-caps text-label-caps uppercase tracking-wider py-1 border-none cursor-pointer focus:outline-none"
                  >
                    <option value="relevant">Sort: Most relevant</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest Drop</option>
                  </select>
                </div>

                {/* View layout toggles (2-col vs 1-col) */}
                <div className="flex items-center gap-1 bg-surface-container-low p-0.5 border border-outline-variant/30">
                  <button
                    type="button"
                    aria-label="2 Column Grid View"
                    onClick={() => setLayout('grid-2')}
                    className={`w-7 h-7 flex items-center justify-center transition-all cursor-pointer ${
                      layout === 'grid-2'
                        ? 'bg-surface text-primary shadow-sm font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <Icon name="grid_view" size={16} />
                  </button>
                  <button
                    type="button"
                    aria-label="Single Column View"
                    onClick={() => setLayout('grid-1')}
                    className={`w-7 h-7 flex items-center justify-center transition-all cursor-pointer ${
                      layout === 'grid-1'
                        ? 'bg-surface text-primary shadow-sm font-bold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <Icon name="view_agenda" size={16} />
                  </button>
                </div>
              </div>

              {/* Active Filter Badges Strip */}
              {activeFilterCount > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none">
                  {selectedClubs.map((club) => (
                    <div
                      key={club}
                      className="flex items-center gap-1 bg-surface-container-high text-on-surface px-2 py-1 shrink-0 font-label-caps text-label-caps uppercase"
                    >
                      <span>{club}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedClubs((prev) => prev.filter((c) => c !== club))}
                        className="flex items-center text-on-surface-variant hover:text-on-surface cursor-pointer"
                      >
                        <Icon name="close" size={14} />
                      </button>
                    </div>
                  ))}

                  {selectedSizes.map((sz) => (
                    <div
                      key={sz}
                      className="flex items-center gap-1 bg-surface-container-high text-on-surface px-2 py-1 shrink-0 font-label-caps text-label-caps uppercase"
                    >
                      <span>Size: {sz}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedSizes((prev) => prev.filter((s) => s !== sz))}
                        className="flex items-center text-on-surface-variant hover:text-on-surface cursor-pointer"
                      >
                        <Icon name="close" size={14} />
                      </button>
                    </div>
                  ))}

                  {maxPrice < 1000 && (
                    <div className="flex items-center gap-1 bg-surface-container-high text-on-surface px-2 py-1 shrink-0 font-label-caps text-label-caps uppercase">
                      <span>Under ₹{maxPrice}</span>
                      <button
                        type="button"
                        onClick={() => setMaxPrice(1000)}
                        className="flex items-center text-on-surface-variant hover:text-on-surface cursor-pointer"
                      >
                        <Icon name="close" size={14} />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-on-surface-variant underline uppercase font-label-caps text-label-caps shrink-0 px-1 hover:text-primary font-bold cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Product Grid Area */}
            <div className="py-space-xs">
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse flex flex-col gap-2">
                      <div className="aspect-[4/5] bg-surface-container-high" />
                      <div className="h-4 bg-surface-container-high w-3/4" />
                      <div className="h-4 bg-surface-container-high w-1/3" />
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div
                  className={`grid ${
                    layout === 'grid-2'
                      ? 'grid-cols-2 md:grid-cols-4 gap-x-gutter md:gap-x-4 gap-y-space-md'
                      : 'grid-cols-1 md:grid-cols-2 gap-4'
                  } transition-all duration-200`}
                >
                  {filteredProducts.map((prod) => (
                    <KitCard key={prod.id} product={prod} layout={layout} />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center flex flex-col items-center justify-center bg-surface-container-lowest p-6 border border-outline-variant/20 my-4 shadow-sm">
                  <Icon name="package" size={40} className="text-on-surface-variant mb-2" />
                  <h3 className="font-headline-sm uppercase text-on-surface font-bold">
                    No Kits Match Your Filters
                  </h3>
                  <p className="font-body-sm text-on-surface-variant mt-1 mb-4">
                    Try adjusting club selections, sizing, or clear your price cap.
                  </p>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-sm cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Editorial Footer */}
          <Footer />
        </div>
      </main>

      {/* Filter Modal / Sheet */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-[85vw] max-w-[360px] bg-surface-container-lowest h-full flex flex-col shadow-2xl pt-safe pb-safe">
            <div className="h-14 px-margin flex items-center justify-between border-b border-outline-variant/20">
              <span className="font-headline-sm uppercase text-on-surface font-bold">Filters</span>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-on-surface cursor-pointer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-margin space-y-6 scrollbar-none">
              {/* Club / Team Filter */}
              <div>
                <h4 className="font-label-caps text-label-caps uppercase text-on-surface font-bold mb-2">
                  Club / Team
                </h4>
                <div className="space-y-1.5">
                  {allClubs.map((club) => {
                    const isChecked = selectedClubs.includes(club);
                    return (
                      <label
                        key={club}
                        className="flex items-center gap-2 cursor-pointer font-body-sm text-on-surface py-1"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedClubs([...selectedClubs, club]);
                            else setSelectedClubs(selectedClubs.filter((c) => c !== club));
                          }}
                          className="w-4 h-4 accent-primary"
                        />
                        <span>{club}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <h4 className="font-label-caps text-label-caps uppercase text-on-surface font-bold mb-2">
                  Size
                </h4>
                <div className="grid grid-cols-5 gap-1.5">
                  {allSizes.map((sz) => {
                    const isChecked = selectedSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          if (isChecked) setSelectedSizes(selectedSizes.filter((s) => s !== sz));
                          else setSelectedSizes([...selectedSizes, sz]);
                        }}
                        className={`py-2 text-center font-headline-sm uppercase transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-primary text-on-primary font-bold shadow-sm'
                            : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-label-caps text-label-caps uppercase text-on-surface font-bold">
                    Max Price
                  </h4>
                  <span className="font-price-current text-primary">₹ {maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-[11px] text-on-surface-variant font-body-sm">
                  <span>₹300</span>
                  <span>₹1000</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-margin bg-surface-container-low border-t border-outline-variant/20 flex gap-2">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 py-3 bg-surface-container-highest text-on-surface font-label-caps text-label-caps uppercase tracking-wider font-bold cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsFilterModalOpen(false)}
                className="flex-1 py-3 bg-primary text-on-primary font-label-caps text-label-caps uppercase tracking-wider font-bold shadow-md cursor-pointer"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Icon name="refresh" size={32} className="animate-spin text-primary" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
