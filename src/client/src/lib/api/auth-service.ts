import { api } from '@/lib/api/axios';
import { Endpoints } from '@/lib/api/endpoints';

export const getProfile = async () => {
  const { data } = await api.get(`${Endpoints.AUTH}/profile`);
  return data;
};
