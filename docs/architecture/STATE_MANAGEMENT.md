# State Management Architecture

## 1. Overview

FYND uses a pragmatic hybrid state architecture:
1. **Client UI & Local Persistence (Zustand)**:
   - `cartStore`: Cart items, quantity mutations, applied coupon, subtotal/tax/shipping computation, localStorage persistence (`fynd_cart_v1`).
   - `wishlistStore`: Favorited product IDs with fast set lookup and localStorage persistence (`fynd_wishlist_v1`).
   - `uiStore`: Mobile drawer open/close, search overlay, filter modal, pincode memory, active toast messages.
2. **Server Cache & Async Data (TanStack Query v5)**:
   - Queries: Catalog listing with filters, product detail by slug, customer orders, coupons, reviews.
   - Mutations: Order submission, PIN code verification, review submission, admin CRUD operations with automatic cache invalidation.
3. **Form State (React Hook Form + Zod)**:
   - Typed schema validation for Checkout (Indian Address, PIN code, Mobile, UPI ID), Admin Product Creation, Coupon Creation, and Contact forms.

---

## 2. Cart Store State Model

```typescript
export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  title: string;
  subtitle?: string;
  price: number;
  originalPrice?: number;
  size: string;
  quantity: number;
  image: string;
}

export interface CartStore {
  items: CartItem[];
  appliedCoupon: string | null;
  discountAmount: number;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}
```

---

## 3. Mock Adapter Interface

Every network interaction routes through typed repository interfaces (e.g., `ProductRepository`, `OrderRepository`, `CheckoutRepository`).
During this frontend-only deployment phase, the active implementation is `MockProductRepository`, which serves from an in-memory database with localStorage sync for admin updates.
When FastAPI is ready, switching `USE_MOCK_API=false` in `.env` re-routes all calls to `FastApiProductRepository` with zero alterations to React presentation components.
