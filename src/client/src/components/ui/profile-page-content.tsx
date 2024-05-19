import { Heading, Text } from '@radix-ui/themes';
import ProfileForm from '@/components/ui/profile-form';
import { Suspense } from 'react';
import { getProfile } from '@/lib/api/users-service';
import SettingsForm from '@/components/ui/settings-form';

export default async function ProfilePageContent() {
  const profile = await getProfile();
  return (
    <>
      <div className="mt-14">
        <Heading size="4" className="mb-1">
          Uredi profil
        </Heading>
        <Text className="mb-10 text-muted-foreground">
          Uredite informacije o vašem profilu kot sta naprimer geslo in uporabniško ime.
        </Text>
        <Suspense fallback={'Loading'}>
          <ProfileForm profile={profile} />
        </Suspense>
      </div>
      <div className="mt-12">
        <Heading size="4" className="mb-1">
          Nastavitve
        </Heading>
        <Text className="mb-10 text-muted-foreground">
          Uredite nastavitve vašega profile znotraj aplikacije
        </Text>
        <SettingsForm />
      </div>
    </>
  );
}
