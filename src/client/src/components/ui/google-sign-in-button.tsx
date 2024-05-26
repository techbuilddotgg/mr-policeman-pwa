import { env } from '@/env.mjs';
import { Endpoints } from '@/lib/api/endpoints';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function GoogleSignInButton() {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      type="button"
      onClick={() => router.push(`${env.NEXT_PUBLIC_BACKEND_URL}${Endpoints.AUTH}/google` as any)}
    >
      <Image src="/google-icon.png" alt="Google logo" width={20} height={20} />
      <p className="ml-2">Prijava z Google računom</p>
    </Button>
  );
}
