'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { api } from '@/services/api';
import { CouponItem } from '@/types/cms';
import { useUIStore } from '@/store/uiStore';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [discountValue, setDiscountValue] = useState(100);
  const [minOrderValue, setMinOrderValue] = useState(500);
  const [description, setDescription] = useState('');
  const { showToast } = useUIStore();

  useEffect(() => {
    api.getCoupons().then(setCoupons);
  }, []);

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;

    const newC: CouponItem = {
      id: `coup-${Date.now()}`,
      code: code.toUpperCase().trim(),
      title,
      discountType: 'fixed',
      discountValue,
      minOrderValue,
      description,
      expiryDate: '2026-12-31',
      isActive: true,
    };

    setCoupons([newC, ...coupons]);
    showToast(`Coupon ${newC.code} activated`);
    setCode('');
    setTitle('');
    setDescription('');
  };

  const toggleCouponActive = (id: string) => {
    setCoupons(
      coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    showToast('Coupon status updated');
  };

  return (
    <>
      <AdminHeader title="Promotions & Coupon Engine" />
      <main className="p-6 flex flex-col gap-6 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coupon List */}
          <div className="md:col-span-2 bg-surface-container-lowest p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-4">
            <span className="font-label-caps uppercase text-on-surface font-bold text-sm">
              Active Promo Vouchers ({coupons.length})
            </span>

            <div className="flex flex-col gap-3">
              {coupons.map((c) => (
                <div
                  key={c.id}
                  className="p-3 bg-surface-container-low border border-outline-variant/20 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm uppercase text-xs text-on-surface font-bold">
                        {c.code}
                      </span>
                      <span
                        className={`font-label-caps text-[10px] px-1.5 py-0.2 uppercase font-bold ${
                          c.isActive
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {c.isActive ? 'ACTIVE' : 'PAUSED'}
                      </span>
                    </div>
                    <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                      {c.title} • Min Order: ₹{c.minOrderValue}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCouponActive(c.id)}
                    className="px-3 py-1 bg-surface-container-highest text-on-surface font-label-caps text-xs uppercase font-bold hover:bg-primary hover:text-on-primary transition-colors"
                  >
                    {c.isActive ? 'Pause' : 'Activate'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Coupon Form */}
          <form
            onSubmit={handleAddCoupon}
            className="bg-surface-container-lowest p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-3 h-fit"
          >
            <span className="font-label-caps uppercase text-on-surface font-bold text-sm">
              Create New Coupon
            </span>

            <div>
              <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                Coupon Code
              </label>
              <input
                type="text"
                required
                placeholder="e.g. FLASH200"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-headline-sm uppercase text-on-surface"
              />
            </div>

            <div>
              <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                Promotion Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Extra ₹200 Off"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                  Discount (₹)
                </label>
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface"
                />
              </div>
              <div>
                <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                  Min Cart (₹)
                </label>
                <input
                  type="number"
                  value={minOrderValue}
                  onChange={(e) => setMinOrderValue(Number(e.target.value))}
                  className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface"
                />
              </div>
            </div>

            <div>
              <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                Terms Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Applies on order total..."
                className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm resize-none text-on-surface"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-sm active:scale-95 transition-transform"
            >
              Deploy Coupon
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
