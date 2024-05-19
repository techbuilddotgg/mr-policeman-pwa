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
      className="fixed bottom-14 left-1/2 h-16 w-[600px] -translate-x-1/2"
    >
      <TabsList className="flex h-full w-full">
        <Link href="/map" className="h-full w-full  p-0.5">
          <TabsTrigger className="h-full w-full" value="map">
            Map
          </TabsTrigger>
        </Link>
        <Link href="/articles" className="h-full w-full p-0.5">
          <TabsTrigger className="h-full w-full" value="articles">
            Articles
          </TabsTrigger>
        </Link>
        <Link href="/profile" className="h-full w-full p-0.5">
          <TabsTrigger className="h-full w-full" value="profile">
            Profile
          </TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
}
