import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MediaAsset } from '@/types/media';

export interface CartItem {
  id: string; // Composite key: `${productId}-${size}`
  productId: string;
  slug: string;
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  size: string;
  quantity: number;
  image: MediaAsset;
}

interface CartStoreState {
  items: CartItem[];
  appliedCoupon: string | null;
  discountAmount: number;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set, get) => ({
      items: [
        // Seed default cart matching Stitch preview (2 items)
        {
          id: 'prod-rm-away-green-M',
          productId: 'prod-rm-away-green',
          slug: 'real-madrid-2026-27-away-kit-green-bellingham',
          title: 'Real Madrid 2026/27 Away Kit',
          subtitle: 'Green // Bellingham #5',
          price: 399.00,
          originalPrice: 449.00,
          size: 'M (UK/IN 40")',
          quantity: 1,
          image: {
            id: 'rm-away-1',
            url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeoj8g581L2gkYP3EknTCtr13jDySaTTdwQulUkwB2dhVnQTQJwsIDPRFO9huCBosT1gh6o7pbLuTNje1x-HtRACwLuTfr2JdFsUYtE9Zc7GLbAK28_8Jps7PE6DIy9pamUcfcf0z7BUjjt_4lUeqM9Bhk_TNsxEb4VENmT5VqTe-lOqYYqaSd0OfkDnaQOc_M0Lu3G5yZsDKJ4SXkOi4ScmJYJQsOnts_cixWf7VxtBl3y15SUQy-9w',
            alt: 'Real Madrid Away Kit',
          },
        },
      ],
      appliedCoupon: null,
      discountAmount: 0,

      addItem: (item) => {
        const id = `${item.productId}-${item.size}`;
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, id }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },

      updateQuantity: (id, delta) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartItem[],
        }));
      },

      applyCoupon: (code, discount) => {
        set({ appliedCoupon: code, discountAmount: discount });
      },

      removeCoupon: () => {
        set({ appliedCoupon: null, discountAmount: 0 });
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null, discountAmount: 0 });
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getTotal: () => {
        const sub = get().getSubtotal();
        const disc = get().discountAmount;
        return Math.max(0, sub - disc);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'fynd_cart_v1',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : ({} as Storage))),
    }
  )
);
