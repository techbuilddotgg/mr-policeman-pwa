'use client';

import { useForm } from 'react-hook-form';
import { Profile } from '@/lib/types/auth-types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useProfile, useProfileMutation } from '@/lib/hooks/users';
import { useQueryClient } from '@tanstack/react-query';
import { userKeys } from '@/lib/api/key-factories';
import { useRouter } from 'next/navigation';

interface ProfileForm extends Omit<Profile, 'id' | 'email'> {
  password: string;
}

export default function ProfileForm() {
  const router = useRouter();
  const { data: profile, isLoading } = useProfile();
  const queryClient = useQueryClient();
  const { handleSubmit, register, setValue } = useForm<ProfileForm>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { mutateAsync: updateProfile } = useProfileMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: userKeys.updateUser(),
      });
      router.refresh();
    },
  });
  const onSubmit = async (data: ProfileForm) => {
    await updateProfile(data);
  };

  useEffect(() => {
    setValue('username', profile?.username || '');
    setValue('password', '***************');
  }, [profile]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="grid gap-4">
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label className="" htmlFor="username">
              Username
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
          </div>
          <div className="grid gap-2">
            <Label className="" htmlFor="password">
              Geslo
            </Label>
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
        <Button className="w-fit ">Shrani</Button>
      </div>
    </form>
  );
}
