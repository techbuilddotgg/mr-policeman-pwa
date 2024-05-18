import { api } from '@/lib/api/axios';
import { Endpoints } from '@/lib/api/endpoints';
import { Profile, UpdateProfile } from '@/lib/types/auth-types';

export const getProfile = async () => {
  const { data } = await api.get(`${Endpoints.USERS}/profile`);
  return data as Profile;
};

export const updateProfile = async (profile: UpdateProfile) => {
  const { data } = await api.patch(`${Endpoints.USERS}/`, profile);
  return data as Profile;
};
