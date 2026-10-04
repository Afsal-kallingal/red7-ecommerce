'use client';

import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminCustomersPage() {
  const customers = [
    {
      id: 'cust-1',
      name: 'Rohan Sen',
      email: 'rohan.sen@example.com',
      phone: '+91 98765 43210',
      city: 'Bengaluru, KA',
      ordersCount: 4,
      totalSpent: '₹ 1,596.00',
      tier: 'VIP DROP CLUB',
    },
    {
      id: 'cust-2',
      name: 'Aditya Patel',
      email: 'aditya.p@example.com',
      phone: '+91 98450 11223',
      city: 'Mumbai, MH',
      ordersCount: 2,
      totalSpent: '₹ 798.00',
      tier: 'SUPPORTER',
    },
    {
      id: 'cust-3',
      name: 'Tanmay Varma',
      email: 'tanmay.v@example.com',
      phone: '+91 99100 88776',
      city: 'Delhi NCR',
      ordersCount: 3,
      totalSpent: '₹ 1,297.00',
      tier: 'VIP DROP CLUB',
    },
    {
      id: 'cust-4',
      name: 'Karan Mukherjee',
      email: 'karan.m@example.com',
      phone: '+91 98300 44556',
      city: 'Kolkata, WB',
      ordersCount: 1,
      totalSpent: '₹ 399.00',
      tier: 'SUPPORTER',
    },
  ];

  return (
    <>
      <AdminHeader title="Customer CRM & Supporter Accounts" />
      <main className="p-6 flex flex-col gap-6">
        <div>
          <h2 className="font-headline-sm uppercase text-on-surface font-bold text-base">
            Supporter Profiles ({customers.length})
          </h2>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Customer lifetime orders, contact details, and VIP club engagement.
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant/20 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-xs">
              <thead>
                <tr className="bg-surface-container-low text-on-surface font-label-caps uppercase tracking-wider border-b border-outline-variant/20">
                  <th className="p-3 font-bold">Customer Name</th>
                  <th className="p-3 font-bold">Contact Info</th>
                  <th className="p-3 font-bold">Location</th>
                  <th className="p-3 font-bold">Orders Count</th>
                  <th className="p-3 font-bold">Lifetime Total</th>
                  <th className="p-3 font-bold">Club Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {customers.map((c) => (
                  <tr key={c.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-3">
                      <span className="font-headline-sm font-bold text-on-surface block text-sm">
                        {c.name}
                      </span>
                      <span className="font-mono text-[10px] text-on-surface-variant">{c.id}</span>
                    </td>
                    <td className="p-3 text-on-surface">
                      <span>{c.email}</span>
                      <span className="block font-mono text-[10px] text-on-surface-variant">
                        {c.phone}
                      </span>
                    </td>
                    <td className="p-3 text-on-surface-variant">{c.city}</td>
                    <td className="p-3 font-headline-sm font-bold text-on-surface">
                      {c.ordersCount} Orders
                    </td>
                    <td className="p-3 font-price-current font-bold text-primary">{c.totalSpent}</td>
                    <td className="p-3">
                      <span className="bg-primary-container text-on-primary-fixed font-label-caps text-[10px] px-2 py-0.5 uppercase font-bold">
                        {c.tier}
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
