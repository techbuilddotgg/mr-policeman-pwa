import { api } from '@/lib/api/axios';
import { Endpoints } from '@/lib/api/endpoints';

export const getSession = async () => {
  const { data } = await api.get(`${Endpoints.AUTH}/session`, {
    withCredentials: true,
  });
  return data;
};
