import {
  MutationOptions,
  QueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Profile, UpdateProfile } from '@/lib/types/auth-types';
import { authKeys, userKeys } from '@/lib/api/key-factories';
import { getProfile, updateProfile } from '@/lib/api/users-service';
import { getLocationPermission } from '@/lib/api/settings-service';

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

export const useProfilePageData = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['all'],
    queryFn: async () => {
      await queryClient.prefetchQuery({
        queryKey: authKeys.profile,
        queryFn: getProfile,
      });
      await queryClient.prefetchQuery({
        queryKey: ['geolocation-permission'],
        queryFn: getLocationPermission,
      });
      return {};
    },
  });
};
