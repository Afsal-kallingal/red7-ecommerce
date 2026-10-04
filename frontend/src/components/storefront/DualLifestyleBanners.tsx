'use client';

import React from 'react';
import Link from 'next/link';
import { FyndImage } from '@/components/ui/FyndImage';
import { MediaAsset } from '@/types/media';

export function DualLifestyleBanners({
  banners,
}: {
  banners?: Array<{
    id: string;
    title: string;
    link: string;
    image: MediaAsset;
  }>;
}) {
  const defaultBanners = [
    {
      id: 'banner-green',
      title: 'MATCHDAY EDIT',
      link: '/shop?category=football-jerseys',
      image: {
        id: 'img-green',
        url: '/images/red7/lifestyle-green.jpg',
        alt: 'RED7 Matchday Green Kit Editorial',
      },
    },
    {
      id: 'banner-blue-42',
      title: 'RETRO 42 HERITAGE',
      link: '/shop?category=streetwear',
      image: {
        id: 'img-blue-42',
        url: '/images/red7/lifestyle-blue-42.jpg',
        alt: 'RED7 Retro 42 Heritage Jersey',
      },
    },
  ];

  const items = banners && banners.length >= 2 ? banners : defaultBanners;

  return (
    <section className="w-full select-none" aria-label="Editorial Collections">
      <div className="grid grid-cols-2 gap-1 sm:gap-2">
        {items.slice(0, 2).map((banner) => (
          <Link
            key={banner.id}
            href={banner.link}
            className="group relative block w-full aspect-[3/4] overflow-hidden bg-neutral-100"
          >
            <FyndImage
              src={banner.image}
              alt={banner.title}
              fill
              sizes="(max-width: 768px) 50vw, 600px"
              className="object-cover object-center group-hover:scale-[1.025] transition-transform duration-700 ease-out"
            />
            {/* Subtle interactive hover highlight */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          </Link>
        ))}
      </div>
    </section>
  );
}
