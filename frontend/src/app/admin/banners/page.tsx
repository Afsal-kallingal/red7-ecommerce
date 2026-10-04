'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Icon } from '@/components/ui/Icon';
import { api } from '@/services/api';
import { HomepageCms } from '@/types/cms';
import { useUIStore } from '@/store/uiStore';

export default function AdminBannersPage() {
  const [cms, setCms] = useState<HomepageCms | null>(null);
  const { showToast } = useUIStore();

  // Form states
  const [dropBadge, setDropBadge] = useState('');
  const [headline, setHeadline] = useState('');
  const [subheadline, setSubheadline] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');

  const [flashBadge, setFlashBadge] = useState('');
  const [flashHeadline, setFlashHeadline] = useState('');
  const [flashDescription, setFlashDescription] = useState('');

  const load = async () => {
    const data = await api.getHomepageCms();
    setCms(data);
    setDropBadge(data.hero.dropBadge);
    setHeadline(data.hero.headline);
    setSubheadline(data.hero.subheadline);
    setHeroImageUrl(data.hero.image.url);

    setFlashBadge(data.flashBanner.badge);
    setFlashHeadline(data.flashBanner.headline);
    setFlashDescription(data.flashBanner.description);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cms) return;

    await api.updateHomepageCms({
      hero: {
        ...cms.hero,
        dropBadge,
        headline,
        subheadline,
        image: {
          ...cms.hero.image,
          url: heroImageUrl,
        },
      },
    });

    showToast('Hero Drop settings saved! Visible on storefront.');
    load();
  };

  const handleSaveFlash = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cms) return;

    await api.updateHomepageCms({
      flashBanner: {
        ...cms.flashBanner,
        badge: flashBadge,
        headline: flashHeadline,
        description: flashDescription,
      },
    });

    showToast('Flash Banner updated! Visible on storefront.');
    load();
  };

  if (!cms) {
    return (
      <div className="p-8 text-center flex justify-center">
        <Icon name="progress_activity" size={32} className="text-primary" />
      </div>
    );
  }

  return (
    <>
      <AdminHeader title="Homepage Banners & CMS Manager" />
      <main className="p-6 flex flex-col gap-6 max-w-4xl">
        <div>
          <h2 className="font-headline-sm uppercase text-on-surface font-bold text-base">
            Storefront Banners & Drop Headlines
          </h2>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Update editorial hero photography, launch announcement copy, and flash deal promotions in real-time.
          </p>
        </div>

        {/* Hero Section Config Form */}
        <form
          onSubmit={handleSaveHero}
          className="bg-surface-container-lowest p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-3"
        >
          <span className="font-label-caps uppercase text-on-surface font-bold text-sm">
            Editorial Hero Showcase
          </span>

          <div>
            <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
              Drop Badge Tag
            </label>
            <input
              type="text"
              required
              value={dropBadge}
              onChange={(e) => setDropBadge(e.target.value)}
              className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm"
            />
          </div>

          <div>
            <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
              Headline
            </label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm"
            />
          </div>

          <div>
            <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
              Subheadline / Lookbook Summary
            </label>
            <textarea
              rows={2}
              value={subheadline}
              onChange={(e) => setSubheadline(e.target.value)}
              className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm resize-none"
            />
          </div>

          <div>
            <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
              Hero Image URL (S3 / CDN)
            </label>
            <input
              type="url"
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm"
            />
          </div>

          <button
            type="submit"
            className="self-start px-6 py-2.5 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-sm active:scale-95 transition-transform"
          >
            Update Hero Drop
          </button>
        </form>

        {/* Flash Sale Banner Config Form */}
        <form
          onSubmit={handleSaveFlash}
          className="bg-surface-container-lowest p-5 border border-outline-variant/20 shadow-xs flex flex-col gap-3"
        >
          <span className="font-label-caps uppercase text-on-surface font-bold text-sm">
            Flash Sale Drop Banner (Primary Green Container)
          </span>

          <div>
            <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
              Flash Badge
            </label>
            <input
              type="text"
              required
              value={flashBadge}
              onChange={(e) => setFlashBadge(e.target.value)}
              className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm"
            />
          </div>

          <div>
            <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
              Banner Headline
            </label>
            <input
              type="text"
              required
              value={flashHeadline}
              onChange={(e) => setFlashHeadline(e.target.value)}
              className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm"
            />
          </div>

          <div>
            <label className="font-label-caps text-xs uppercase text-on-surface font-bold block mb-1">
              Banner Description
            </label>
            <textarea
              rows={2}
              value={flashDescription}
              onChange={(e) => setFlashDescription(e.target.value)}
              className="w-full p-2 bg-surface-container-low text-xs border border-outline-variant/30 font-body-sm resize-none"
            />
          </div>

          <button
            type="submit"
            className="self-start px-6 py-2.5 bg-primary text-on-primary font-label-caps uppercase tracking-wider font-bold shadow-sm active:scale-95 transition-transform"
          >
            Update Flash Banner
          </button>
        </form>
      </main>
    </>
  );
}
