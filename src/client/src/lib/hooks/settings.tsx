import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGeolocationPermission = () => {
  const queryClient = useQueryClient();
  const { data, ...props } = useQuery({
    queryKey: ['geolocation-permission'],
    queryFn: () => navigator.permissions.query({ name: 'geolocation' }),
  });
  useEffect(() => {
    if (data) {
      data.onchange = () => {
        queryClient.invalidateQueries({
          queryKey: ['geolocation-permission'],
        });
      };
    }
  }, [data]);
  return { data, ...props };
};
