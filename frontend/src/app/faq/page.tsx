'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { Icon } from '@/components/ui/Icon';
import { api } from '@/services/api';
import { FAQItem } from '@/types/cms';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getFaqs().then(setFaqs);
  }, []);

  const filtered = faqs.filter((f) => {
    if (activeCategory !== 'all' && f.category !== activeCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 bg-surface min-h-screen">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col gap-6">
          <div className="flex flex-col">
            <h1 className="font-headline-lg-mobile md:text-3xl uppercase text-on-surface font-bold tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h1>
            <p className="font-body-sm text-on-surface-variant mt-1 text-sm md:text-base">
              Everything you need to know about our matchday kits, sizing, shipping, and free returns.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="search"
              placeholder="Search help topics (e.g. shipping, sizing, COD)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface-container-low px-4 py-3 pl-11 font-body-sm text-sm border border-outline-variant/30 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Icon name="search" size={20} className="absolute left-3.5 top-3.5 text-outline" />
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
            {['all', 'shipping', 'sizing', 'authenticity', 'returns', 'payment'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 font-label-caps text-xs uppercase tracking-wider transition-colors shrink-0 ${
                  activeCategory === cat
                    ? 'bg-primary text-on-primary font-bold shadow-xs'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordions */}
          <div className="flex flex-col gap-3">
            {filtered.map((faq) => (
              <details
                key={faq.id}
                className="group bg-surface-container-lowest p-5 border border-outline-variant/20 shadow-xs"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none select-none font-headline-sm uppercase text-sm md:text-base text-on-surface font-bold">
                  <span>{faq.question}</span>
                  <Icon
                    name="expand_more"
                    size={20}
                    className="text-on-surface-variant transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2"
                  />
                </summary>
                <p className="font-body-sm text-xs md:text-sm text-on-surface-variant mt-3 pt-3 border-t border-outline-variant/10 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
