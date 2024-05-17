import { MutationOptions, useMutation, useQuery } from '@tanstack/react-query';
import { authKeys } from '@/lib/api/key-factories';
import { getProfile, signIn, signUp } from '@/lib/api/auth-service';
import { Credentials, TokenResponse } from '@/lib/types/auth-types';

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

export const useSignUp = (
  options?: Omit<
    MutationOptions<TokenResponse, unknown, Credentials>,
    'mutationKey' | 'mutationFn'
  >,
) =>
  useMutation({
    ...options,
    mutationKey: authKeys.signUp,
    mutationFn: signUp,
  });
