import { api } from '@/lib/api/axios';
import { Endpoints } from '@/lib/api/endpoints';
import { Control } from '@/lib/types/control-types';

export const getControls = async () => {
  const { data } = await api.get(`${Endpoints.CONTROLS}`);
  return data as Control[];
};

export const getControl = async (id: string) => {
  const { data } = await api.get(`${Endpoints.CONTROLS}/${id}`);
  return data as Control;
};

export const createControl = async (control: Control) => {
  const { data } = await api.post(`${Endpoints.CONTROLS}`, control);
  return data as Control;
};
