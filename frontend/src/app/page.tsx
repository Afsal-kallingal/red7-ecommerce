import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/storefront/Header';
import { PromoTicker } from '@/components/storefront/PromoTicker';
import { DualLifestyleBanners } from '@/components/storefront/DualLifestyleBanners';
import { ProductCatalogSection } from '@/components/storefront/ProductCatalogSection';
import { Footer } from '@/components/storefront/Footer';
import { FyndImage } from '@/components/ui/FyndImage';
import { api } from '@/services/api';

export const revalidate = 60; // ISR cache

export default async function HomePage() {
  const [productsData, cms] = await Promise.all([
    api.getProducts({ featured: true }),
    api.getHomepageCms(),
  ]);

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-13 sm:pt-14 md:pt-16 bg-white min-h-screen">
        {/* Large Cinematic Hero Banner matching Reference Image 2 on Mobile & Widescreen Studio on Web */}
        <section className="relative w-full overflow-hidden bg-[#f5f5f5] select-none">
          <Link
            href="/shop"
            className="group relative block w-full overflow-hidden"
            aria-label="Shop the RED7 Streetwear & Kits Drop"
          >
            {/* Mobile Viewport: 3:4 portrait matching Reference Image 2 */}
            <div className="relative md:hidden w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
              <FyndImage
                src={cms.hero.image}
                alt={cms.hero.headline}
                fallbackType="hero"
                fill
                priority
                quality={92}
                sizes="(max-width: 768px) 100vw, 1400px"
                className="object-cover object-top group-hover:scale-[1.015] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
            </div>

            {/* Desktop / Web Viewport: 16:9 / 21:9 Widescreen aligned with full models & RED7 wall visible */}
            <div className="hidden md:block relative w-full aspect-[16/9] lg:aspect-[21/9] xl:aspect-[2.35/1] max-h-[660px] overflow-hidden bg-white">
              <FyndImage
                src={cms.hero.desktopImage || cms.hero.image}
                alt={cms.hero.headline}
                fallbackType="hero"
                fill
                priority
                quality={95}
                sizes="(min-width: 768px) 100vw, 1920px"
                className="object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
            </div>
          </Link>
        </section>

        {/* Promotional Ticker Marquee Strip matching Reference Image 2 */}
        <PromoTicker
          items={cms.tickerStrip?.map((t) => t.text) || [
            'BUY4GET150-OFF',
            'BUY5GETFREERANDOMKIT',
            'BUY2GET1FREE',
            'USE CODE RED7 FOR 10% OFF',
            'ALL-INDIA EXPRESS DISPATCH',
          ]}
        />

        {/* Dual Vertical Lifestyle Editorial Banners matching Reference Image 2 */}
        <DualLifestyleBanners banners={cms.lifestyleBanners} />

        {/* Product Catalog Section with Sorting & View Toggles matching Reference Images 1 & 3 */}
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 md:px-8">
          <ProductCatalogSection
            initialProducts={productsData.items}
            totalCount={409}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
