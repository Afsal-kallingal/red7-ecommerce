'use client';

import React from 'react';

export function PromoTicker({
  items = [
    'BUY4GET150-OFF',
    'BUY5GETFREERANDOMKIT',
    'BUY2GET1FREE',
    'USE CODE RED7 FOR 10% OFF',
    'ALL-INDIA EXPRESS DISPATCH',
  ],
}: {
  items?: string[];
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <section
      aria-label="Promotional Announcement Ticker"
      className="w-full bg-[#eeeeee] border-y border-neutral-200/60 overflow-hidden py-2 select-none"
    >
      <div className="flex items-center gap-10 whitespace-nowrap animate-marquee">
        {repeated.map((text, i) => (
          <div key={i} className="flex items-center gap-8 font-headline text-xs sm:text-sm uppercase text-neutral-800 font-bold tracking-wider">
            <span>{text}</span>
            <span className="text-[#e50914] font-black">•</span>
          </div>
        ))}
      </div>
    </section>
  );
}
