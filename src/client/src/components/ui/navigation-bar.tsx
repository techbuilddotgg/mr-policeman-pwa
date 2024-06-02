'use client';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
  const pathname = usePathname();
  const getDefault = () => {
    return pathname.replace('/', '');
  };

  return (
    <Tabs
      defaultValue={getDefault()}
      className="fixed bottom-5 left-1/2 h-32 w-11/12 -translate-x-1/2 sm:bottom-14 sm:h-16 sm:w-[600px]"
    >
      <TabsList className="flex h-full w-full flex-col sm:flex-row">
        <Link href="/map" className="h-full w-full p-0.5">
          <TabsTrigger className="h-full w-full" value="map">
            Zemljevid
          </TabsTrigger>
        </Link>
        <Link href="/articles" className="h-full w-full p-0.5">
          <TabsTrigger className="h-full w-full" value="articles">
            Prispevki
          </TabsTrigger>
        </Link>
        <Link href="/profile" className="h-full w-full p-0.5">
          <TabsTrigger className="h-full w-full" value="profile">
            Profil
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
