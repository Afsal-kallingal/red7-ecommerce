import { Product, Category } from '@/types/product';
import { Order } from '@/types/order';
import { ReviewItem, CouponItem, FAQItem, HomepageCms } from '@/types/cms';
import { buildMediaAsset } from '@/lib/images';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-jerseys',
    slug: 'football-jerseys',
    name: 'Football Kits',
    tagline: '26/27 Official Matchday Releases',
    itemCount: 85,
    featured: true,
    image: buildMediaAsset(
      'cat-img-1',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDarJI5YlTlaBXuBPWj36ieo7gKANev0uL05Min-INgJH8n39KPrafz2EgZfrsw3XkbXgSKEykrP2AxD4YlLACj8PLUWVvISrUvRNnzAMEnJ8d3tPiat2bwwAy8dRHzSUTEhNKFrbKAY4byB-WdYQcSCopE79NqnvbJ1AdHlqnXmyQicAcB2VwBWlViQVppArJK6JNUyQihH7La6D7bvzIR1wQngy4bRV_gBR5pzXkg3YY4sfQWH3l--g',
      'Football Kits'
    ),
  },
  {
    id: 'cat-sportswear',
    slug: 'sportswear',
    name: 'Sportswear',
    tagline: 'Tracksuits & Pre-match Apparel',
    itemCount: 42,
    featured: true,
    image: buildMediaAsset(
      'cat-img-2',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCv_Df7CezkFDDKfr2ZYMlwVQzpSJ9iDgT77oMnr7-fO6EyrBatdFZzScMEshOFqs-hVZ8T1ce8WbouzMzckBWhsYrpegmNDK8HOvWOuF3Sxv0R0IriMlMLQzoSSWpyqY6BDq9tchqqKRAQkEq0WPwfJphQRh9g5dDqjkiy1VtNGzaMy5x5mGIB8LgM4RIvx9ta47Dt_Tifcq_M1DOC_oXCnurcHLsxLgTTUKFolNra59F_jx6xDWr9Cw',
      'Sportswear'
    ),
  },
  {
    id: 'cat-streetwear',
    slug: 'streetwear',
    name: 'Streetwear',
    tagline: 'Boxy Hoodies & Drop Shoulder Silhouettes',
    itemCount: 38,
    featured: true,
    image: buildMediaAsset(
      'cat-img-3',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlgiOilnk5ckeu4hbDSXnMm5DKSE_c0TDpA9wjSJLBpzHMS5z69eCjGupB_VTMUKeEwU-XyOaNJzCrHRBpz7oihkCexvjA_26TrBT5MY6H2MH3Bw7Gb1iboO64d4jVBGZBl2cRVN6oGovbausx3fBRactg2TSsJADrMxiy6o30AyV9vvHk4BG_q-Uw5nYhTXytR-K2TCKIe-7e5LRhLK1-m3PQbOYsZICp5az_SwU41iBgQDrsadGKKQ',
      'Streetwear'
    ),
  },
  {
    id: 'cat-sneakers',
    slug: 'shoes',
    name: 'Sneakers & Shoes',
    tagline: 'Terrace Classics & Matchday Footwear',
    itemCount: 29,
    featured: true,
    image: buildMediaAsset(
      'cat-img-4',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4SzISe7LuI36sYZlC3ajcWUJlDWIF83ujnCNiUdnhRsmQ1i8N-p6ArH3bDFOjRbYWfTXWikEgIDEGqKwDJnzR4eLbCRciAz_VlRqayA4ezJh_ZqTpODwkI6x37kVxxURXFmd-XdXfS5-P5S2D72C1nPLmuFZj3c43UD3tLe80mnmUKAkGEsYCgJDD2WFEv6RyldKJqiW2zluNGrcPggjNAQPN_93xvAAC2Redyrt6Ux-2dzw226gOQg',
      'Sneakers'
    ),
  },
  {
    id: 'cat-accessories',
    slug: 'accessories',
    name: 'Accessories',
    tagline: 'Club Scarves, Socks & Stadium Bags',
    itemCount: 19,
    featured: false,
    image: buildMediaAsset('cat-img-5', '', 'Accessories'),
  },
  {
    id: 'cat-gadgets',
    slug: 'gadgets',
    name: 'Gadgets',
    tagline: 'Supporter Gear & Tech',
    itemCount: 14,
    featured: false,
    image: buildMediaAsset('cat-img-6', '', 'Gadgets'),
  },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-ac-milan-07-08-home',
    slug: 'ac-milan-07-08-home-fan-edition',
    title: 'AC Milan 07/08 Home (Fan Edition)',
    shortTitle: 'AC Milan 07/08 Home',
    subtitle: 'Classic Bwin Sponsor • High-Density Embroidered Rossoneri Crest',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'AC Milan',
    league: 'Serie A',
    price: 459.00,
    originalPrice: 499.00,
    badge: 'FAN EDITION',
    dropTag: 'DROP #07',
    inStock: true,
    stockCount: 18,
    rating: 4.96,
    reviewsCount: 142,
    primaryImage: buildMediaAsset(
      'ac-milan-home-model',
      '/images/red7/ac-milan-home-model.jpg',
      'AC Milan 07/08 Home Fan Edition'
    ),
    gallery: [
      buildMediaAsset('ac-milan-home-model', '/images/red7/ac-milan-home-model.jpg', 'AC Milan 07/08 Home Fan Edition'),
      buildMediaAsset('ac-milan-home-flatlay', '/images/red7/ac-milan-home-flatlay.jpg', 'AC Milan Home Flatlay'),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 4 },
      { size: 'M', label: '40"', inStock: true, stock: 8 },
      { size: 'L', label: '42"', inStock: true, stock: 12 },
      { size: 'XL', label: '44"', inStock: true, stock: 5 },
      { size: '2XL', label: '46"', inStock: true, stock: 2 },
    ],
    specs: {
      material: '100% Breathable Micro-Poly',
      fit: 'Relaxed Streetwear / Terrace Fit',
      badges: 'Gold Star & Embroidered ACM Crest',
      print: 'Bwin Vintage Felt Finish',
    },
    description: 'Iconic AC Milan 2007/08 Home kit with legendary bwin sponsor. Made for football heritage lovers and terrace lifestyle outfits.',
    featured: true,
    isNewArrival: true,
  },
  {
    id: 'prod-ac-milan-2007-ucl-white',
    slug: 'ac-milan-2007-final-ucl-embroidery',
    title: 'AC Milan 2007 Final – UCL (Embroidery)',
    shortTitle: 'AC Milan 2007 UCL Final',
    subtitle: 'Athens 2007 Final Matchday Embroidery • Premium Rossoneri Away Blanco',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'AC Milan',
    league: 'Serie A',
    price: 439.00,
    originalPrice: 479.00,
    badge: 'UCL FINAL',
    dropTag: 'DROP #07',
    inStock: true,
    stockCount: 12,
    rating: 4.98,
    reviewsCount: 184,
    primaryImage: buildMediaAsset(
      'ac-milan-white-model',
      '/images/red7/ac-milan-white-model.jpg',
      'AC Milan 2007 Final UCL Embroidery'
    ),
    gallery: [
      buildMediaAsset('ac-milan-white-model', '/images/red7/ac-milan-white-model.jpg', 'AC Milan 2007 Final UCL'),
      buildMediaAsset('ac-milan-away-flatlay', '/images/red7/ac-milan-away-flatlay.jpg', 'AC Milan Away Kit'),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 3 },
      { size: 'M', label: '40"', inStock: true, stock: 7 },
      { size: 'L', label: '42"', inStock: true, stock: 9 },
      { size: 'XL', label: '44"', inStock: true, stock: 4 },
      { size: '2XL', label: '46"', inStock: true, stock: 2 },
    ],
    specs: {
      material: 'Climacool Jacquard Texture',
      fit: 'Athletic Tailored Silhouette',
      badges: 'UEFA Champions League 7-Times Patch',
      print: 'Athens 23 May 2007 Commemorative Gold Stitch',
    },
    description: 'The legendary lucky white kit from the Athens 2007 UEFA Champions League final triumph.',
    featured: true,
    isNewArrival: true,
  },
  {
    id: 'prod-ac-milan-26-27-away-pulisic',
    slug: 'ac-milan-2026-27-away-kit-pulisic',
    title: 'AC MILAN 2026/27 AWAY KIT PULISIC',
    shortTitle: 'AC Milan Away Pulisic',
    subtitle: 'Official Club Away Edition • Fly Emirates Monochrome Red Detailing',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'AC Milan',
    league: 'Serie A',
    price: 399.00,
    originalPrice: 449.00,
    badge: '26/27 AWAY',
    dropTag: 'DROP #07',
    inStock: true,
    stockCount: 9,
    rating: 4.89,
    reviewsCount: 76,
    primaryImage: buildMediaAsset(
      'ac-milan-away-flatlay',
      '/images/red7/ac-milan-away-flatlay.jpg',
      'AC Milan 2026/27 Away Kit Pulisic'
    ),
    gallery: [
      buildMediaAsset('ac-milan-away-flatlay', '/images/red7/ac-milan-away-flatlay.jpg', 'AC Milan 2026/27 Away Kit'),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 5 },
      { size: 'M', label: '40"', inStock: true, stock: 6 },
      { size: 'L', label: '42"', inStock: true, stock: 11 },
      { size: 'XL', label: '44"', inStock: true, stock: 5 },
      { size: '2XL', label: '46"', inStock: true, stock: 3 },
    ],
    specs: {
      material: 'DryCELL Ultra-Breathable Poly',
      fit: 'Standard Terrace Match Cut',
      badges: 'Silicone High-Density Crest',
      print: 'Pulisic #11 Official Serie A Typography',
    },
    description: 'AC Milan 2026/27 Away kit honouring dynamic winger Christian Pulisic in pure crisp white with red piping.',
    featured: true,
  },
  {
    id: 'prod-ac-milan-26-27-home',
    slug: 'ac-milan-2026-27-home-kit',
    title: 'AC MILAN 2026/27 HOME KIT',
    shortTitle: 'AC Milan 26/27 Home',
    subtitle: 'Rossoneri Heritage Stripes • Modern V-Collar Construction',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'AC Milan',
    league: 'Serie A',
    price: 399.00,
    originalPrice: 449.00,
    dropTag: 'DROP #07',
    inStock: true,
    stockCount: 14,
    rating: 4.92,
    reviewsCount: 115,
    primaryImage: buildMediaAsset(
      'ac-milan-home-flatlay',
      '/images/red7/ac-milan-home-flatlay.jpg',
      'AC Milan 2026/27 Home Kit'
    ),
    gallery: [
      buildMediaAsset('ac-milan-home-flatlay', '/images/red7/ac-milan-home-flatlay.jpg', 'AC Milan Home Kit'),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 6 },
      { size: 'M', label: '40"', inStock: true, stock: 9 },
      { size: 'L', label: '42"', inStock: true, stock: 14 },
      { size: 'XL', label: '44"', inStock: true, stock: 7 },
      { size: '2XL', label: '46"', inStock: true, stock: 4 },
    ],
    specs: {
      material: 'DryCELL Lightweight Jacquard',
      fit: 'Tailored Match Cut',
      badges: 'Embroidered Club Crest with Gold Star',
      print: 'Emirates Fly Better Heat Sealed',
    },
    description: 'The legendary red and black stripes of the San Siro return for the 2026/27 season with modern athletic engineering.',
    featured: true,
  },
  {
    id: 'prod-argentina-messi-oversized',
    slug: 'argentina-messi-special-classic-edition-oversized',
    title: 'ARGENTINA MESSI SPECIAL CLASSIC EDITION OVERSIZED',
    shortTitle: 'Argentina Messi Oversized',
    subtitle: 'Classic Sky & White Striped Retro Cut • Heavyweight Cotton Blend',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'Argentina',
    league: 'International',
    price: 489.00,
    originalPrice: 589.00,
    discountPercent: 17,
    badge: 'SPECIAL',
    dropTag: 'DROP #07',
    inStock: true,
    stockCount: 8,
    rating: 4.99,
    reviewsCount: 230,
    primaryImage: buildMediaAsset(
      'arg-messi-front',
      '/images/red7/argentina-messi-front.jpg',
      'Argentina Messi Special Classic Edition Oversized'
    ),
    gallery: [
      buildMediaAsset('arg-messi-front', '/images/red7/argentina-messi-front.jpg', 'Argentina Messi Front'),
      buildMediaAsset('arg-messi-back', '/images/red7/argentina-messi-back.jpg', 'Argentina Messi 10 Back'),
    ],
    sizes: [
      { size: 'S', label: '40" (Oversized)', inStock: true, stock: 4 },
      { size: 'M', label: '42" (Oversized)', inStock: true, stock: 6 },
      { size: 'L', label: '44" (Oversized)', inStock: true, stock: 8 },
      { size: 'XL', label: '46" (Oversized)', inStock: true, stock: 5 },
      { size: '2XL', label: '48" (Oversized)', inStock: true, stock: 2 },
    ],
    specs: {
      material: 'Premium Boxy Interlock Weave',
      fit: 'Baggy Streetwear Box Fit',
      badges: 'Embroidered 3-Star AFA Crest',
      print: 'Maradona & Messi 10 Tribute Detailing',
    },
    description: 'Commemorating legendary Argentine football heritage with an oversized boxy streetwear silhouette in pristine Albiceleste stripes.',
    featured: true,
    isNewArrival: true,
  },
  {
    id: 'prod-argentina-messi-last-game',
    slug: 'argentina-messi-special-edition-kit-last-game',
    title: 'ARGENTINA MESSI SPECIAL EDITION KIT LAST GAME',
    shortTitle: 'Argentina Messi Last Game',
    subtitle: 'Official World Champion Gold 10 • Celestial Blue Jacquard Fabric',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'Argentina',
    league: 'International',
    price: 399.00,
    originalPrice: 439.00,
    discountPercent: 9,
    badge: 'SPECIAL',
    dropTag: 'DROP #07',
    inStock: true,
    stockCount: 11,
    rating: 4.97,
    reviewsCount: 198,
    primaryImage: buildMediaAsset(
      'arg-messi-back',
      '/images/red7/argentina-messi-back.jpg',
      'Argentina Messi Special Edition Kit Last Game'
    ),
    gallery: [
      buildMediaAsset('arg-messi-back', '/images/red7/argentina-messi-back.jpg', 'Messi 10 Gold Back'),
      buildMediaAsset('arg-messi-front', '/images/red7/argentina-messi-front.jpg', 'Argentina Front'),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 5 },
      { size: 'M', label: '40"', inStock: true, stock: 7 },
      { size: 'L', label: '42"', inStock: true, stock: 12 },
      { size: 'XL', label: '44"', inStock: true, stock: 4 },
      { size: '2XL', label: '46"', inStock: true, stock: 3 },
    ],
    specs: {
      material: 'Heat.RDY Ventilated Polyester',
      fit: 'Tailored Match Cut',
      badges: 'Gold FIFA World Champions Shield & 3 Stars',
      print: 'Official Gold MESSI 10 Typography',
    },
    description: 'The immortal number 10 edition representing Leo Messi with iridescent golden numbering and World Champions detailing.',
    featured: true,
    isNewArrival: true,
  },
  {
    id: 'prod-retro-42-arcade',
    slug: 'retro-42-arcade-terrace-streetwear-jersey',
    title: 'RETRO #42 ARCADE TERRACE STREETWEAR JERSEY',
    shortTitle: 'Retro 42 Jersey',
    subtitle: 'Waffle-Knit Heavyweight Cotton • Nostalgic Script Typography',
    category: 'streetwear',
    department: 'Streetwear',
    club: 'Terrace Originals',
    league: 'Archive',
    price: 459.00,
    originalPrice: 499.00,
    badge: 'TERRACE',
    dropTag: 'DROP #07',
    inStock: true,
    stockCount: 15,
    rating: 4.93,
    reviewsCount: 88,
    primaryImage: buildMediaAsset(
      'retro-42-back',
      '/images/red7/lifestyle-blue-42.jpg',
      'Retro #42 Arcade Terrace Streetwear Jersey'
    ),
    gallery: [
      buildMediaAsset('retro-42-back', '/images/red7/lifestyle-blue-42.jpg', 'Retro 42 Jersey Back'),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 3 },
      { size: 'M', label: '40"', inStock: true, stock: 6 },
      { size: 'L', label: '42"', inStock: true, stock: 8 },
      { size: 'XL', label: '44"', inStock: true, stock: 4 },
    ],
    specs: {
      material: '100% Waffle Heavyweight Cotton 240 GSM',
      fit: 'Boxy Drop Shoulder Streetwear Fit',
      badges: 'Striped Ribbed Collar and Cuffs',
      print: 'Distressed Vintage Arcade 42 Print',
    },
    description: 'Archive piece engineered for the contemporary streetwear rotation with authentic retro pitch heritage.',
    featured: true,
    isNewArrival: true,
  },
  {
    id: 'prod-rm-away-green',
    slug: 'real-madrid-2026-27-away-kit-green-bellingham',
    title: 'REAL MADRID 2026/27 AWAY KIT GREEN BELLINGHAM #5',
    shortTitle: 'Real Madrid Away Bellingham',
    subtitle: 'Official Club Specification • Ultra-Breathable Aeroready Micro-Piqué',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'Real Madrid',
    league: 'La Liga',
    price: 399.00,
    originalPrice: 449.00,
    discountPercent: 11,
    badge: '-11% OFF',
    dropTag: 'DROP #01',
    inStock: true,
    stockCount: 4,
    rating: 4.9,
    reviewsCount: 128,
    primaryImage: buildMediaAsset(
      'rm-away-1',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeoj8g581L2gkYP3EknTCtr13jDySaTTdwQulUkwB2dhVnQTQJwsIDPRFO9huCBosT1gh6o7pbLuTNje1x-HtRACwLuTfr2JdFsUYtE9Zc7GLbAK28_8Jps7PE6DIy9pamUcfcf0z7BUjjt_4lUeqM9Bhk_TNsxEb4VENmT5VqTe-lOqYYqaSd0OfkDnaQOc_M0Lu3G5yZsDKJ4SXkOi4ScmJYJQsOnts_cixWf7VxtBl3y15SUQy-9w',
      'Real Madrid 2026/27 Away Kit Green Bellingham',
      true
    ),
    gallery: [
      buildMediaAsset(
        'rm-away-1',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAeoj8g581L2gkYP3EknTCtr13jDySaTTdwQulUkwB2dhVnQTQJwsIDPRFO9huCBosT1gh6o7pbLuTNje1x-HtRACwLuTfr2JdFsUYtE9Zc7GLbAK28_8Jps7PE6DIy9pamUcfcf0z7BUjjt_4lUeqM9Bhk_TNsxEb4VENmT5VqTe-lOqYYqaSd0OfkDnaQOc_M0Lu3G5yZsDKJ4SXkOi4ScmJYJQsOnts_cixWf7VxtBl3y15SUQy-9w',
        'Real Madrid Away Kit Front'
      ),
      buildMediaAsset(
        'rm-away-2',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAKt7WxypxD-eZKOlDMwdJAB1LQ1OKY9Xvjvw6lA9xBvj5io7mwIk53aVcicmOSIIV7vyQw6pUEg0yiwFauMfFsdGnQ2Ly7iiIXBHgZ-dLzU_iphv6F5Wzn71wm_FePyPZzzP7qVqJjcnH1B37z_DK6a3DcRzq0m9_jM40mSb0C-Qc3giWfoBd2e84eculr2LVtv6oou1qA11MXoFZOjUaehbJ3OHKwEn9PcSss0NaKvCu6PusYeJbmgA',
        'Real Madrid Away Kit Back Bellingham 5'
      ),
      buildMediaAsset(
        'rm-away-3',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCzqt7PK9uwVVHzwUqSsQm1ya_mYFisIuT4QYksMWdyUyMjg5ZDjGtO_Mgc5fanrI1X5uvIr-II9gwvKhKn_-Gs3OkvXM9UK7YYWFClKU-2FA1A-951B0S1VpMiiL3hWlcMmK-TnxPW2n-JC3NfKT01Wz70mdmIq1w5rTO8j5k6IjUlKBYzPEw1367HDmisdT3DTTVUoX5DuZHyY3LA9kcRHiiTugxoqmZVO7pgPz29UmQf2T8sK27qAA',
        'Real Madrid Badge Macro Detail'
      ),
      buildMediaAsset(
        'rm-away-4',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAWn7NBY68OTGYzxNR3Cm8d4vA76ODTImIFvYIuy99067fCV38gysMcpoiVkjKiTJiAlFjZvLO5od1_HVvgyNJucMPCaFl2EbRSp4zGzV5DGwagSz2gsJbl2Kby7IOcmMEmAOSMKl7OxMcrZFiLqwzxn_lXGQgg-rYbChE94Mmv_SgNSE4aTzsArmACf6nRluVek3et4KifMEnw5_64T4Gz1etAyDxVNd6OrzFZV_JKblaLblZ8xW3uog',
        'Real Madrid Kit Streetwear Lookbook'
      ),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 8 },
      { size: 'M', label: '40"', inStock: true, stock: 4 },
      { size: 'L', label: '42"', inStock: true, stock: 12 },
      { size: 'XL', label: '44"', inStock: true, stock: 6 },
      { size: '2XL', label: '46"', inStock: true, stock: 2 },
    ],
    specs: {
      material: '100% Recycled Aeroready Poly',
      fit: 'Tailored Athletic Drop Cut',
      badges: 'High-Density Heat-Transfer Crest',
      print: 'Bellingham #5 Official Typography',
      origin: 'Imported Player Grade Fabric',
      weight: '160 GSM Ultra-Light',
    },
    description:
      'Celebrate Jude Bellingham’s commanding presence with the 2026/27 Real Madrid Away Kit. Rendered in a deep, distinguished emerald racing green with laser-cut ventilation micro-ribbing, this piece bridges high-fashion terrace tailoring with match-ready athletic output.',
    featured: true,
    isNewArrival: true,
  },
  {
    id: 'prod-barca-away-yamal',
    slug: 'barcelona-2026-27-away-lamine-yamal',
    title: 'BARCELONA 2026/27 AWAY LAMINE YAMAL #19',
    shortTitle: 'Barcelona Away Yamal',
    subtitle: 'Stealth Noir Edition • Gold Gradient Sponsor & Crest Detailing',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'Barcelona',
    league: 'La Liga',
    price: 399.00,
    originalPrice: 499.00,
    discountPercent: 20,
    badge: 'DROP #01',
    dropTag: 'DROP #01',
    inStock: true,
    stockCount: 14,
    rating: 4.95,
    reviewsCount: 164,
    primaryImage: buildMediaAsset(
      'barca-away-1',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqQlC6nCLVcuiS03QsYDtB551Oqq6njxeJmmU63NAzLxVxIjSnZ-3XO6Vdm-ZXxzRJt1GZFka0dmOAFQAWn0rG1eetFCf0muWNz3Ds8bDNFGbOmXqBPPculPWjB43UX5RAdt2tYPAZ1BGOCxLNDDU5glEMgTo0IThVv2VNMoWbDxTA6k3NOmUfobHDFS2b1BNxW9bFyh_trfL82HydIl08PJJ6nfrOCxGRpwhN41eTixtaoLeYzkX-iA',
      'Barcelona 2026/27 Away Lamine Yamal'
    ),
    gallery: [
      buildMediaAsset(
        'barca-away-1',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAqQlC6nCLVcuiS03QsYDtB551Oqq6njxeJmmU63NAzLxVxIjSnZ-3XO6Vdm-ZXxzRJt1GZFka0dmOAFQAWn0rG1eetFCf0muWNz3Ds8bDNFGbOmXqBPPculPWjB43UX5RAdt2tYPAZ1BGOCxLNDDU5glEMgTo0IThVv2VNMoWbDxTA6k3NOmUfobHDFS2b1BNxW9bFyh_trfL82HydIl08PJJ6nfrOCxGRpwhN41eTixtaoLeYzkX-iA',
        'Barcelona 2026/27 Away Lamine Yamal'
      ),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 5 },
      { size: 'M', label: '40"', inStock: true, stock: 8 },
      { size: 'L', label: '42"', inStock: true, stock: 10 },
      { size: 'XL', label: '44"', inStock: true, stock: 4 },
      { size: '2XL', label: '46"', inStock: true, stock: 3 },
    ],
    specs: {
      material: 'Dri-FIT ADV Textured Weave',
      fit: 'Modern Slim Athletic Cut',
      badges: 'Heat-Pressed Iridescent Silicone Crest',
      print: 'Lamine Yamal #19 Official Font',
    },
    description:
      'Official FC Barcelona 26/27 away kit honouring sensation Lamine Yamal. Built with lightweight breathable jacquard construction and gold Spotify emblem.',
    featured: true,
  },
  {
    id: 'prod-rm-home-mbappe',
    slug: 'real-madrid-26-27-season-home-kit-mbappe',
    title: 'REAL MADRID 26/27 SEASON HOME KIT MBAPPE #9',
    shortTitle: 'Real Madrid Home Mbappe',
    subtitle: 'Pure Blanco • Houndstooth Sublimation Texture & Orange Trim',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'Real Madrid',
    league: 'La Liga',
    price: 399.00,
    originalPrice: 449.00,
    badge: 'FAST SELLING',
    dropTag: 'DROP #01',
    inStock: true,
    stockCount: 7,
    rating: 4.88,
    reviewsCount: 92,
    primaryImage: buildMediaAsset(
      'rm-home-1',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBjd1Z1hOXwMQOXCUdgZUKiRn_90fELoIIaQ6RQWyxj2PavaCua5yR3UJyNTvucdawayKCZWbpW41UPD8i766LsTwyodJG2xWkdJOOOBVm8ReqZ86hEPlmXI5YVWnBG5KeSD79s0tx-JTGkVEQSdslknh6muwF3tJgMI9bP31yoLE0F_00enuEr_egCS3i1MJHFSipmoMlTPAcMmwV0QJKaGKQPXe-tcbqTr5frY3UAJqBElgp3ZBuXgQ',
      'Real Madrid 26/27 Season Home Kit Mbappe'
    ),
    gallery: [
      buildMediaAsset(
        'rm-home-1',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBjd1Z1hOXwMQOXCUdgZUKiRn_90fELoIIaQ6RQWyxj2PavaCua5yR3UJyNTvucdawayKCZWbpW41UPD8i766LsTwyodJG2xWkdJOOOBVm8ReqZ86hEPlmXI5YVWnBG5KeSD79s0tx-JTGkVEQSdslknh6muwF3tJgMI9bP31yoLE0F_00enuEr_egCS3i1MJHFSipmoMlTPAcMmwV0QJKaGKQPXe-tcbqTr5frY3UAJqBElgp3ZBuXgQ',
        'Real Madrid Home Mbappe'
      ),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 6 },
      { size: 'M', label: '40"', inStock: true, stock: 3 },
      { size: 'L', label: '42"', inStock: true, stock: 8 },
      { size: 'XL', label: '44"', inStock: true, stock: 5 },
      { size: '2XL', label: '46"', inStock: true, stock: 2 },
    ],
    specs: {
      material: 'Aeroready Recycled Poly',
      fit: 'Standard Terrace Match Cut',
      badges: 'Embroidered Club Crest',
      print: 'Mbappe #9 High Durability Press',
    },
    description:
      'Kylian Mbappe edition 2026/27 Real Madrid Home kit. Engineered for European glory at the Santiago Bernabeu.',
    featured: true,
  },
  {
    id: 'prod-barca-home-pedri',
    slug: 'barcelona-2026-27-home-kit-pedri',
    title: 'BARCELONA 2026/27 HOME KIT PEDRI #8',
    shortTitle: 'Barcelona Home Pedri',
    subtitle: 'Classic Half-and-Half Blaugrana Heritage • Gold Numbering',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'Barcelona',
    league: 'La Liga',
    price: 399.00,
    originalPrice: 449.00,
    badge: 'PLAYER VER.',
    dropTag: 'DROP #01',
    inStock: true,
    stockCount: 11,
    rating: 4.92,
    reviewsCount: 110,
    primaryImage: buildMediaAsset(
      'barca-home-1',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrrl6BkJGY0rVC11Wh3SB8KLrolyreKtrYiW0tF3aGaOSjHz67G_osiF7vOCns3Zcc_hJwDkLGZxxFhdDdPMXZI2TgbOtwBzWrZ02t_8EdLPCkE_EnMEMMLoeKsTJToPSfBWc_z3THb35cDfS04qB3S9F30ramt97Wezbcjx7_6WjKn3-rcvIko8P3jR_n8H-VXqxSyWCQWS1XRkAzi_EXEpA5s2qjKbO-svge1uplkESrWSoQFoaZkA',
      'Barcelona 2026/27 Home Kit Pedri'
    ),
    gallery: [
      buildMediaAsset(
        'barca-home-1',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDrrl6BkJGY0rVC11Wh3SB8KLrolyreKtrYiW0tF3aGaOSjHz67G_osiF7vOCns3Zcc_hJwDkLGZxxFhdDdPMXZI2TgbOtwBzWrZ02t_8EdLPCkE_EnMEMMLoeKsTJToPSfBWc_z3THb35cDfS04qB3S9F30ramt97Wezbcjx7_6WjKn3-rcvIko8P3jR_n8H-VXqxSyWCQWS1XRkAzi_EXEpA5s2qjKbO-svge1uplkESrWSoQFoaZkA',
        'Barcelona Home Pedri'
      ),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 4 },
      { size: 'M', label: '40"', inStock: true, stock: 9 },
      { size: 'L', label: '42"', inStock: true, stock: 11 },
      { size: 'XL', label: '44"', inStock: true, stock: 3 },
      { size: '2XL', label: '46"', inStock: true, stock: 1 },
    ],
    specs: {
      material: '100% Breathable Micro-Poly',
      fit: 'True to Size Athletic Cut',
      badges: 'Heat-Transfer Federation Emblem',
      print: 'Pedri #8 Official Liga Type',
    },
    description:
      'The timeless Blaugrana vertical stripe celebration featuring midfield maestro Pedri. Premium moisture-wicking weave for peak comfort.',
    featured: true,
  },
  {
    id: 'prod-argentina-messi',
    slug: 'argentina-3-star-messi-commemorative',
    title: 'ARGENTINA 3-STAR MESSI COMMEMORATIVE EDITION #10',
    shortTitle: 'Argentina 3-Star Messi',
    subtitle: 'World Champions Albiceleste Stripe with Gold Crest & Stars',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'Argentina',
    league: 'International',
    price: 499.00,
    originalPrice: 599.00,
    discountPercent: 17,
    badge: '-17% OFF',
    dropTag: 'DROP #01',
    inStock: true,
    stockCount: 16,
    rating: 4.98,
    reviewsCount: 340,
    primaryImage: buildMediaAsset(
      'arg-messi-1',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqLVsY415I9gUe0kG3PRnxRMXSO6u8riFp2sCZJMYAxeVv2x1YOv2brLckCu910yjNxOCW6Pc7RSnXSMPX2HOD8shC25bPMl7vWShgmqWq5ZlBtapmKLj4NXgfLW9t_8BOTktHf2FCp8pHMF4wGHjOIv58DgZeXqqkE0dbshX8SpbTToQZLV7da2pC9BlK7gfV257tHoyzCKbqHh-yYg_zwoVqzrLKPTjPHWPUVPNx8_Yvpku6phjsjw',
      'Argentina 3-Star Messi Commemorative Edition'
    ),
    gallery: [
      buildMediaAsset(
        'arg-messi-1',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCqLVsY415I9gUe0kG3PRnxRMXSO6u8riFp2sCZJMYAxeVv2x1YOv2brLckCu910yjNxOCW6Pc7RSnXSMPX2HOD8shC25bPMl7vWShgmqWq5ZlBtapmKLj4NXgfLW9t_8BOTktHf2FCp8pHMF4wGHjOIv58DgZeXqqkE0dbshX8SpbTToQZLV7da2pC9BlK7gfV257tHoyzCKbqHh-yYg_zwoVqzrLKPTjPHWPUVPNx8_Yvpku6phjsjw',
        'Argentina Messi 10'
      ),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 7 },
      { size: 'M', label: '40"', inStock: true, stock: 12 },
      { size: 'L', label: '42"', inStock: true, stock: 15 },
      { size: 'XL', label: '44"', inStock: true, stock: 6 },
      { size: '2XL', label: '46"', inStock: true, stock: 4 },
    ],
    specs: {
      material: 'Climacool Gold Threading',
      fit: 'Athletic Tailored',
      badges: '3-Star Embroidered Gold Crest',
      print: 'Messi #10 Gold Foil Finish',
    },
    description:
      'Commemorate the GOAT and Argentina’s historic third World title with this collector-grade Albiceleste gold-edition release.',
    featured: true,
  },
  {
    id: 'prod-ac-milan-heritage',
    slug: 'ac-milan-26-27-classic-heritage-jersey',
    title: 'AC MILAN 26/27 CLASSIC HERITAGE JERSEY',
    shortTitle: 'AC Milan Classic Heritage',
    subtitle: 'Rossoneri Red & Black Vertical Precision Stripe',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'AC Milan',
    league: 'Serie A',
    price: 399.00,
    originalPrice: 449.00,
    badge: 'READY TO SHIP',
    dropTag: 'DROP #01',
    inStock: true,
    stockCount: 8,
    rating: 4.85,
    reviewsCount: 76,
    primaryImage: buildMediaAsset(
      'ac-milan-1',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAt8klvvdC-hKr63DXKgzGkbIXQ3ZMhu2OuIuXq23GAXF6yQtBVJlh5JIF7nHvI23snts1Q_MeopfSVy3peFNdS9EbixW8DD1qAdBcSSPVmVUns87yY7JCLX8KKIONJzHKl01kgIf0KMToG6AHNvj4ovTo6iDr8WVLNEC8ACu7qHc91HSbWyRB1-DO9RnbMRMfkLMeXIsLlW6vh8KYJsijyDf5dhJWdr8iK60t6m1vr9RgMjpJQMqgS2A',
      'AC Milan 26/27 Classic Heritage Jersey'
    ),
    gallery: [
      buildMediaAsset(
        'ac-milan-1',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAt8klvvdC-hKr63DXKgzGkbIXQ3ZMhu2OuIuXq23GAXF6yQtBVJlh5JIF7nHvI23snts1Q_MeopfSVy3peFNdS9EbixW8DD1qAdBcSSPVmVUns87yY7JCLX8KKIONJzHKl01kgIf0KMToG6AHNvj4ovTo6iDr8WVLNEC8ACu7qHc91HSbWyRB1-DO9RnbMRMfkLMeXIsLlW6vh8KYJsijyDf5dhJWdr8iK60t6m1vr9RgMjpJQMqgS2A',
        'AC Milan Classic Heritage'
      ),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 3 },
      { size: 'M', label: '40"', inStock: true, stock: 5 },
      { size: 'L', label: '42"', inStock: true, stock: 8 },
      { size: 'XL', label: '44"', inStock: true, stock: 4 },
      { size: '2XL', label: '46"', inStock: true, stock: 2 },
    ],
    specs: {
      material: 'DryCELL High-Vent Mesh',
      fit: 'European Match Cut',
      badges: 'Silicone 3D Rossoneri Badge',
      print: 'Customizable Supporter Print',
    },
    description:
      'San Siro heritage meets sharp 26/27 athletic lines in classic red and black pinstripes with stark white sponsor accents.',
    featured: false,
  },
  {
    id: 'prod-mancity-debruyne',
    slug: 'manchester-city-26-27-de-bruyne-retro-away',
    title: 'MANCHESTER CITY 26/27 DE BRUYNE RETRO AWAY',
    shortTitle: 'Man City De Bruyne Retro',
    subtitle: 'Vibrant Maroon & Sky Blue Accents • Etihad Sponsor',
    category: 'football-jerseys',
    department: 'Football Kits',
    club: 'Manchester City',
    league: 'Premier League',
    price: 399.00,
    originalPrice: 449.00,
    badge: 'READY TO SHIP',
    dropTag: 'DROP #01',
    inStock: true,
    stockCount: 9,
    rating: 4.89,
    reviewsCount: 65,
    primaryImage: buildMediaAsset(
      'mancity-1',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCcw5OPUinGJmYTnUD481bhL3Ur6gHRDemnPlozLlFh9FweEwcxGy3lJyaHqZyAf1rmc6j63LRm4_y6ORarda1os3IONOFBDFXhT-BybLRpM6Sgs9Odfw-XVYkeMhMvCHJBvHX5C0-P3zwJJa2Elx_5-Ftp3rjNzV_6IUJaMqOuXBRuPI9h_qcyKKnsc1iS2jciVRgKDxu1lWPE7ARwr262E02yF-zPfNRC4vF7Vy2HMBUYywBS06RhFQ',
      'Manchester City 26/27 De Bruyne Retro Away'
    ),
    gallery: [
      buildMediaAsset(
        'mancity-1',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCcw5OPUinGJmYTnUD481bhL3Ur6gHRDemnPlozLlFh9FweEwcxGy3lJyaHqZyAf1rmc6j63LRm4_y6ORarda1os3IONOFBDFXhT-BybLRpM6Sgs9Odfw-XVYkeMhMvCHJBvHX5C0-P3zwJJa2Elx_5-Ftp3rjNzV_6IUJaMqOuXBRuPI9h_qcyKKnsc1iS2jciVRgKDxu1lWPE7ARwr262E02yF-zPfNRC4vF7Vy2HMBUYywBS06RhFQ',
        'Man City De Bruyne'
      ),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 4 },
      { size: 'M', label: '40"', inStock: true, stock: 6 },
      { size: 'L', label: '42"', inStock: true, stock: 8 },
      { size: 'XL', label: '44"', inStock: true, stock: 4 },
      { size: '2XL', label: '46"', inStock: true, stock: 1 },
    ],
    specs: {
      material: 'Ultra-Weave Poly Hydrophobic',
      fit: 'Athletic Match Cut',
      badges: 'Monochrome Heat-Sealed Shield',
      print: 'De Bruyne #17 Premier Font',
    },
    description:
      'Retro-inspired maroon styling tailored for terrace aesthetics, honoring playmaker Kevin De Bruyne.',
    featured: false,
  },
  {
    id: 'prod-streetwear-hoodie',
    slug: 'heavyweight-streetwear-oversized-hoodie',
    title: 'OVERSIZED HEAVYWEIGHT STREETWEAR HOODIE // CHARCOAL',
    shortTitle: 'Heavyweight Streetwear Hoodie',
    subtitle: '450 GSM French Terry Cotton • Dropped Shoulder Silhouette',
    category: 'streetwear',
    department: 'Streetwear',
    price: 799.00,
    originalPrice: 999.00,
    discountPercent: 20,
    badge: '-20% OFF',
    dropTag: 'DROP #01',
    inStock: true,
    stockCount: 15,
    rating: 4.96,
    reviewsCount: 88,
    primaryImage: buildMediaAsset(
      'hoodie-1',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5TnUHzMvjP-GH6N3WtyYCd0Q7ePGb1Bk5mUZZGVBgaGwSPwUayIDSNSCp07U0XCyormkW2eXXmmhEMprVzha8g30zCstxbEiUO-nOUph4n0R98wBSpbnqRuQ2GcheTNBfkpOiFRwQLJ0kObm1BUMWYF7CVsePvDXmEHjQfRgtiRVn8qsdC-Vbq9yAIKMdyLiZu6nxvU1pb_A48MMlY11fJkpuSkMBP4YaID3nZV1_zFKMgi7Bne_d2g',
      'Oversized Heavyweight Streetwear Hoodie'
    ),
    gallery: [
      buildMediaAsset(
        'hoodie-1',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD5TnUHzMvjP-GH6N3WtyYCd0Q7ePGb1Bk5mUZZGVBgaGwSPwUayIDSNSCp07U0XCyormkW2eXXmmhEMprVzha8g30zCstxbEiUO-nOUph4n0R98wBSpbnqRuQ2GcheTNBfkpOiFRwQLJ0kObm1BUMWYF7CVsePvDXmEHjQfRgtiRVn8qsdC-Vbq9yAIKMdyLiZu6nxvU1pb_A48MMlY11fJkpuSkMBP4YaID3nZV1_zFKMgi7Bne_d2g',
        'Oversized Hoodie Front'
      ),
    ],
    sizes: [
      { size: 'S', label: '38"', inStock: true, stock: 5 },
      { size: 'M', label: '40"', inStock: true, stock: 10 },
      { size: 'L', label: '42"', inStock: true, stock: 12 },
      { size: 'XL', label: '44"', inStock: true, stock: 8 },
      { size: '2XL', label: '46"', inStock: true, stock: 4 },
    ],
    specs: {
      material: '100% Pre-Shrunk 450 GSM Heavy French Terry Cotton',
      fit: 'Boxy Drop-Shoulder Oversized',
      badges: 'Subtle High-Density FYND Chest Embroidery',
      print: 'Tone-on-Tone Minimalist Branding',
    },
    description:
      'Engineered for stadium chills and post-match hangs. Heavyweight drape with reinforced double-stitched kangaroo pouch.',
    featured: true,
  },
];

export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Rohan K.',
    location: 'Mumbai',
    rating: 5,
    comment:
      'The Madrid away green kit is insane in person. Quality of the club patch and heat-pressed sponsor matches player issue. Dispatch took 48h.',
    productName: 'Real Madrid 2026/27 Away Kit Green Bellingham',
    verifiedBuyer: true,
    date: '2 days ago',
  },
  {
    id: 'rev-2',
    author: 'Aditya P.',
    location: 'Bengaluru',
    rating: 5,
    comment:
      'Ordered the Lamine Yamal black kit. Font and numbering are accurate, stitching feels durable through 3 washes. Will grab the home version next.',
    productName: 'Barcelona 2026/27 Away Lamine Yamal',
    verifiedBuyer: true,
    date: '4 days ago',
  },
  {
    id: 'rev-3',
    author: 'Tanmay V.',
    location: 'Delhi NCR',
    rating: 5,
    comment:
      'UPI Intent on PhonePe worked in 2 seconds. The 7-day exchange promise gave me confidence on sizing, but the size M fits true to chest!',
    productName: 'Argentina 3-Star Messi Edition',
    verifiedBuyer: true,
    date: '1 week ago',
  },
  {
    id: 'rev-4',
    author: 'Karan M.',
    location: 'Kolkata',
    rating: 5,
    comment:
      'Material is proper moisture-wicking poly, not the cheap plastic feel. Best place for football jersey drops in India.',
    productName: 'Barcelona 2026/27 Home Kit Pedri',
    verifiedBuyer: true,
    date: '1 week ago',
  },
];

export const MOCK_COUPONS: CouponItem[] = [
  {
    id: 'coup-1',
    code: 'BUY4GET1',
    title: 'Buy 4 Kits Get 1 Free',
    discountType: 'fixed',
    discountValue: 399,
    minOrderValue: 1596,
    description: 'Add 4 or more kits to bag, get 1 kit equivalent discount instantly.',
    expiryDate: '2026-12-31',
    isActive: true,
  },
  {
    id: 'coup-2',
    code: 'MADRIDISTA',
    title: 'Extra ₹100 Off on 2+ Kits',
    discountType: 'fixed',
    discountValue: 100,
    minOrderValue: 798,
    description: 'Instant discount applicable on any 2 or more club releases.',
    expiryDate: '2026-11-30',
    isActive: true,
  },
  {
    id: 'coup-3',
    code: 'FIRSTDROP10',
    title: '10% Welcome Discount',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 399,
    description: 'Exclusive 10% discount on your first FYND discovery order.',
    expiryDate: '2026-12-31',
    isActive: true,
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord-88291',
    allocationId: '#FYND-88291',
    createdAt: '2026-10-01T18:40:00Z',
    status: 'PLACED',
    statusText: 'Drop Secured & Prioritized for Airline Dispatch',
    estimatedDelivery: 'Thursday, by 3:00 PM',
    trackingAwb: 'BD789210984IN',
    courierName: 'Bluedart Express Priority',
    items: [
      {
        productId: 'prod-rm-away-green',
        slug: 'real-madrid-2026-27-away-kit-green-bellingham',
        title: 'Real Madrid 2026/27 Away Kit',
        subtitle: 'Green // Bellingham #5',
        size: 'M (UK/IN 40")',
        price: 399.00,
        originalPrice: 2499.00,
        quantity: 1,
        image: buildMediaAsset(
          'rm-away-1',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBHP8bb4blDFvoLJeXAI98VKKfjMKtg1lE0bP7aIZStjJLiswK1xcVfQu51vi3M6xtYDbY6RLJQE5fasxWIZ41kTFG3-x8w7nhcqerGirFQlM-3vqBEOjIl8W_XdXVoRaSQnag-aPl8SCfY2hrCC8PDK6hSp7RMtko4Wn9fbW5myLsCgu_C6gl5m-Hl7vPz0zYspD_iGLm02xdiDqefKRf69QbxHbfMX1FO0QbXxQ3VBtf25L8RI3GDWw',
          'Real Madrid Away Kit'
        ),
      },
    ],
    subtotal: 399.00,
    discount: 0.00,
    deliveryFee: 0.00,
    total: 399.00,
    paymentMethod: 'Google Pay UPI Intent',
    paymentRef: 'UPI/392817264',
    shippingAddress: {
      fullName: 'Rohan Sen',
      phone: '+91 98765 43210',
      email: 'rohan.sen@example.com',
      addressLine1: 'Flat 402, Terrace Court, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
    },
  },
];

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'shipping',
    question: 'How fast is nationwide delivery across India?',
    answer:
      'All orders are prioritized and dispatched within 24 to 48 hours via Bluedart Air and Delhivery Express. Metro hubs (Bengaluru, Mumbai, Delhi NCR, Hyderabad) receive delivery within 2-3 business days. Tier-2 and 3 pin codes arrive within 3-5 days.',
  },
  {
    id: 'faq-2',
    category: 'authenticity',
    question: 'What is the quality of the kits and badges?',
    answer:
      'Our matchday kits are crafted with 100% moisture-wicking breathable micro-piqué fabric matching official player issue specifications. Heat-transferred silicon crests, authentic typography, and genuine sponsor decals are quality-tested to endure regular machine washing.',
  },
  {
    id: 'faq-3',
    category: 'sizing',
    question: 'How do the jersey sizes fit?',
    answer:
      'Our kits feature a standard tailored athletic fit. If you prefer a loose, relaxed streetwear oversized drape, we advise selecting one size up from your measured chest size.',
  },
  {
    id: 'faq-4',
    category: 'returns',
    question: 'How does the 7-day doorstep size exchange work?',
    answer:
      'If the kit does not fit perfectly, initiate an exchange within 7 days from delivery. Our courier partner will collect the item from your doorstep and deliver the replacement size with zero extra pickup charges.',
  },
  {
    id: 'faq-5',
    category: 'payment',
    question: 'What payment modes are supported?',
    answer:
      'We support instant zero-fee UPI Intent (Google Pay, PhonePe, Paytm, BHIM), all major Credit & Debit Cards (Visa, Mastercard, RuPay), Net Banking across 50+ Indian banks, and Cash On Delivery (COD).',
  },
];

export const MOCK_HOMEPAGE_CMS: HomepageCms = {
  hero: {
    dropBadge: "DROP 07 // LIVE NOW",
    headline: "RED7 // STREETWEAR & FOOTBALL KITS",
    subheadline: "Curated retro matchday kits, oversized tracksuits, and terrace streetwear built for culture.",
    ctaPrimaryText: "SHOP NOW",
    ctaPrimaryLink: "/shop",
    ctaSecondaryText: "EXPLORE KITS",
    ctaSecondaryLink: "/shop?category=football-jerseys",
    image: buildMediaAsset(
      'hero-img-1',
      '/images/red7/hero-streetwear.jpg',
      'RED7 Streetwear Lookbook Editorial'
    ),
    desktopImage: buildMediaAsset(
      'hero-img-desktop',
      '/images/red7/hero-streetwear-desktop.jpg',
      'RED7 Streetwear Lookbook Desktop Widescreen'
    ),
  },
  tickerStrip: [
    { id: 't1', text: 'BUY4GET150-OFF' },
    { id: 't2', text: 'BUY5GETFREERANDOMKIT' },
    { id: 't3', text: 'BUY2GET1FREE' },
    { id: 't4', text: 'USE CODE RED7 FOR 10% OFF' },
    { id: 't5', text: 'ALL-INDIA EXPRESS DISPATCH' },
  ],
  lifestyleBanners: [
    {
      id: 'banner-green',
      title: 'MATCHDAY EDIT',
      link: '/shop?category=football-jerseys',
      image: buildMediaAsset(
        'banner-green-img',
        '/images/red7/lifestyle-green.jpg',
        'Matchday Green Edition'
      ),
    },
    {
      id: 'banner-blue-42',
      title: 'RETRO 42 HERITAGE',
      link: '/shop?category=football-jerseys',
      image: buildMediaAsset(
        'banner-blue-42-img',
        '/images/red7/lifestyle-blue-42.jpg',
        'Retro 42 Jersey Back'
      ),
    },
  ],
  flashBanner: {
    badge: 'LIMITED FLASH DROP',
    headline: 'GET 3 JERSEYS FOR ₹999',
    description: 'Mix and match any current season club kits or retro heritage editions. Automated bundle checkout applied in bag.',
    buttonText: 'CLAIM BUNDLE',
    buttonLink: '/shop',
  },
};
