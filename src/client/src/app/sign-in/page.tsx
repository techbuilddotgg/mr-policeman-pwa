'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@/lib/hooks/auth';
import GoogleSignInButton from '@/components/ui/google-sign-in-button';
import { Credentials } from '@/lib/types/auth-types';
import { setCookie } from '@/lib/utils';
import LoadingButton from '@/components/ui/loading-button';
import { useToast } from '@/components/ui/use-toast';

export default function SignInPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<Credentials>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { toast } = useToast();
  const { mutateAsync, isPending } = useSignIn({
    onSuccess: async (data) => {
      setCookie('access_token', data.accessToken);
      window.location.replace('/map');
    },
    onError: () => {
      toast({
        title: 'Prijava neuspešna',
        description: 'Preverite vaše podatke in poskusite znova',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (data: Credentials) => {
    await mutateAsync(data);
  };
  return (
    <div className="mx-auto flex h-dvh w-full flex-col items-center justify-center space-y-6 px-10 sm:w-[350px] sm:px-0">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Prijava v račun</h1>
        <p className="text-sm text-muted-foreground">
          Vnesite podatke če se želite prijaviti v račun
        </p>
      </div>
      <div className="grid w-full gap-7">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="username"
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
            <LoadingButton className="" isLoading={isPending}>
              Potrdi
            </LoadingButton>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Ali nadaljujte z</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button variant="outline" type="button" onClick={() => router.push(`/sign-up`)}>
            <p className="ml-2">Prijava z obstoječim računom</p>
          </Button>
          <GoogleSignInButton />
        </div>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        S klikom na nadaljujete se strinjate z našimi Pogoji uporabe in Pravilnikom o zasebnosti .
      </p>
    </div>
  );
}
