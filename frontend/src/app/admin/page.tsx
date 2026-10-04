'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Icon } from '@/components/ui/Icon';
import { api } from '@/services/api';
import { AdminKpiSummary } from '@/types/admin';
import { Order } from '@/types/order';
import { formatINR } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [kpis, setKpis] = useState<AdminKpiSummary | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.getAdminKpis().then(setKpis);
    api.getOrders().then(setOrders);
  }, []);

  return (
    <>
      <AdminHeader title="Dashboard & KPI Metrics" />
      <main className="p-6 flex flex-col gap-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest p-4 border border-outline-variant/20 shadow-xs flex flex-col justify-between">
            <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">
              Today's Gross
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-headline-lg text-primary font-bold">
                {kpis ? formatINR(kpis.todayRevenue) : '...'}
              </span>
              <span className="text-green-700 font-label-caps text-xs font-bold">+18.4%</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-outline-variant/20 shadow-xs flex flex-col justify-between">
            <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">
              Total Drop Orders
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-headline-lg text-on-surface font-bold">
                {kpis ? kpis.totalOrders : '...'}
              </span>
              <span className="text-primary font-label-caps text-xs font-bold">LIVE AIRLINE</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-outline-variant/20 shadow-xs flex flex-col justify-between">
            <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">
              Active Shipments
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-headline-lg text-on-surface font-bold">
                {kpis ? kpis.activeShipments : '...'}
              </span>
              <span className="text-on-surface-variant font-label-caps text-xs">BLUEDART AIR</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-4 border border-outline-variant/20 shadow-xs flex flex-col justify-between">
            <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">
              Low Stock Alerts
            </span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-headline-lg text-error font-bold">
                {kpis ? kpis.lowStockItemsCount : '...'}
              </span>
              <span className="text-error font-label-caps text-xs font-bold">&lt; 5 UNITS</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/admin/products"
            className="p-3 bg-primary text-on-primary font-label-caps text-xs uppercase tracking-wider font-bold shadow-xs hover:bg-primary/90 flex items-center justify-between"
          >
            <span>+ Add New Product</span>
            <Icon name="add" size={18} />
          </Link>
          <Link
            href="/admin/inventory"
            className="p-3 bg-surface-container-lowest border border-outline-variant/20 text-on-surface font-label-caps text-xs uppercase tracking-wider font-bold hover:bg-surface-container-low flex items-center justify-between"
          >
            <span>Update Variant Stock</span>
            <Icon name="inventory" size={18} />
          </Link>
          <Link
            href="/admin/banners"
            className="p-3 bg-surface-container-lowest border border-outline-variant/20 text-on-surface font-label-caps text-xs uppercase tracking-wider font-bold hover:bg-surface-container-low flex items-center justify-between"
          >
            <span>Homepage CMS & Tickers</span>
            <Icon name="campaign" size={18} />
          </Link>
          <Link
            href="/admin/orders"
            className="p-3 bg-surface-container-lowest border border-outline-variant/20 text-on-surface font-label-caps text-xs uppercase tracking-wider font-bold hover:bg-surface-container-low flex items-center justify-between"
          >
            <span>Fulfill Pending Orders</span>
            <Icon name="local_shipping" size={18} />
          </Link>
        </div>

        {/* Recent Drop Orders Table */}
        <div className="bg-surface-container-lowest border border-outline-variant/20 shadow-xs flex flex-col">
          <div className="p-4 border-b border-outline-variant/10 flex items-center justify-between">
            <h3 className="font-headline-sm uppercase text-on-surface font-bold text-base">
              Recent Fulfillment Pipeline
            </h3>
            <Link
              href="/admin/orders"
              className="font-label-caps text-xs text-primary font-bold uppercase hover:underline"
            >
              View All Orders
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-xs">
              <thead>
                <tr className="bg-surface-container-low text-on-surface font-label-caps uppercase tracking-wider">
                  <th className="p-3 font-bold">Allocation ID</th>
                  <th className="p-3 font-bold">Customer</th>
                  <th className="p-3 font-bold">Destination</th>
                  <th className="p-3 font-bold">Total</th>
                  <th className="p-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3 font-headline-sm font-bold text-on-surface">
                      {o.allocationId}
                    </td>
                    <td className="p-3 text-on-surface">
                      {o.shippingAddress.fullName}
                      <span className="block text-[10px] text-on-surface-variant font-mono">
                        {o.shippingAddress.phone}
                      </span>
                    </td>
                    <td className="p-3 text-on-surface-variant">
                      {o.shippingAddress.city}, {o.shippingAddress.pincode}
                    </td>
                    <td className="p-3 font-price-current font-bold text-primary">
                      {formatINR(o.total)}
                    </td>
                    <td className="p-3">
                      <span className="bg-primary-container text-on-primary-fixed font-label-caps text-[10px] px-2 py-0.5 uppercase font-bold">
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
