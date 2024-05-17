'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { env } from '@/env.mjs';
import { Endpoints } from '@/lib/api/endpoints';
import { useSignIn } from '@/lib/hooks/auth';

export interface Credentials {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<Credentials>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { mutateAsync } = useSignIn({
    onSuccess: () => router.replace('/map'),
  });

  const onSubmit = async (data: Credentials) => {
    await mutateAsync(data);
  };
  return (
    <div className="mx-auto flex h-dvh w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to sign in to your account
        </p>
      </div>
      <div className="grid w-full gap-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                {...register('username')}
                id="username"
                placeholder="name@example.com"
                type="username"
                autoCapitalize="none"
                autoComplete="username"
                autoCorrect="off"
              />
              <Input
                {...register('password')}
                id="password"
                placeholder="****"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
              />
            </div>
            <Button>Sign In with Email</Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          variant="outline"
          type="button"
          onClick={() => router.push(`${env.NEXT_PUBLIC_BACKEND_URL}${Endpoints.AUTH}/google`)}
        >
          <Image src="/google-icon.png" alt="Google logo" width={20} height={20} />
        </Button>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
