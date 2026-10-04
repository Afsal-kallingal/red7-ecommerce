import { Product, Category } from '@/types/product';
import { Order, OrderStatus } from '@/types/order';
import { CheckoutFormData, PincodeCheckResult } from '@/types/checkout';
import { ReviewItem, CouponItem, FAQItem, HomepageCms } from '@/types/cms';
import { AdminKpiSummary, AdminProductPayload } from '@/types/admin';
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_REVIEWS,
  MOCK_COUPONS,
  MOCK_ORDERS,
  MOCK_FAQS,
  MOCK_HOMEPAGE_CMS,
} from '@/services/mock/mockData';
import { buildMediaAsset } from '@/lib/images';

// Local storage keys for state persistence
const STORAGE_KEYS = {
  PRODUCTS: 'fynd_admin_products_v1',
  ORDERS: 'fynd_orders_v1',
  REVIEWS: 'fynd_reviews_v1',
  CMS: 'fynd_cms_v1',
};

class FyndApiService {
  private products: Product[] = [...MOCK_PRODUCTS];
  private orders: Order[] = [...MOCK_ORDERS];
  private reviews: ReviewItem[] = [...MOCK_REVIEWS];
  private cms: HomepageCms = { ...MOCK_HOMEPAGE_CMS };

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (savedProducts) this.products = JSON.parse(savedProducts);

        const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
        if (savedOrders) this.orders = JSON.parse(savedOrders);

        const savedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
        if (savedReviews) this.reviews = JSON.parse(savedReviews);

        const savedCms = localStorage.getItem(STORAGE_KEYS.CMS);
        if (savedCms) this.cms = JSON.parse(savedCms);
      } catch (err) {
        console.warn('Failed to load local mock state:', err);
      }
    }
  }

  private saveState(key: string, data: unknown) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.warn('Storage save failed:', e);
      }
    }
  }

  // --- Products & Catalog ---
  async getProducts(params?: {
    category?: string;
    club?: string;
    size?: string;
    sort?: string;
    query?: string;
    featured?: boolean;
    maxPrice?: number;
  }): Promise<{ items: Product[]; total: number }> {
    let list = [...this.products];

    if (params?.featured) {
      list = list.filter((p) => p.featured);
    }

    if (params?.category) {
      list = list.filter((p) => p.category === params.category || p.department.toLowerCase().includes(params.category!.toLowerCase()));
    }

    if (params?.club) {
      list = list.filter((p) => p.club?.toLowerCase() === params.club?.toLowerCase());
    }

    if (params?.maxPrice) {
      list = list.filter((p) => p.price <= params.maxPrice!);
    }

    if (params?.query) {
      const q = params.query.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.club?.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q)
      );
    }

    if (params?.sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (params?.sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (params?.sort === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return { items: list, total: list.length };
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const found = this.products.find((p) => p.slug === slug);
    return found || this.products[0] || null;
  }

  async getCategories(): Promise<Category[]> {
    return MOCK_CATEGORIES;
  }

  // --- Logistics & PIN code ---
  async checkPincode(pincode: string): Promise<PincodeCheckResult> {
    const cleanPin = pincode.replace(/\D/g, '').slice(0, 6);
    const isStandard = cleanPin.length === 6;

    if (!isStandard) {
      return {
        pincode: cleanPin,
        city: 'India',
        state: '',
        serviceable: false,
        codAvailable: false,
        estimatedDeliveryText: 'Please enter a valid 6-digit Indian PIN code',
        expressAvailable: false,
      };
    }

    const cityMap: Record<string, { city: string; state: string }> = {
      '560': { city: 'Bengaluru', state: 'Karnataka' },
      '400': { city: 'Mumbai', state: 'Maharashtra' },
      '110': { city: 'Delhi', state: 'Delhi NCR' },
      '700': { city: 'Kolkata', state: 'West Bengal' },
      '600': { city: 'Chennai', state: 'Tamil Nadu' },
      '500': { city: 'Hyderabad', state: 'Telangana' },
    };

    const prefix = cleanPin.substring(0, 3);
    const loc = cityMap[prefix] || { city: 'Pan-India Hub', state: 'India' };

    return {
      pincode: cleanPin,
      city: loc.city,
      state: loc.state,
      serviceable: true,
      codAvailable: true,
      estimatedDeliveryText: `Estimated delivery by Thursday, 3:00 PM to ${loc.city}`,
      expressAvailable: true,
    };
  }

  // --- Reviews ---
  async getReviews(): Promise<ReviewItem[]> {
    return this.reviews;
  }

  async submitReview(review: Omit<ReviewItem, 'id' | 'date' | 'verifiedBuyer'>): Promise<ReviewItem> {
    const newRev: ReviewItem = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verifiedBuyer: true,
    };
    this.reviews = [newRev, ...this.reviews];
    this.saveState(STORAGE_KEYS.REVIEWS, this.reviews);
    return newRev;
  }

  // --- Coupons ---
  async getCoupons(): Promise<CouponItem[]> {
    return MOCK_COUPONS;
  }

  async validateCoupon(code: string, subtotal = 0): Promise<{ valid: boolean; discount: number; message: string }> {
    const found = MOCK_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);
    if (!found) {
      return { valid: false, discount: 0, message: 'Invalid or expired coupon code' };
    }
    if (subtotal < found.minOrderValue) {
      return {
        valid: false,
        discount: 0,
        message: `Min order value of ₹${found.minOrderValue} required for this coupon`,
      };
    }
    let discount = found.discountValue;
    if (found.discountType === 'percentage') {
      discount = (subtotal * found.discountValue) / 100;
    }
    return { valid: true, discount, message: `${found.title} applied!` };
  }

  // --- Orders & Checkout ---
  async createOrder(formData: CheckoutFormData, items: Order['items'], total: number): Promise<Order> {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ord-${randomSuffix}`;
    const allocationId = `#FYND-${randomSuffix}`;

    const newOrder: Order = {
      id: orderId,
      allocationId,
      createdAt: new Date().toISOString(),
      status: 'PLACED',
      statusText: 'Drop Secured & Prioritized for Airline Dispatch',
      estimatedDelivery: 'Thursday, by 3:00 PM',
      trackingAwb: `BD${randomSuffix}IN`,
      courierName: 'Bluedart Express Priority',
      items,
      subtotal: total,
      discount: 0,
      deliveryFee: 0,
      total,
      paymentMethod:
        formData.paymentMethod === 'upi_intent'
          ? `${(formData.upiApp || 'UPI').toUpperCase()} Intent`
          : formData.paymentMethod.toUpperCase(),
      paymentRef: `UPI/${Date.now().toString().slice(-8)}`,
      shippingAddress: formData.shippingAddress,
    };

    this.orders = [newOrder, ...this.orders];
    this.saveState(STORAGE_KEYS.ORDERS, this.orders);
    return newOrder;
  }

  async getOrderById(id: string): Promise<Order | null> {
    const found = this.orders.find((o) => o.id === id || o.allocationId.replace('#', '') === id.replace('#', ''));
    return found || this.orders[0] || null;
  }

  async getOrders(): Promise<Order[]> {
    return this.orders;
  }

  // --- Content & FAQ ---
  async getFaqs(): Promise<FAQItem[]> {
    return MOCK_FAQS;
  }

  async getHomepageCms(): Promise<HomepageCms> {
    return this.cms;
  }

  // --- Admin Methods ---
  async getAdminKpis(): Promise<AdminKpiSummary> {
    const totalRev = this.orders.reduce((acc, curr) => acc + curr.total, 128450);
    return {
      todayRevenue: 42990,
      totalOrders: this.orders.length + 380,
      activeShipments: 46,
      lowStockItemsCount: this.products.filter((p) => p.stockCount <= 5).length,
      averageOrderValue: 798,
      conversionRate: 3.4,
    };
  }

  async addProduct(payload: AdminProductPayload): Promise<Product> {
    const id = `prod-${Date.now()}`;
    const newProd: Product = {
      id,
      slug: payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: payload.title,
      shortTitle: payload.title.split(' ')[0] + ' ' + (payload.title.split(' ')[1] || ''),
      subtitle: payload.subtitle,
      category: (payload.category as Product['category']) || 'football-jerseys',
      department: payload.category === 'streetwear' ? 'Streetwear' : 'Football Kits',
      price: payload.price,
      originalPrice: payload.originalPrice || payload.price + 50,
      badge: payload.badge || 'NEW DROP',
      inStock: payload.inStock,
      stockCount: payload.stockCount,
      rating: 5.0,
      reviewsCount: 1,
      primaryImage: buildMediaAsset(`${id}-img-1`, payload.imageUrl, payload.title, true),
      gallery: [buildMediaAsset(`${id}-img-1`, payload.imageUrl, payload.title, true)],
      sizes: [
        { size: 'S', label: '38"', inStock: true, stock: 4 },
        { size: 'M', label: '40"', inStock: true, stock: 5 },
        { size: 'L', label: '42"', inStock: true, stock: 6 },
        { size: 'XL', label: '44"', inStock: true, stock: 3 },
        { size: '2XL', label: '46"', inStock: true, stock: 2 },
      ],
      specs: {
        material: 'Recycled Moisture-Wicking Poly',
        fit: 'Standard Fit',
        badges: 'High Density Patch',
        print: 'Official Supporter Grade',
      },
      description: payload.description,
      isNewArrival: true,
    };

    this.products = [newProd, ...this.products];
    this.saveState(STORAGE_KEYS.PRODUCTS, this.products);
    return newProd;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...updates };
    this.saveState(STORAGE_KEYS.PRODUCTS, this.products);
    return this.products[idx];
  }

  async deleteProduct(id: string): Promise<boolean> {
    this.products = this.products.filter((p) => p.id !== id);
    this.saveState(STORAGE_KEYS.PRODUCTS, this.products);
    return true;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order | null> {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return null;
    order.status = status;
    this.saveState(STORAGE_KEYS.ORDERS, this.orders);
    return order;
  }

  async updateHomepageCms(updates: Partial<HomepageCms>): Promise<HomepageCms> {
    this.cms = { ...this.cms, ...updates };
    this.saveState(STORAGE_KEYS.CMS, this.cms);
    return this.cms;
  }
}

export const api = new FyndApiService();
