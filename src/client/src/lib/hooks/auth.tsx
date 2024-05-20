import { MutationOptions, useMutation } from '@tanstack/react-query';
import { authKeys } from '@/lib/api/key-factories';
import { signIn, signUp } from '@/lib/api/auth-service';
import { Credentials, SignUpData, TokenResponse } from '@/lib/types/auth-types';

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
  options?: Omit<MutationOptions<TokenResponse, unknown, SignUpData>, 'mutationKey' | 'mutationFn'>,
) =>
  useMutation({
    ...options,
    mutationKey: authKeys.signUp,
    mutationFn: signUp,
  });
