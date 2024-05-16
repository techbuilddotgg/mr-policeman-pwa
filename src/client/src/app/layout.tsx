import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import QueryClientProvider from '@/components/providers/query-client-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MR Policeman',
  description:
    'MR Policeman is your go-to companion for safer driving. Our app keeps you updated on police radar locations, helping you avoid speeding tickets and drive with confidence. With real-time alerts, a community-driven approach, and customizable features, MR Policeman is designed to enhance your driving experience.',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['MR Policeman', 'police radar', 'speeding tickets', 'driving', 'safety', 'alerts'],
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-144.png' },
    { rel: 'icon', url: 'icons/icon-144.png' },
    { rel: 'favicon', url: 'icons/icon-144.png' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
