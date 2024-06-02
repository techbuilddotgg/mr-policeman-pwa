import React, { FC } from 'react';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog';
import { Control } from '@/lib/types/control-types';
import { formatDateTime } from '@/lib/utils';
import ReverseGeocoding from '@/components/ui/reverse-geocoding';

interface ControlInformationProps {
  control: Control | null;
}

const ControlInformation: FC<ControlInformationProps> = ({ control }) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>{control?.name}</DialogTitle>
        <DialogDescription>
          {control?.createdAt && formatDateTime(control.createdAt)}
          <br />
          <ReverseGeocoding
            latitude={control?.latitude as number}
            longitude={control?.longitude as number}
          />
        </DialogDescription>
      </DialogHeader>
      <DialogBody className={'mt-3'}>{control?.description}</DialogBody>
      <DialogFooter className={'mt-5'}>
        <DialogClose asChild>
          <Button variant="ghost">Zapri</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

export default ControlInformation;
