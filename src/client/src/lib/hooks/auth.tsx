import { useQuery } from '@tanstack/react-query';
import { KEYS } from '@/lib/api/keys';
import { getSession } from '@/lib/api/auth-service';

export const useSession = () =>
  useQuery({
    queryKey: [KEYS.AUTH, KEYS.SESSION, KEYS.GET],
    queryFn: getSession,
    retry: false,
  });
