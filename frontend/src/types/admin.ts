export interface AdminKpiSummary {
  todayRevenue: number;
  totalOrders: number;
  activeShipments: number;
  lowStockItemsCount: number;
  averageOrderValue: number;
  conversionRate: number;
}

export interface AdminProductPayload {
  title: string;
  slug: string;
  subtitle: string;
  category: string;
  price: number;
  originalPrice: number;
  badge?: string;
  description: string;
  inStock: boolean;
  stockCount: number;
  imageUrl: string;
}
