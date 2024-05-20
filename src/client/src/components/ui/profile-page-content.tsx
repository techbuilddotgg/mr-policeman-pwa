'use client';
import { Heading, Text } from '@radix-ui/themes';
import { Suspense } from 'react';
import ProfileForm from '@/components/ui/profile-form';
import SettingsForm from '@/components/ui/settings-form';
import LoadingView from '@/components/ui/loading-view';
import { useProfilePageData } from '@/lib/hooks/users';

export default function ProfilePageContent() {
  const { isLoading } = useProfilePageData();
  return (
    <div className="grid min-h-[70vh]">
      <LoadingView isLoading={isLoading}>
        <div className="mt-14">
          <Heading size="4" className="mb-1">
            Uredi profil
          </Heading>
          <Text className="mb-10 text-muted-foreground">
            Uredite informacije o vašem profilu kot sta naprimer geslo in uporabniško ime.
          </Text>
          <Suspense fallback={'Loading'}>
            <ProfileForm />
          </Suspense>
        </div>
        <div className="mt-14">
          <Heading size="4" className="mb-1">
            Nastavitve
          </Heading>
          <Text className="mb-10 text-muted-foreground">
            Uredite nastavitve vašega profile znotraj aplikacije
          </Text>
          <SettingsForm />
        </div>
      </LoadingView>
    </div>
  );
}
