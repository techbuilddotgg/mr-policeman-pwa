'use client';
import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from '@/lib/hooks/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, isLoading } = useSession();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!session?.user) {
    return redirect('/login');
  }
  return <>{children}</>;
}
