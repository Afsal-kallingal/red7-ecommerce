import type { Metadata, Viewport } from 'next';
import { Barlow_Condensed, Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { SideDrawer } from '@/components/storefront/SideDrawer';
import { SearchModal } from '@/components/storefront/SearchModal';
import { ToastNotification } from '@/components/ui/ToastNotification';
import { WhatsAppFloat } from '@/components/storefront/WhatsAppFloat';
import { BottomNav } from '@/components/storefront/BottomNav';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RED7 — Retro Football Kits & Streetwear Apparel',
  description:
    'Exclusive curated retro football jerseys, 2026/27 kits, oversized hoodies, and terrace culture sportswear. Express pan-India shipping & instant UPI.',
  keywords: [
    'RED7',
    'RED7 Football',
    'AC Milan 07/08 Home',
    'Argentina Messi Special Edition',
    'Football Jerseys India',
    'Streetwear Tracksuits',
    'Terrace Culture',
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white font-body-md text-on-surface antialiased min-h-screen flex flex-col">
        <QueryProvider>
          {children}
          <SideDrawer />
          <SearchModal />
          <ToastNotification />
          <WhatsAppFloat />
        </QueryProvider>
      </body>
    </html>
  );
}
