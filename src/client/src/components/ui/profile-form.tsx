'use client';

import { useForm } from 'react-hook-form';
import { UpdateProfile } from '@/lib/types/auth-types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useProfile, useProfileMutation } from '@/lib/hooks/users';
import { useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/lib/api/key-factories';
import { useRouter } from 'next/navigation';

export default function ProfileForm() {
  const router = useRouter();
  const { data: profile, isLoading } = useProfile();
  const queryClient = useQueryClient();

  const { handleSubmit, register, setValue, formState, resetField } = useForm<UpdateProfile>({
    defaultValues: {
      username: profile?.username || '',
      password: '',
    },
  });

  const { mutateAsync: updateProfile } = useProfileMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: userKeys.updateUser(),
      });
      router.refresh();
      resetField('password');
    },
  });

  const onSubmit = async (data: UpdateProfile) => {
    await updateProfile(data);
  };

  useEffect(() => {
    if (profile) {
      setValue('username', profile.username || '');
      setValue('password', '');
    }
  }, [profile]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="grid gap-4">
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register('username')}
              placeholder="name@example.com"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="off"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="text" value={profile?.email || ''} disabled />
          </div>
          {profile?.provider === 'email' && (
            <div className="grid gap-2">
              <Label htmlFor="password">Novo Geslo</Label>
              <Input
                {...register('password')}
                placeholder="********"
                type="password"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>
          )}
        </div>
        <Button className="w-fit">Shrani</Button>
      </div>
    </form>
  );
}
