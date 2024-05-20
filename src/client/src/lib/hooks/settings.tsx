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
  }, [data?.state]);
  return { data, ...props };
};

export const useNotificationPermission = () => {
  const queryClient = useQueryClient();
  const { data, ...props } = useQuery({
    queryKey: ['notification-permission'],
    queryFn: () => navigator.permissions.query({ name: 'notifications' }),
  });
  useEffect(() => {
    if (data) {
      data.onchange = () => {
        queryClient.invalidateQueries({
          queryKey: ['notification-permission'],
        });
      };
    }
  }, [data?.state]);
  return { data, ...props };
};
