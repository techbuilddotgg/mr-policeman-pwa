import { api } from '@/lib/api/axios';
import { Endpoints } from '@/lib/api/endpoints';
import { Credentials, TokenResponse } from '@/lib/types/auth-types';

export const validateSession = async () => {
  await api.get(`${Endpoints.AUTH}/session`);
};
export const signIn = async (credentials: Credentials) => {
  const { data } = await api.post(`${Endpoints.AUTH}/sign-in`, credentials);
  return data as TokenResponse;
};

export const signUp = async (credentials: Credentials) => {
  const { data } = await api.post(`${Endpoints.AUTH}/sign-up`, credentials);
  return data as TokenResponse;
};
