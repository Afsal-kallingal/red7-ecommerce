'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { api } from '@/services/api';
import { Product } from '@/types/product';
import { FyndImage } from '@/components/ui/FyndImage';
import { useUIStore } from '@/store/uiStore';

export default function AdminInventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { showToast } = useUIStore();

  useEffect(() => {
    api.getProducts().then((res) => setProducts(res.items));
  }, []);

  const handleUpdateStock = async (productId: string, sizeIndex: number, delta: number) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    const newSizes = [...prod.sizes];
    const current = newSizes[sizeIndex].stock;
    const updated = Math.max(0, current + delta);
    newSizes[sizeIndex] = { ...newSizes[sizeIndex], stock: updated, inStock: updated > 0 };

    const totalStock = newSizes.reduce((sum, s) => sum + s.stock, 0);

    await api.updateProduct(productId, {
      sizes: newSizes,
      stockCount: totalStock,
      inStock: totalStock > 0,
    });

    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, sizes: newSizes, stockCount: totalStock } : p
      )
    );
    showToast(`Stock updated for ${prod.shortTitle}`);
  };

  return (
    <>
      <AdminHeader title="Variant Stock & Inventory Controller" />
      <main className="p-6 flex flex-col gap-6">
        <div>
          <h2 className="font-headline-sm uppercase text-on-surface font-bold text-base">
            Size Inventory Matrix (S / M / L / XL / 2XL)
          </h2>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Adjust real-time stock levels per size variant. Depleted stock triggers low-stock alerts.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/20 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-xs">
              <thead>
                <tr className="bg-surface-container-low text-on-surface font-label-caps uppercase tracking-wider border-b border-outline-variant/20">
                  <th className="p-3 font-bold">Product</th>
                  <th className="p-3 font-bold text-center">S (38")</th>
                  <th className="p-3 font-bold text-center">M (40")</th>
                  <th className="p-3 font-bold text-center">L (42")</th>
                  <th className="p-3 font-bold text-center">XL (44")</th>
                  <th className="p-3 font-bold text-center">2XL (46")</th>
                  <th className="p-3 font-bold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <div className="w-10 h-12 bg-surface-container relative shrink-0 overflow-hidden border border-outline-variant/20">
                        <FyndImage
                          src={p.primaryImage}
                          alt={p.title}
                          fallbackType="kit"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-headline-sm uppercase text-xs text-on-surface font-bold truncate max-w-[200px]">
                          {p.title}
                        </h4>
                        <span className="font-body-sm text-[10px] text-on-surface-variant">
                          {p.department}
                        </span>
                      </div>
                    </td>

                    {/* 5 Sizes */}
                    {[0, 1, 2, 3, 4].map((idx) => {
                      const sz = p.sizes[idx] || { size: '?', stock: 0 };
                      return (
                        <td key={idx} className="p-3 text-center">
                          <div className="inline-flex items-center bg-surface-container-low border border-outline-variant/30">
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(p.id, idx, -1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-surface-container text-on-surface"
                            >
                              -
                            </button>
                            <span
                              className={`w-8 text-center font-bold text-xs ${
                                sz.stock <= 2 ? 'text-error' : 'text-on-surface'
                              }`}
                            >
                              {sz.stock}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleUpdateStock(p.id, idx, 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-surface-container text-on-surface"
                            >
                              +
                            </button>
                          </div>
                        </td>
                      );
                    })}

                    <td className="p-3 text-right">
                      <span
                        className={`font-headline-sm uppercase text-xs font-bold ${
                          p.stockCount <= 5 ? 'text-error' : 'text-primary'
                        }`}
                      >
                        {p.stockCount} Units
                      </span>
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
