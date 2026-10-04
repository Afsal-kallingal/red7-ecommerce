# Design System Tokens & Stitch Spec

Extracted directly from Stitch Project `13633786757686588013` (FYND Storefront & Checkout Screens).

## 1. Color Palette

| Token Name | Hex Code | Purpose |
|------------|----------|---------|
| `primary` | `#032517` | Deep terrace green, brand core, buttons, active states |
| `primary-container` | `#1b3b2b` | Rich dark green container, drop tickers, status pills |
| `on-primary` | `#ffffff` | Primary button text & icons |
| `on-primary-container` | `#83a590` | Muted contrast green text |
| `surface` | `#fcf9f8` | Warm off-white background |
| `surface-container-low` | `#f6f3f2` | Subtle section background, soft card back |
| `surface-container` | `#f0eded` | Intermediate paneling |
| `surface-container-high` | `#eae7e7` | Badge background, urgency notification banners |
| `surface-container-highest` | `#e5e2e1` | Marquee ticker strip, active tab pill |
| `surface-container-lowest` | `#ffffff` | Pure white cards, popups, sheets |
| `on-surface` | `#1c1b1b` | Deep crisp black headline and body text |
| `on-surface-variant` | `#424843` | Charcoal secondary text, subtitles, breadcrumbs |
| `tertiary-fixed` | `#ffdf9b` | Gold terrace accent, flash drop tags, badges |
| `on-tertiary-fixed` | `#251a00` | Dark text on gold accent badges |
| `tertiary-fixed-dim` | `#e2c381` | Warm amber star ratings |
| `error` | `#ba1a1a` | Discount badge, urgent countdown, error text |
| `error-container` | `#ffdad6` | Soft red highlight pills |
| `outline` | `#727973` | Subtle borders, input placeholders |
| `outline-variant` | `#c1c8c2` | Divider rules, carousel dots |

---

## 2. Typography

FYND combines an athletic terrace display typography with ultra-legible modern data fonts:

- **Display & Headlines**: `Barlow Condensed` (Weights: 600, 700, 800)
  - `font-display`: 3rem (48px), 800 weight, 0.04em letter-spacing, uppercase.
  - `font-headline-lg`: 2rem (32px), 700 weight, 0.02em letter-spacing, uppercase.
  - `font-headline-lg-mobile`: 1.625rem (26px), 700 weight, 0.02em letter-spacing, uppercase.
  - `font-headline-md`: 1.25rem (20px), 700 weight, 0.03em letter-spacing, uppercase.
  - `font-headline-sm`: 1.0625rem (17px), 600 weight, 0.02em letter-spacing, uppercase.
  - `font-ticker-item`: 0.75rem (12px), 700 weight, 0.06em letter-spacing, uppercase.
  - `font-label-caps`: 0.8125rem (13px), 700 weight, 0.08em letter-spacing, uppercase.

- **Body & Pricing**: `Inter` (Weights: 400, 500, 600, 700)
  - `font-body-lg`: 1rem (16px), 400 weight, 1.5rem line-height.
  - `font-body-md`: 0.875rem (14px), 400 weight, 1.25rem line-height.
  - `font-body-sm`: 0.75rem (12px), 400 weight, 1rem line-height.
  - `font-price-current`: 0.875rem (14px) / 1rem (16px), 700 weight (Bold).
  - `font-price-original`: 0.75rem (12px), 400 weight, strike-through.

---

## 3. Spacing & Grid System

- `space-xs`: `0.25rem` (4px)
- `space-sm`: `0.5rem` (8px)
- `space-md`: `0.75rem` (12px)
- `space-lg`: `1.25rem` (20px)
- `space-xl`: `2rem` (32px)
- `gutter`: `0.5rem` (8px)
- `margin`: `0.75rem` (12px mobile padding)
- `margin-desktop`: `2rem` (32px desktop padding)

---

## 4. Radii & Shape Rules

- Border radius is sharp and athletic (`rounded-[0.25rem]` or `rounded-none`), reflecting terrace culture brutalist streetwear aesthetic.
- Pills and circular buttons (avatars, dots) use `rounded-full`.
