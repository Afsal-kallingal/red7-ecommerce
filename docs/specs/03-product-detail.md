# Feature Spec: Product Details (PDP)

## Purpose
The high-conversion product showcase where customers examine high-resolution media, inspect authentic details, select sizes, check delivery schedules for their Indian PIN code, and trigger instant Buy Now or Add to Bag.

## UI Behavior
- **Header**: Back arrow navigation, Product Detail title, Bag counter icon with badge.
- **Marquee Promo**: `LIMITED DROP // 26/27 OFFICIAL REPLICA • PAN-INDIA EXPRESS SHIPPING 48H • CODE "MADRIDISTA"`.
- **Breadcrumbs**: e.g., `La Liga / Real Madrid / Away Kit 26/27` + `DROP VERIFIED` badge.
- **Image Gallery**:
  - 4:5 main viewport with smooth slide indicators and numerical counter (`1 / 4`).
  - Zoom / Fullscreen overlay.
  - 4-column thumbnail preview grid with active border state.
- **Product Title & Social Proof**:
  - Star ratings (`4.9` with 128 verified ratings anchor link).
  - Title and subtitle in brand typography.
  - Pricing lockup: `₹ 399.00` with strike-through `₹ 449.00` and `SAVE ₹50 (11% OFF)` badge.
  - Tax and insurance disclosure.
- **Urgency Stock Banner**: `Only 4 Kits left in Size M • Batch #RM-26-AUG`.
- **Size Selector**:
  - Chest inches indicators: `S (38")`, `M (40")`, `L (42")`, `XL (44")`, `2XL (46")`.
  - Interactive Size Guide modal trigger with full measurements chart.
- **Quantity Stepper**: `[-] 1 [+]` up to available inventory limit.
- **Indian PIN Code Checker**:
  - Input for 6-digit Indian postal code.
  - Returns delivery timeline (e.g. `Free Express Delivery by Thursday, 3:00 PM • COD Available`).
- **Product Specs Accordions**:
  - Product Description & Specs (Material, Fit, Badges, Print).
  - Shipping & Free 7-Day Doorstep Returns.
  - Wash & Garment Care Instructions.
- **Sticky Bottom Action Bar**:
  - Wishlist heart button.
  - "Add To Bag" secondary CTA.
  - "Buy Now • ₹399" primary high-contrast CTA with arrow icon.
  - Animated toast feedback upon bag addition.

## API Dependency
- `GET /products/{slug}`
- `GET /logistics/pincode/{pincode}`
- `POST /cart` / `POST /wishlist/toggle`

## Acceptance Criteria
- Exact reproduction of Stitch Product Detail screen.
- Sizing state, quantity, and pincode states update reactively.
