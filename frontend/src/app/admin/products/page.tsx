'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { api } from '@/services/api';
import { Product } from '@/types/product';
import { FyndImage } from '@/components/ui/FyndImage';
import { Icon } from '@/components/ui/Icon';
import { useUIStore } from '@/store/uiStore';
import { formatINR } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { showToast } = useUIStore();

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('football-jerseys');
  const [price, setPrice] = useState(399);
  const [originalPrice, setOriginalPrice] = useState(449);
  const [badge, setBadge] = useState('NEW DROP');
  const [stockCount, setStockCount] = useState(10);
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const loadProducts = async () => {
    const data = await api.getProducts();
    setProducts(data.items);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setTitle('');
    setSubtitle('Official Matchday Specification');
    setCategory('football-jerseys');
    setPrice(399);
    setOriginalPrice(449);
    setBadge('NEW DROP');
    setStockCount(12);
    setImageUrl('');
    setDescription('Exclusive limited seasonal terrace kit release.');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setTitle(p.title);
    setSubtitle(p.subtitle);
    setCategory(p.category);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice || p.price);
    setBadge(p.badge || '');
    setStockCount(p.stockCount);
    setImageUrl(p.primaryImage.url);
    setDescription(p.description);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to remove this product?')) {
      await api.deleteProduct(id);
      showToast('Product removed from catalog');
      loadProducts();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingProduct) {
      await api.updateProduct(editingProduct.id, {
        title,
        subtitle,
        price,
        originalPrice,
        badge,
        stockCount,
        description,
        primaryImage: {
          id: `${editingProduct.id}-img`,
          url: imageUrl || editingProduct.primaryImage.url,
          alt: title,
        },
      });
      showToast('Product updated successfully');
    } else {
      await api.addProduct({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        subtitle,
        category,
        price,
        originalPrice,
        badge,
        stockCount,
        inStock: stockCount > 0,
        imageUrl,
        description,
      });
      showToast('Product added to catalog');
    }

    setIsModalOpen(false);
    loadProducts();
  };

  return (
    <>
      <AdminHeader title="Product Catalog & Variants" />
      <main className="p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm uppercase text-on-surface font-bold text-base">
              Catalog Master List ({products.length} Products)
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Manage product titles, prices, stock quantities, and visual assets.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-wider font-bold shadow-sm hover:bg-primary/90 flex items-center gap-2 active:scale-95 transition-transform"
          >
            <Icon name="add" size={18} />
            <span>Add Product</span>
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-surface-container-lowest border border-outline-variant/20 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-xs">
              <thead>
                <tr className="bg-surface-container-low text-on-surface font-label-caps uppercase tracking-wider border-b border-outline-variant/20">
                  <th className="p-3 font-bold">Image</th>
                  <th className="p-3 font-bold">Product Title & Category</th>
                  <th className="p-3 font-bold">Price / MRP</th>
                  <th className="p-3 font-bold">Stock</th>
                  <th className="p-3 font-bold">Badge</th>
                  <th className="p-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3">
                      <div className="w-12 h-14 bg-surface-container relative shrink-0 overflow-hidden border border-outline-variant/20">
                        <FyndImage
                          src={p.primaryImage}
                          alt={p.title}
                          fallbackType="kit"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <h4 className="font-headline-sm uppercase text-xs text-on-surface font-bold">
                        {p.title}
                      </h4>
                      <span className="font-ticker-item uppercase text-on-surface-variant text-[10px]">
                        {p.department} • {p.club || 'General'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-price-current font-bold text-primary block">
                        {formatINR(p.price)}
                      </span>
                      {p.originalPrice && (
                        <span className="font-price-original text-on-surface-variant line-through text-[11px]">
                          {formatINR(p.originalPrice)}
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      <span
                        className={`font-label-caps text-xs font-bold ${
                          p.stockCount <= 5 ? 'text-error' : 'text-green-700'
                        }`}
                      >
                        {p.stockCount} in stock
                      </span>
                    </td>
                    <td className="p-3">
                      {p.badge && (
                        <span className="bg-surface-container-high px-2 py-0.5 font-ticker-item text-[10px] uppercase font-bold text-on-surface">
                          {p.badge}
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(p)}
                          className="px-2.5 py-1 bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface font-label-caps text-[10px] uppercase font-bold transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="px-2.5 py-1 bg-surface-container-high hover:bg-error hover:text-on-error text-error font-label-caps text-[10px] uppercase font-bold transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Product Form Modal (Add / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSave}
            className="w-full max-w-lg bg-surface p-6 border border-outline-variant/20 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto scrollbar-none"
          >
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
              <h3 className="font-headline-sm uppercase text-on-surface font-bold text-base">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-on-surface hover:text-primary transition-colors"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                  Product Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. ARSENAL 26/27 HOME KIT SAKA"
                  className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface"
                />
              </div>

              <div>
                <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                  Subtitle / Drop Specification
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Official Club Specification • Ultra-Breathable Micro-Piqué"
                  className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                    Department
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface"
                  >
                    <option value="football-jerseys">Football Kits</option>
                    <option value="sportswear">Sportswear & Tracksuits</option>
                    <option value="streetwear">Streetwear & Hoodies</option>
                    <option value="shoes">Sneakers & Footwear</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                    Badge Strip
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. DROP #01, -11% OFF"
                    className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                    Selling Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                    Original MRP (₹)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                    Total Inventory
                  </label>
                  <input
                    type="number"
                    value={stockCount}
                    onChange={(e) => setStockCount(Number(e.target.value))}
                    className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                  Primary Image URL (Leave blank to use default fallback)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://cdn.fynd.in/..."
                  className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm text-on-surface"
                />
              </div>

              <div>
                <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
                  Editorial Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm resize-none text-on-surface"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-surface-container-high text-on-surface font-label-caps text-xs uppercase tracking-wider font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-wider font-bold shadow-sm"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
