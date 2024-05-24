'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@/lib/hooks/auth';
import GoogleSignInButton from '@/components/ui/google-sign-in-button';
import { SignUpData } from '@/lib/types/auth-types';
import { setCookie } from '@/lib/utils';

export default function SignUpPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<SignUpData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const { mutateAsync } = useSignUp();

  const onSubmit = async (data: SignUpData) => {
    const token = await mutateAsync(data);
    setCookie('access_token', token.accessToken);
    window.location.replace('/map');
  };
  return (
    <div className="mx-auto flex h-dvh w-full flex-col items-center justify-center space-y-6 px-10 sm:w-[350px] sm:px-0">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Enter credentials to create new account</p>
      </div>
      <div className="grid w-full gap-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <div>
                <Label htmlFor="username">Uporabniško ime</Label>
                <Input
                  {...register('username')}
                  id="username"
                  placeholder="name@example.com"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="username"
                  autoCorrect="off"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>
              <div>
                <Label htmlFor="password">Geslo</Label>
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
            </div>
            <Button>Sign Up with Email</Button>
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
        <div className="flex w-full flex-col gap-2">
          <Button variant="outline" type="button" onClick={() => router.push(`/sign-in`)}>
            <p className="ml-2">Sign in with Credentials</p>
          </Button>
          <GoogleSignInButton />
        </div>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{' '}
        <Link href="/" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
