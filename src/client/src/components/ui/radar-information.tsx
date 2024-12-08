import React from 'react';
import { Radar } from '@/lib/types/radar-types';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ReverseGeocoding from '@/components/ui/reverse-geocoding';
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog';
import { Button } from '@/components/ui/button';

interface RadarInformationProps {
  radar: Radar;
}

const RadarInformation = ({ radar }: RadarInformationProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Radar</DialogTitle>
        <DialogDescription>
          <br />
          <ReverseGeocoding
            latitude={radar.latitude as number}
            longitude={radar.longitude as number}
          />
        </DialogDescription>
      </DialogHeader>
      <DialogBody className={'mt-3'}>Omejitev hitrosti: {radar.speedLimit}</DialogBody>
      <DialogFooter className={'mt-5'}>
        <DialogClose asChild>
          <Button variant="ghost">Zapri</Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

export default RadarInformation;
