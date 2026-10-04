'use client';

import React from 'react';
import { useUIStore } from '@/store/uiStore';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export function ToastNotification() {
  const { activeToast, hideToast } = useUIStore();

  if (!activeToast) return null;

  return (
    <div className="fixed top-16 inset-x-4 md:inset-x-auto md:right-6 md:w-96 z-50 pointer-events-auto transform transition-all duration-300 flex items-center justify-between bg-inverse-surface text-inverse-on-surface p-space-md shadow-2xl border-l-4 border-primary-fixed rounded-sm">
      <div className="flex items-center gap-2">
        <Icon name="check_circle" size={18} className="text-green-400 shrink-0" />
        <span className="font-headline-sm text-[13px] uppercase tracking-wider font-semibold">
          {activeToast.message}
        </span>
      </div>
      {activeToast.actionUrl ? (
        <Link
          href={activeToast.actionUrl}
          onClick={hideToast}
          className="font-label-caps text-label-caps text-tertiary-fixed font-bold hover:underline ml-4 shrink-0"
        >
          {activeToast.actionText || 'VIEW'}
        </Link>
      ) : activeToast.actionText ? (
        <button
          onClick={hideToast}
          className="font-label-caps text-label-caps text-tertiary-fixed font-bold hover:underline ml-4 shrink-0 cursor-pointer"
        >
          {activeToast.actionText}
        </button>
      ) : null}
    </div>
  );
}
