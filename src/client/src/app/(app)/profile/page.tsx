import { Heading, Text } from '@radix-ui/themes';
import { getProfile } from '@/lib/api/users-service';
import ProfilePageContent from '@/components/ui/profile-page-content';

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className="mx-24 mt-12 pb-44">
      <Heading className="mb-3">Zdravo {profile.username}</Heading>
      <Text className="mb-4 text-muted-foreground">
        Dobrodošli na strani za urejanje profila in nastavitev uporabnika. Tukaj lahko posodobite
        svoje osebne podatke in prilagodite nastavitve računa za najboljšo uporabniško izkušnjo.
      </Text>

      <ProfilePageContent />
    </div>
  );
}
