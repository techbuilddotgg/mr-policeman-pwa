import { MutationOptions, QueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { Profile, UpdateProfile } from '@/lib/types/auth-types';
import { authKeys, userKeys } from '@/lib/api/key-factories';
import { getProfile, updateProfile } from '@/lib/api/users-service';

export const useProfileMutation = (
  options?: Omit<MutationOptions<Profile, unknown, UpdateProfile>, 'mutationKey' | 'mutationFn'>,
) =>
  useMutation({
    ...options,
    mutationKey: userKeys.updateUser(),
    mutationFn: updateProfile,
  });
export const useProfile = (options?: Omit<QueryOptions<Profile>, 'queryKey' | 'queryFn'>) =>
  useQuery({
    ...options,
    queryKey: authKeys.profile,
    queryFn: getProfile,
  });
