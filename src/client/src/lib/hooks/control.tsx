import { MutationOptions, QueryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { Control } from '@/lib/types/control-types';
import { createControl, getControl, getControls } from '@/lib/api/control-service';
import { controlKeys } from '@/lib/api/key-factories';

export const useControlMutation = (
  options?: Omit<MutationOptions<Control, unknown, Control>, 'mutationKey' | 'mutationFn'>,
) =>
  useMutation({
    ...options,
    mutationKey: controlKeys.createControl(),
    mutationFn: createControl,
  });

export const useControl = (
  id: string,
  options?: Omit<QueryOptions<Control>, 'queryKey' | 'queryFn'>,
) =>
  useQuery({
    ...options,
    queryKey: controlKeys.control,
    queryFn: () => getControl(id), // Pass a function reference here
  });

export const useControls = () => {
  return useQuery({
    queryKey: ['all'],
    queryFn: getControls,
  });
};
