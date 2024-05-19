import React, { ReactNode } from 'react';
import AuthProvider from '@/components/providers/auth-provider';
import NavigationBar from '@/components/ui/navigation-bar';
import QueryClientProvider from '@/components/providers/query-client-provider';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
      <NavigationBar />
    </AuthProvider>
  );
}
