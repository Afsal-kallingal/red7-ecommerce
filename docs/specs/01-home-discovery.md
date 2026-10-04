# Feature Spec: Home & Discovery Page

## Purpose
The primary storefront entry point designed to convert terrace culture enthusiasts, showcasing drops, curated departments, trending kits, bundle offers, and verified buyer proof.

## UI Behavior
- **Fixed Header**: Brand logo "FYND", hamburger menu toggle (opens side drawer), live search trigger, shopping bag with dynamic badge counter, user avatar.
- **Promo Ticker**: Continuous horizontal marquee strip with coupon teasers (`BUY4GET150-OFF`, `BUY5GETFREERANDOMKIT`, `BUY2GET1FREE`).
- **Hero Drop Showcase**: Large 4:5 editorial imagery, drop badge (`DROP 26 // LIVE NOW`), headline `FIND YOUR STYLE. NEW DROP '26`, double CTA buttons (`SHOP NOW`, `EXPLORE KITS`).
- **Department Grid**: 2-column visual grid for Football Kits, Sportswear, Streetwear, Sneakers with hover scale effects.
- **26/27 Season Kits Grid**: 2-column product grid with badges (`DROP #01`, `-11% OFF`, `PLAYER VER.`), price, wishlist heart micro-interaction.
- **Flash Sale Banner**: Dark green container with gold badge (`LIMITED FLASH DROP - GET 3 JERSEYS FOR ₹999`).
- **Trust Strip**: 4-column / 2x2 grid highlighting 100% Premium Replica, Fast Express Shipping, 7-Day Free Exchange, Secure UPI/COD.
- **Review Carousel**: Snap-scroll horizontal cards with verified buyer tags and 5-star ratings.
- **Drop Radar (Newsletter)**: Email capture form for restock and drop alerts.
- **Editorial Brand Footer**: Brand summary, discovery links, client service links, copyright.
- **Floating WhatsApp Concierge**: Fixed bottom-right green bubble with pre-filled support text.
- **Bottom Navigation Bar**: Fixed bottom bar with Home, Shop, Cart (with badge), Account.

## API Dependency
- `GET /products?featured=true&limit=8`
- `GET /categories`
- `GET /reviews?limit=4`
- `GET /admin/homepage-cms`

## Data Structure
- `Product[]`, `Category[]`, `Review[]`, `BannerContent`

## Loading, Empty, and Error States
- **Loading**: Skeleton cards for hero, department grid, and kit cards.
- **Empty**: Fallback featured banners.
- **Error**: Graceful fallback to cached mock data with offline alert.

## Acceptance Criteria
- Matches Stitch Discovery Home screen visual spec 1:1.
- Fully responsive on mobile (320px+), tablet, and desktop.
- Touch scroll feels native and smooth.
