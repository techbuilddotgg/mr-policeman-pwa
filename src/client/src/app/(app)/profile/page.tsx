import { Heading, Text } from '@radix-ui/themes';
import ProfileForm from '@/components/ui/profile-form';
import SettingsForm from '@/components/ui/settings-form';
import { getProfile } from '@/lib/api/users-service';

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className="mx-24 my-12">
      <Heading className="mb-3">{profile.username}</Heading>
      <Text className="mb-4 text-muted-foreground">
        Dobrodošli na strani za urejanje profila in nastavitev uporabnika. Tukaj lahko posodobite
        svoje osebne podatke in prilagodite nastavitve računa za najboljšo uporabniško izkušnjo.
      </Text>

      <div className="mt-12">
        <Heading size="4" className="mb-1">
          Uredi profil
        </Heading>
        <Text className="mb-10 text-muted-foreground">
          Uredite informacije o vašem profilu kot sta naprimer geslo in uporabniško ime.
        </Text>
        <ProfileForm />
      </div>

      <div className="mt-12">
        <Heading size="4">Nastavitve</Heading>
        <Text className="mb-10 text-muted-foreground">
          Uredite nastavitve vašega profile znotraj aplikacije
        </Text>
        <SettingsForm />
      </div>
    </div>
  );
}
