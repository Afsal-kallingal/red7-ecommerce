import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { FyndImage } from '@/components/ui/FyndImage';
import { Icon } from '@/components/ui/Icon';
import { api } from '@/services/api';

export const revalidate = 60;

export default async function CategoriesPage() {
  const categories = await api.getCategories();

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 bg-surface min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 w-full">
          <div className="flex items-center gap-space-xs mb-2">
            <h1 className="font-headline-lg-mobile md:text-3xl uppercase tracking-tight text-on-surface font-bold">
              ALL DEPARTMENTS
            </h1>
            <span className="bg-surface-container-high px-2 py-0.5 text-on-surface-variant font-ticker-item rounded font-bold">
              {categories.length}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant mb-6 md:text-base">
            Explore curated football matchday releases, terrace hoodies, tracksuits and gear.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative flex flex-col bg-surface-container-lowest overflow-hidden shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow"
              >
                <div className="w-full aspect-[4/5] bg-surface-container-low relative overflow-hidden">
                  <FyndImage
                    src={cat.image}
                    alt={cat.name}
                    fallbackType="department"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-primary/90 text-on-primary font-ticker-item px-2 py-0.5 uppercase tracking-wider backdrop-blur-xs text-[10px]">
                    {cat.itemCount} DROPS
                  </span>
                </div>
                <div className="p-3 md:p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-sm uppercase text-on-surface font-bold tracking-tight text-sm md:text-base">
                      {cat.name}
                    </h3>
                    <Icon name="arrow_forward" size={16} className="text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="font-body-sm text-[11px] md:text-xs text-on-surface-variant mt-0.5 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
