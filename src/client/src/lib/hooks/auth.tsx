import { useQuery } from '@tanstack/react-query';
import { authKeys } from '@/lib/api/key-factories';
import { getProfile } from '@/lib/api/auth-service';

export const useProfile = () =>
  useQuery({
    queryKey: authKeys.profile,
    queryFn: getProfile,
    retry: false,
  });
