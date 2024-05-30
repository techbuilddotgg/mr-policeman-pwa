import { api } from '@/lib/api/axios';
import { Endpoints } from '@/lib/api/endpoints';
import { Radar } from '@/lib/types/radar-types';

export const getRadars = async () => {
  const { data } = await api.get(`${Endpoints.RADARS}`);
  return data as Radar[];
};

export const getRadarById = async (id: string) => {
  const { data } = await api.get(`${Endpoints.RADARS}/${id}`);
  return data as Radar;
};
