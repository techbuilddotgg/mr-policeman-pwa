import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getProfile } from '@/lib/api/auth-service';

interface AuthProviderProps {
  children: ReactNode;
}

export default async function AuthProvider({ children }: AuthProviderProps) {
  let profile;
  try {
    profile = await getProfile();
  } catch (error) {
    return redirect('/sign-in');
  }

  if (!profile?.user) {
    return redirect('/sign-in');
  }
  return <>{children}</>;
}
