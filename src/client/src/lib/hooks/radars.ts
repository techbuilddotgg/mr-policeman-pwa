import { useQuery } from '@tanstack/react-query';
import { getRadarById, getRadars } from '@/lib/api/radars-service';

export const useRadars = () => {
  return useQuery({
    queryKey: ['get-radars'],
    queryFn: getRadars,
  });
};

export const useRadarById = (id: string) => {
  return useQuery({
    queryKey: ['get-radar', id],
    queryFn: () => getRadarById(id),
  });
};
