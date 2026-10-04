# Feature Spec: Cart & Wishlist

## Purpose
Manages customer selections, bundle pricing discounts, coupon redemptions, and seamless transition to checkout.

## UI Behavior
- **Cart Drawer & Full Page (`/cart`)**:
  - Item listing: Kit thumbnail, title, size badge, unit price, quantity stepper, trash delete button.
  - Free Shipping Progress Bar: "Add ₹X more for Express Air Shipping" (or "Unlocked Free Express Air Shipping!").
  - Promo Coupon Box: Promo code input with `APPLY` button and suggestions (`BUY4GET1`, `MADRIDISTA`).
  - Bill Breakdown: Subtotal, Bag Discount, Delivery Fee (₹0 Free), Total Payable.
  - Sticky Checkout CTA: "Proceed to Checkout • ₹X".
  - Empty Cart State: "Your kit bag is empty" with "Explore 26/27 Drops" CTA button.
- **Wishlist Page (`/wishlist`)**:
  - Saved kits grid with 1-tap "Move to Bag" or "Remove".
  - Empty state encouraging exploration.

## Acceptance Criteria
- Persisted locally with `zustand/persist`.
- Instant updates without page reloads.
