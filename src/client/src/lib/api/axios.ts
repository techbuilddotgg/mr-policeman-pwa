import axios from 'axios';
import { env } from '@/env.mjs';
import { getCookie } from '@/lib/utils';

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getCookie('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
