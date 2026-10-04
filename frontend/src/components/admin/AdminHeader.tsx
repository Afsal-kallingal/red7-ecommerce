'use client';

import React from 'react';
import Link from 'next/link';

export function AdminHeader({ title }: { title: string }) {
  return (
    <header className="h-16 bg-surface-container-lowest border-b border-outline-variant/20 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="md:hidden font-headline-sm uppercase text-primary font-bold text-lg">
          FYND ADMIN
        </Link>
        <h1 className="font-headline-sm uppercase text-on-surface font-bold text-base hidden md:block">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold hidden sm:inline">
          Live Sync Mode: <strong className="text-primary font-bold">MOCK ADAPTER</strong>
        </span>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs uppercase">
            A
          </div>
          <span className="font-body-sm text-xs text-on-surface font-medium hidden sm:inline">
            Admin Lead
          </span>
        </div>
      </div>
    </header>
  );
}
