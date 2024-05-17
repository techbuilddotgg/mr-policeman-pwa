import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query';
import { authKeys } from '@/lib/api/key-factories';
import { getProfile, signIn } from '@/lib/api/auth-service';
import { TokenResponse } from '@/lib/types/auth-types';
import { Credentials } from '@/app/sign-in/page';

export const useProfile = () =>
  useQuery({
    queryKey: authKeys.profile,
    queryFn: getProfile,
    retry: false,
  });

export const useSignIn = (
  options?: Omit<
    MutationOptions<TokenResponse, unknown, Credentials>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    ...options,
    mutationKey: authKeys.signIn,
    mutationFn: signIn,
  });
