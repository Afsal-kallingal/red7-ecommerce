'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store/uiStore';
import { api } from '@/services/api';
import { Product } from '@/types/product';
import { FyndImage } from '@/components/ui/FyndImage';
import { formatINR } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

export function SearchModal() {
  const { isSearchModalOpen, closeSearchModal } = useUIStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await api.getProducts({ query: searchTerm });
        setResults(data.items.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      closeSearchModal();
      router.push(`/shop?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  if (!isSearchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-start items-center p-3 pt-14">
      <div className="w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden max-h-[85vh] rounded-md border border-neutral-100">
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center p-3.5 border-b border-neutral-200 gap-2.5">
          <Icon name="search" size={20} className="text-[#e50914]" />
          <input
            type="search"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search AC Milan, Messi, Bellingham, retro kits..."
            className="flex-1 bg-transparent border-none text-black font-body text-sm focus:outline-none placeholder:text-neutral-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="text-neutral-400 hover:text-black p-1 cursor-pointer"
            >
              <Icon name="close" size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={closeSearchModal}
            className="font-headline text-xs uppercase tracking-wider text-[#e50914] font-bold px-2 py-1 cursor-pointer"
          >
            Cancel
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-neutral-50 flex flex-wrap gap-1.5 border-b border-neutral-100">
          <span className="font-headline text-xs uppercase text-neutral-500 font-bold self-center mr-1">
            Trending:
          </span>
          {['AC Milan', 'Argentina Messi', 'Real Madrid', 'Streetwear', 'Pulisic', 'Retro 42'].map((chip) => (
            <button
              key={chip}
              onClick={() => setSearchTerm(chip)}
              className="px-2.5 py-1 bg-white border border-neutral-200 text-black font-headline text-xs uppercase tracking-wider font-semibold hover:bg-[#e50914] hover:text-white hover:border-[#e50914] transition-colors cursor-pointer rounded-xs"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Live Search Results */}
        <div className="flex-1 overflow-y-auto p-3 divide-y divide-neutral-100 scrollbar-none">
          {isLoading ? (
            <div className="py-8 text-center text-neutral-500 font-body flex flex-col items-center">
              <Icon name="refresh" size={24} className="animate-spin text-[#e50914]" />
              <p className="mt-2 font-headline text-xs uppercase tracking-wider">Searching Vault...</p>
            </div>
          ) : results.length > 0 ? (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={closeSearchModal}
                className="flex items-center gap-3 py-2.5 hover:bg-neutral-50 transition-colors px-1 rounded-xs"
              >
                <div className="w-12 h-14 bg-neutral-100 relative shrink-0 overflow-hidden rounded-xs">
                  <FyndImage
                    src={product.primaryImage}
                    alt={product.title}
                    fallbackType="kit"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-headline text-xs sm:text-sm font-bold uppercase text-black truncate">
                    {product.title}
                  </h4>
                  <p className="font-body text-[11px] text-neutral-500 truncate">
                    {product.subtitle}
                  </p>
                  <span className="font-headline text-xs font-bold text-[#e50914]">
                    {formatINR(product.price)}
                  </span>
                </div>
                <Icon name="expand_right" size={16} className="text-neutral-400" />
              </Link>
            ))
          ) : searchTerm ? (
            <div className="py-8 text-center text-neutral-500 font-body">
              <p className="font-headline text-base text-black uppercase font-bold">No Drops Found</p>
              <p className="mt-1 text-xs">Try searching for "Milan", "Messi", or "Retro"</p>
            </div>
          ) : (
            <div className="py-6 text-center text-neutral-400 font-body">
              <p className="font-headline text-xs uppercase tracking-wider">
                Type keywords to explore the RED7 catalog
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
