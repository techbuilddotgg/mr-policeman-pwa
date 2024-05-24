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
import { getUserGeoLocation } from '@/lib/utils';

const defaultCoordinatesValue = {
  latitude: 0,
  longitude: 0,
};

enum ModalContent {
  Form = 'form',
  Info = 'info',
}

export default function Home() {
  const { data: controls, isLoading } = useControls();
  const [isModalOpen, setModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState(defaultCoordinatesValue);
  const [content, setContent] = useState(ModalContent.Form);
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = async () => {
    setModalOpen(false);
  };

  const handleMarkerClick = (control: Control) => {
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

  useEffect(() => {
    getUserGeoLocation()
      .then((position) => {
        console.log(position.coords.longitude);
        console.log(position.coords.latitude);
        setUserLocation(position.coords);
      })
      .catch((err) => {
        setUserLocation(null);
        console.error(err);
      });
  }, []);

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
          longitude: userLocation?.longitude || 15.6361,
          latitude: userLocation?.latitude || 46.0569,
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
