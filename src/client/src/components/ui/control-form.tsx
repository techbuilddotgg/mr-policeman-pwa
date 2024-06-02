import React, { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useControlMutation } from '@/lib/hooks/control';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Control } from '@/lib/types/control-types';
import { controlKeys } from '@/lib/api/key-factories';
import { Button } from '@/components/ui/button';

interface ControlFormProps {
  latitude: number;
  longitude: number;
}

const ControlForm: FC<ControlFormProps> = ({ latitude, longitude }) => {
  const queryClient = useQueryClient();
  const { handleSubmit, register, setValue, formState, resetField } = useForm<Control>({
    defaultValues: {
      name: '',
      description: '',
      latitude: latitude,
      longitude: longitude,
    },
  });

  const { mutateAsync: createControl } = useControlMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: controlKeys.controls,
      });
    },
  });

  const onSubmit = async (data: Control) => {
    if (!navigator.onLine) {
      await queryClient.setQueryData(controlKeys.controls, (controls: Control[]) => [
        ...controls,
        data,
      ]);
    }
    await createControl(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Dodaj novo policijsko kontrolo</DialogTitle>
        <DialogDescription>Vnesi podatke o novi policijski kontroli.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="name">Ime kontolne točke</Label>
        <Input
          {...register('name')}
          placeholder="Ime"
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
        />
        <Label htmlFor="description">Opis kontrolne točke</Label>
        <Input
          {...register('description')}
          placeholder="Opis"
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
        />
        <DialogFooter className={'mt-5'}>
          <DialogClose asChild>
            <Button type="submit">Shrani</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </>
  );
};

export default ControlForm;
