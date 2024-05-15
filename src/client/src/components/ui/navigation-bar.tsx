import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

export default function NavigationBar() {
  return (
    <Tabs defaultValue="map" className="fixed bottom-14 left-1/2 h-16 w-[600px] -translate-x-1/2">
      <TabsList className="grid h-full w-full grid-cols-2 ">
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
      </TabsList>
    </Tabs>
  );
}
