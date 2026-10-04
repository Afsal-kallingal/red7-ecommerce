'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { KitCard } from '@/components/storefront/KitCard';
import { useWishlistStore } from '@/store/wishlistStore';
import { api } from '@/services/api';
import { Product } from '@/types/product';
import { Icon } from '@/components/ui/Icon';

export default function WishlistPage() {
  const { wishlistIds } = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const res = await api.getProducts();
        const favorited = res.items.filter((p) => wishlistIds.includes(p.id));
        setProducts(favorited);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [wishlistIds]);

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 md:pb-12 bg-surface min-h-screen">
        <div className="max-w-6xl mx-auto w-full px-margin md:px-6 pt-space-md pb-space-lg flex flex-col gap-4">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <h1 className="font-headline-lg-mobile md:font-headline-lg uppercase text-on-surface font-bold tracking-tight">
              SAVED KIT VAULT
            </h1>
            <span className="bg-surface-container-high px-2 py-0.5 text-on-surface-variant font-ticker-item rounded font-bold">
              {products.length}
            </span>
          </div>

          {isLoading ? (
            <div className="py-16 text-center text-on-surface-variant font-body-sm flex justify-center">
              <Icon name="refresh" size={32} className="animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-center bg-surface-container-lowest p-6 border border-outline-variant/20 shadow-sm my-4">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-4">
                <Icon name="favorite_border" size={32} />
              </div>
              <h2 className="font-headline-md uppercase text-on-surface font-bold">
                Your Vault Is Empty
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-6 max-w-xs">
                Tap the heart icon on any matchday release to reserve it in your personal radar.
              </p>
              <Link
                href="/shop"
                className="px-8 py-3 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-md hover:bg-primary/90 transition-all active:scale-95"
              >
                EXPLORE 26/27 CATALOG
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter md:gap-4">
              {products.map((p) => (
                <KitCard key={p.id} product={p} layout="grid-2" />
              ))}
            </div>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}
