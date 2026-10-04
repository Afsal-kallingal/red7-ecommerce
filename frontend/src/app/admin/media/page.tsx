'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { api } from '@/services/api';
import { Product } from '@/types/product';
import { FyndImage } from '@/components/ui/FyndImage';
import { Icon } from '@/components/ui/Icon';
import { useUIStore } from '@/store/uiStore';
import { buildMediaAsset } from '@/lib/images';

export default function AdminMediaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const { showToast } = useUIStore();

  const load = async () => {
    const data = await api.getProducts();
    setProducts(data.items);
    if (!selectedProductId && data.items.length > 0) {
      setSelectedProductId(data.items[0].id);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim() || !selectedProduct) return;

    const newAsset = buildMediaAsset(
      `img-${Date.now()}`,
      newImageUrl.trim(),
      newImageAlt.trim() || selectedProduct.title
    );

    const updatedGallery = [...selectedProduct.gallery, newAsset];

    await api.updateProduct(selectedProduct.id, {
      gallery: updatedGallery,
    });

    setNewImageUrl('');
    setNewImageAlt('');
    showToast('Image uploaded to gallery');
    load();
  };

  const handleSetPrimary = async (imgId: string) => {
    if (!selectedProduct) return;
    const target = selectedProduct.gallery.find((g) => g.id === imgId);
    if (!target) return;

    await api.updateProduct(selectedProduct.id, {
      primaryImage: target,
    });

    showToast('Set as primary showcase image');
    load();
  };

  const handleDeleteImage = async (imgId: string) => {
    if (!selectedProduct) return;
    if (selectedProduct.gallery.length <= 1) {
      showToast('A product must retain at least one image.');
      return;
    }

    const updatedGallery = selectedProduct.gallery.filter((g) => g.id !== imgId);
    await api.updateProduct(selectedProduct.id, {
      gallery: updatedGallery,
      primaryImage:
        selectedProduct.primaryImage.id === imgId
          ? updatedGallery[0]
          : selectedProduct.primaryImage,
    });

    showToast('Image removed from gallery');
    load();
  };

  return (
    <>
      <AdminHeader title="Media Vault & Image Pipeline" />
      <main className="p-6 flex flex-col gap-6">
        <div>
          <h2 className="font-headline-sm uppercase text-on-surface font-bold text-base">
            Centralized Media Asset Controller
          </h2>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Upload new photography assets, replace, delete, or re-assign the primary image. All changes sync to the live storefront without rewriting UI code.
          </p>
        </div>

        {/* Product Selector */}
        <div className="bg-surface-container-lowest p-4 border border-outline-variant/20 shadow-xs flex items-center justify-between gap-4">
          <label className="font-label-caps uppercase text-on-surface font-bold text-xs shrink-0">
            Select Product Media Vault:
          </label>
          <select
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
            className="flex-1 max-w-md p-2 bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-sm text-xs"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {selectedProduct && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gallery Images List */}
            <div className="lg:col-span-2 bg-surface-container-lowest p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-4">
              <span className="font-label-caps uppercase text-on-surface font-bold text-sm">
                Active Gallery Assets ({selectedProduct.gallery.length})
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {selectedProduct.gallery.map((img, idx) => {
                  const isPrimary = selectedProduct.primaryImage.url === img.url;
                  return (
                    <div
                      key={img.id || idx}
                      className={`relative aspect-[4/5] bg-surface-container-low overflow-hidden border-2 flex flex-col justify-between ${
                        isPrimary ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant/30'
                      }`}
                    >
                      <FyndImage
                        src={img}
                        alt={img.alt}
                        fallbackType="kit"
                        fill
                        className="object-cover"
                      />

                      {/* Primary Badge */}
                      {isPrimary && (
                        <div className="absolute top-2 left-2 z-10 bg-primary text-on-primary font-ticker-item text-[10px] px-1.5 py-0.5 uppercase font-bold">
                          PRIMARY
                        </div>
                      )}

                      {/* Overlay Controls */}
                      <div className="absolute inset-x-0 bottom-0 p-1.5 bg-inverse-surface/80 backdrop-blur-xs flex items-center justify-between z-10">
                        {!isPrimary ? (
                          <button
                            type="button"
                            onClick={() => handleSetPrimary(img.id)}
                            className="text-[10px] font-label-caps uppercase text-tertiary-fixed font-bold hover:underline"
                          >
                            Set Primary
                          </button>
                        ) : (
                          <span className="text-[10px] font-label-caps uppercase text-primary-fixed font-bold">
                            Default
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDeleteImage(img.id)}
                          className="text-error hover:text-white p-0.5"
                        >
                          <Icon name="delete" size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upload New Asset Form */}
            <form
              onSubmit={handleAddImage}
              className="bg-surface-container-lowest p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-3 h-fit"
            >
              <span className="font-label-caps uppercase text-on-surface font-bold text-sm">
                Add / Upload Image Asset
              </span>
              <p className="font-body-sm text-[11px] text-on-surface-variant">
                Enter an external CDN image URL, Google UserContent link, or leave blank to test fallback generation.
              </p>

              <div>
                <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                  Image Source URL
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://cdn.fynd.in/..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                  Alt Caption
                </label>
                <input
                  type="text"
                  placeholder="e.g. Front flat-lay kit shot"
                  value={newImageAlt}
                  onChange={(e) => setNewImageAlt(e.target.value)}
                  className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="mt-2 py-2.5 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-sm active:scale-95 transition-transform"
              >
                Upload To Gallery
              </button>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
