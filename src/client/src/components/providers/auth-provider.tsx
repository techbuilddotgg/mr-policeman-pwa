import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { validateSession } from '@/lib/api/auth-service';

interface AuthProviderProps {
  children: ReactNode;
}

export default async function AuthProvider({ children }: AuthProviderProps) {
  try {
    await validateSession();
  } catch (error) {
    return redirect('/sign-in');
  }

  return <>{children}</>;
}
