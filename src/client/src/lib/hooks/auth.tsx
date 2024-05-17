import { useQuery } from '@tanstack/react-query';
import { KEYS } from '@/lib/api/keys';
import { getProfile } from '@/lib/api/auth-service';

export const useProfile = () =>
  useQuery({
    queryKey: [KEYS.AUTH, KEYS.SESSION, KEYS.GET],
    queryFn: getProfile,
    retry: false,
  });
