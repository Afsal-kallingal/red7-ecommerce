'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Icon } from '@/components/ui/Icon';
import { api } from '@/services/api';
import { ReviewItem } from '@/types/cms';
import { useUIStore } from '@/store/uiStore';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const { showToast } = useUIStore();

  const load = async () => {
    const data = await api.getReviews();
    setReviews(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Delete this review?')) {
      setReviews(reviews.filter((r) => r.id !== id));
      showToast('Review removed from storefront');
    }
  };

  return (
    <>
      <AdminHeader title="Customer Review Moderation" />
      <main className="p-6 flex flex-col gap-6">
        <div>
          <h2 className="font-headline-sm uppercase text-on-surface font-bold text-base">
            Verified Customer Reviews ({reviews.length})
          </h2>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Moderate, approve, or feature verified purchaser feedback.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/20 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-xs">
              <thead>
                <tr className="bg-surface-container-low text-on-surface font-label-caps uppercase tracking-wider border-b border-outline-variant/20">
                  <th className="p-3 font-bold">Buyer & Location</th>
                  <th className="p-3 font-bold">Rating</th>
                  <th className="p-3 font-bold">Feedback Comment</th>
                  <th className="p-3 font-bold">Product Item</th>
                  <th className="p-3 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {reviews.map((r) => (
                  <tr key={r.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3">
                      <span className="font-headline-sm font-bold text-on-surface block text-sm">
                        {r.author}
                      </span>
                      <span className="text-[11px] text-on-surface-variant">{r.location}</span>
                    </td>
                    <td className="p-3">
                      <div className="flex text-amber-500 gap-0.5">
                        {[...Array(r.rating)].map((_, i) => (
                          <Icon key={i} name="star" size={16} className="fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                    </td>
                    <td className="p-3 max-w-xs">
                      <p className="text-on-surface line-clamp-2">"{r.comment}"</p>
                    </td>
                    <td className="p-3 text-[11px] text-on-surface-variant max-w-[150px] truncate">
                      {r.productName}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(r.id)}
                        className="px-2.5 py-1 bg-surface-container-high hover:bg-error hover:text-on-error text-error font-label-caps text-[10px] uppercase font-bold transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
