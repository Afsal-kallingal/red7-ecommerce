import { create } from 'zustand';

interface ToastState {
  id: string;
  message: string;
  actionText?: string;
  actionUrl?: string;
}

interface UIStoreState {
  isSideDrawerOpen: boolean;
  isSearchModalOpen: boolean;
  isFilterSheetOpen: boolean;
  isSizeModalOpen: boolean;
  activeToast: ToastState | null;

  openSideDrawer: () => void;
  closeSideDrawer: () => void;
  toggleSideDrawer: () => void;

  openSearchModal: () => void;
  closeSearchModal: () => void;

  openFilterSheet: () => void;
  closeFilterSheet: () => void;

  openSizeModal: () => void;
  closeSizeModal: () => void;

  showToast: (message: string, actionText?: string, actionUrl?: string) => void;
  hideToast: () => void;
}

export const useUIStore = create<UIStoreState>((set) => ({
  isSideDrawerOpen: false,
  isSearchModalOpen: false,
  isFilterSheetOpen: false,
  isSizeModalOpen: false,
  activeToast: null,

  openSideDrawer: () => set({ isSideDrawerOpen: true }),
  closeSideDrawer: () => set({ isSideDrawerOpen: false }),
  toggleSideDrawer: () => set((s) => ({ isSideDrawerOpen: !s.isSideDrawerOpen })),

  openSearchModal: () => set({ isSearchModalOpen: true }),
  closeSearchModal: () => set({ isSearchModalOpen: false }),

  openFilterSheet: () => set({ isFilterSheetOpen: true }),
  closeFilterSheet: () => set({ isFilterSheetOpen: false }),

  openSizeModal: () => set({ isSizeModalOpen: true }),
  closeSizeModal: () => set({ isSizeModalOpen: false }),

  showToast: (message: string, actionText?: string, actionUrl?: string) => {
    const id = Date.now().toString();
    set({ activeToast: { id, message, actionText, actionUrl } });
    setTimeout(() => {
      set((s) => (s.activeToast?.id === id ? { activeToast: null } : s));
    }, 2800);
  },

  hideToast: () => set({ activeToast: null }),
}));
