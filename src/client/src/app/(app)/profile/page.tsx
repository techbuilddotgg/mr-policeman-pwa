import { Container, Heading, Text } from '@radix-ui/themes';
import ProfileForm from '@/components/ui/profile-form';
import SettingsForm from '@/components/ui/settings-form';
import { getProfile } from '@/lib/api/users-service';

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <Container size="1" className="mx-24 my-12 w-full" align="left">
      <Heading className="mb-4">{profile.username}</Heading>
      <Text className="mb-4 text-muted-foreground">
        Tukaj lahko urejate vse informacije o vašem profilu in nastavitve
      </Text>

      <div className="mt-12">
        <Heading size="4">Uredi profil</Heading>
        <Text className="mb-10 text-muted-foreground">Uredite informacije o vašem profilu</Text>
        <ProfileForm />
      </div>

      <div className="mt-12">
        <Heading size="4">Nastavitve</Heading>
        <Text className="mb-10 text-muted-foreground">
          Uredite nastavitve vašega profile znotraj aplikacije
        </Text>
        <SettingsForm />
      </div>
    </Container>
  );
}
