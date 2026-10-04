import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistState {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistIds: ['prod-rm-away-green'],

      toggleWishlist: (productId: string) => {
        const current = get().wishlistIds;
        const exists = current.includes(productId);
        if (exists) {
          set({ wishlistIds: current.filter((id) => id !== productId) });
          return false;
        } else {
          set({ wishlistIds: [...current, productId] });
          return true;
        }
      },

      isInWishlist: (productId: string) => {
        return get().wishlistIds.includes(productId);
      },
    }),
    {
      name: 'fynd_wishlist_v1',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : ({} as Storage))),
    }
  )
);
