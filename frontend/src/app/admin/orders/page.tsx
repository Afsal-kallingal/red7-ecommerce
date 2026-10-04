'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { api } from '@/services/api';
import { Order, OrderStatus } from '@/types/order';
import { formatINR } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { showToast } = useUIStore();

  const loadOrders = async () => {
    const data = await api.getOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    await api.updateOrderStatus(orderId, newStatus);
    showToast(`Order status updated to ${newStatus}`);
    loadOrders();
  };

  const filtered = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    return o.status === filterStatus;
  });

  return (
    <>
      <AdminHeader title="Order Fulfillment & Dispatch Pipeline" />
      <main className="p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-headline-sm uppercase text-on-surface font-bold text-base">
              Customer Orders ({orders.length})
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Manage airline fulfillment, carrier tracking numbers, and delivery confirmation.
            </p>
          </div>

          <div className="flex gap-1.5 overflow-x-auto">
            {['all', 'PLACED', 'PACKED', 'TRANSIT', 'DELIVERED'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 font-label-caps text-xs uppercase tracking-wider transition-colors ${
                  filterStatus === st
                    ? 'bg-primary text-on-primary font-bold shadow-xs'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/20 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-xs">
              <thead>
                <tr className="bg-surface-container-low text-on-surface font-label-caps uppercase tracking-wider border-b border-outline-variant/20">
                  <th className="p-3 font-bold">Allocation ID</th>
                  <th className="p-3 font-bold">Customer & Shipping</th>
                  <th className="p-3 font-bold">Items Ordered</th>
                  <th className="p-3 font-bold">Payment</th>
                  <th className="p-3 font-bold">Total</th>
                  <th className="p-3 font-bold">Change Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {filtered.map((ord) => (
                  <tr key={ord.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3">
                      <span className="font-headline-sm font-bold text-on-surface block text-sm">
                        {ord.allocationId}
                      </span>
                      <span className="font-body-sm text-[10px] text-on-surface-variant font-mono">
                        {new Date(ord.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-on-surface block">
                        {ord.shippingAddress.fullName}
                      </span>
                      <span className="text-[11px] text-on-surface-variant block">
                        {ord.shippingAddress.city} – {ord.shippingAddress.pincode}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-mono">
                        {ord.shippingAddress.phone}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-on-surface block">
                        {ord.items[0]?.title || 'Matchday Kit'}
                      </span>
                      <span className="text-[11px] text-on-surface-variant">
                        Size: {ord.items[0]?.size} (Qty: {ord.items[0]?.quantity})
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-label-caps text-[11px] text-on-surface uppercase block font-semibold">
                        {ord.paymentMethod}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-mono">
                        {ord.paymentRef}
                      </span>
                    </td>
                    <td className="p-3 font-price-current font-bold text-primary text-sm">
                      {formatINR(ord.total)}
                    </td>
                    <td className="p-3">
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          handleStatusChange(ord.id, e.target.value as OrderStatus)
                        }
                        className="p-1.5 bg-surface-container-low border border-outline-variant/30 text-on-surface font-label-caps text-xs uppercase font-bold focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="PLACED">PLACED</option>
                        <option value="PACKED">PACKED</option>
                        <option value="TRANSIT">TRANSIT</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
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
