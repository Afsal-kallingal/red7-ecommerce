# Feature Spec: Admin Portal Structure & Operations

## Purpose
Provides store managers and fulfillment teams with a comprehensive administration interface for catalog management, variant stock control, order fulfillment, media asset replacement, homepage CMS banners, coupons, and customer analytics.

## UI Behavior & Sections (`/admin`)
1. **Overview Dashboard (`/admin`)**:
   - KPIs: Total Sales (₹), Active Orders, Items in Transit, Low Stock Alerts.
   - Quick action shortcuts.
2. **Product Catalog (`/admin/products`)**:
   - Product list with status pills (Live, Draft, Low Stock).
   - Add / Edit Product modal with:
     - Title, Slug, Subtitle, Price, Original MRP.
     - Category and Department selectors.
     - Variant stock inventory matrix (`S`, `M`, `L`, `XL`, `2XL`).
     - Image gallery manager (Reorder, set primary, delete).
3. **Orders Management (`/admin/orders`)**:
   - Filter by status (`PLACED`, `PACKED`, `TRANSIT`, `DELIVERED`, `CANCELLED`).
   - 1-click status update (e.g. mark packed, assign tracking AWB).
4. **Media Vault (`/admin/media`)**:
   - Upload new image assets, view CDN URLs, set fallback tags.
5. **Inventory Controller (`/admin/inventory`)**:
   - Quick stock editor across all kit sizes.
6. **Banners & CMS (`/admin/banners`)**:
   - Edit hero headline, drop tag, ticker messages, promotional banners.
7. **Coupons Engine (`/admin/coupons`)**:
   - Create and toggle active promotion codes.
8. **Reviews Moderation (`/admin/reviews`)**:
   - Approve, feature, or respond to buyer reviews.
