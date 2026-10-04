'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { Icon } from '@/components/ui/Icon';
import { useUIStore } from '@/store/uiStore';
import { api } from '@/services/api';
import { ReviewItem } from '@/types/cms';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [productName, setProductName] = useState('Real Madrid 2026/27 Away Kit');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const { showToast } = useUIStore();

  useEffect(() => {
    api.getReviews().then(setReviews);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev = await api.submitReview({
      author,
      location: location || 'India',
      productName,
      rating,
      comment,
    });

    setReviews([newRev, ...reviews]);
    setIsModalOpen(false);
    showToast('Thank you! Your verified review is published.');
    setAuthor('');
    setComment('');
  };

  return (
    <>
      <Header />
      <main className="flex flex-col relative w-full pt-14 pb-20 bg-surface min-h-screen">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
            <div>
              <h1 className="font-headline-lg-mobile md:text-3xl uppercase text-on-surface font-bold tracking-tight">
                VERIFIED DROP REVIEWS
              </h1>
              <p className="font-body-sm text-xs md:text-sm text-on-surface-variant mt-0.5">
                Authentic buyer feedback from supporters across India
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-wider font-bold shadow-xs hover:bg-primary-container active:scale-95 transition-all"
            >
              Write Review
            </button>
          </div>

          {/* Rating Summary Card */}
          <div className="bg-surface-container-lowest p-6 border border-outline-variant/20 shadow-sm flex flex-col md:flex-row items-center justify-around gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="font-display text-5xl md:text-6xl text-primary font-extrabold leading-none">
                4.9
              </span>
              <div className="flex text-amber-500 mt-2 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" size={20} className="fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="font-body-sm text-xs text-on-surface-variant mt-1">
                Based on 1,420+ ratings
              </span>
            </div>

            <div className="flex flex-col gap-2 text-left text-xs md:text-sm font-body-sm w-full md:w-auto min-w-[240px]">
              <div className="flex items-center gap-3">
                <span className="w-12 font-medium">5 Star</span>
                <div className="flex-1 md:w-36 h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="w-[94%] h-full bg-primary" />
                </div>
                <span className="text-on-surface-variant w-8 text-right">94%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 font-medium">4 Star</span>
                <div className="flex-1 md:w-36 h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="w-[5%] h-full bg-primary" />
                </div>
                <span className="text-on-surface-variant w-8 text-right">5%</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-12 font-medium">3 Star</span>
                <div className="flex-1 md:w-36 h-2 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="w-[1%] h-full bg-primary" />
                </div>
                <span className="text-on-surface-variant w-8 text-right">1%</span>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-surface-container-lowest p-5 border border-outline-variant/20 shadow-sm flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/10">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(r.rating)].map((_, i) => (
                        <Icon key={i} name="star" size={16} className="fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="font-body-sm text-[11px] text-on-surface-variant">{r.date}</span>
                  </div>

                  <p className="font-body-sm text-sm text-on-surface italic leading-relaxed">"{r.comment}"</p>
                </div>

                <div className="pt-3 border-t border-outline-variant/10 flex items-center justify-between">
                  <div>
                    <span className="font-headline-sm uppercase text-xs text-on-surface font-bold block">
                      {r.author} // {r.location}
                    </span>
                    <span className="block font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                      Item: {r.productName}
                    </span>
                  </div>
                  <span className="bg-primary/10 text-primary border border-primary/20 font-ticker-item text-[10px] px-2 py-0.5 uppercase font-bold tracking-wider">
                    VERIFIED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </main>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-surface p-6 border border-outline-variant/20 shadow-2xl flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
              <h3 className="font-headline-sm uppercase text-on-surface font-bold text-lg">
                Submit Drop Review
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface p-1 hover:text-primary transition-colors"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div>
              <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1.5">
                Rating
              </label>
              <div className="flex gap-2 text-amber-500">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRating(val)}
                    className="p-1 focus:outline-none hover:scale-110 transition-transform"
                  >
                    <Icon
                      name="star"
                      size={24}
                      className={val <= rating ? 'fill-amber-500 text-amber-500' : 'text-outline-variant'}
                    />
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              required
              placeholder="Your Name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="p-3 bg-surface-container-low text-sm border border-outline-variant/30 font-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="City (e.g. Mumbai, Bengaluru)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-3 bg-surface-container-low text-sm border border-outline-variant/30 font-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              required
              rows={3}
              placeholder="Your review regarding fabric quality, sizing accuracy, and dispatch speed..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="p-3 bg-surface-container-low text-sm border border-outline-variant/30 font-body-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            />

            <button
              type="submit"
              className="py-3 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-sm hover:bg-primary-container active:scale-95 transition-all"
            >
              Post Verified Review
            </button>
          </form>
        </div>
      )}
    </>
  );
}
