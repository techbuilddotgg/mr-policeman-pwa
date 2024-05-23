'use client';
import React, { useEffect, useState } from 'react';
import Map from 'react-map-gl';
import AdvancedMarker from '@/components/ui/advanced-marker';
import Modal from '@/components/ui/modal';
import ControlForm from '@/components/ui/control-form';
import mapboxgl from 'mapbox-gl';
import { useControls } from '@/lib/hooks/control';
import { Control } from '@/lib/types/control-types';
import ControlInformation from '@/components/ui/control-information';

const defaultCoordinatesValue = {
  latitude: 0,
  longitude: 0,
};

enum ModalContent {
  Form = 'form',
  Info = 'info',
}

export default function Home() {
  const { data: controls, isLoading, refetch } = useControls();
  const [isModalOpen, setModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState(defaultCoordinatesValue);
  const [content, setContent] = useState(ModalContent.Form);
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    refetch().then(() => setModalOpen(false));
  };

  const handleMarkerClick = (control: Control) => {
    console.log('Marker clicked:', control);
    setSelectedControl(control);
    setContent(ModalContent.Info);
    handleOpenModal();
  };

  const handleMapClick = (e: mapboxgl.MapLayerMouseEvent) => {
    setCoordinates({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });

    setContent(ModalContent.Form);

    handleOpenModal();
  };

  console.log(controls);

  useEffect(() => {
    if (!controls || !Array.isArray(controls)) {
      console.error('Controls data is not an array or is undefined');
    }
  }, [controls]);

  return (
    <div className="w-full">
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        children={
          content === ModalContent.Form ? (
            <ControlForm latitude={coordinates.latitude} longitude={coordinates.longitude} />
          ) : content === ModalContent.Info ? (
            <ControlInformation control={selectedControl} />
          ) : null
        }
      />
      <Map
        reuseMaps
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: 15.625555,
          latitude: 46.559275,
          zoom: 14,
        }}
        style={{ height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={(e) => handleMapClick(e)}
      >
        {!isLoading &&
          controls?.map((control) => (
            <AdvancedMarker
              key={control.id}
              longitude={control.longitude}
              latitude={control.latitude}
              data={control}
              onClick={handleMarkerClick}
            />
          ))}
      </Map>
    </div>
  );
}
