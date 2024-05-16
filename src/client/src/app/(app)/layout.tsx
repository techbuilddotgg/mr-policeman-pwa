import { ReactNode } from 'react';
import AuthProvider from '@/components/providers/auth-provider';
import NavigationBar from '@/components/ui/navigation-bar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <NavigationBar />
    </AuthProvider>
  );
}
