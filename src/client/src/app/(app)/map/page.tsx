'use client';
import React, { useEffect, useState } from 'react';
import Map from 'react-map-gl';
import AdvancedMarker from '@/components/ui/advanced-marker';
import Modal from '@/components/ui/modal';
import ControlForm from '@/components/ui/control-form';
import mapboxgl from 'mapbox-gl';

const defaultCoordinatesValue = {
  latitude: 0,
  longitude: 0,
};

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState(defaultCoordinatesValue);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMarkerClick = () => {
    console.log('marker clicked');
  };

  const handleMapClick = (e: mapboxgl.MapLayerMouseEvent) => {
    setCoordinates({
      latitude: e.lngLat.lat,
      longitude: e.lngLat.lng,
    });

    handleOpenModal();
  };

  return (
    <div className="w-full">
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        children={<ControlForm latitude={coordinates.latitude} longitude={coordinates.longitude} />}
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
        <AdvancedMarker longitude={15.625555} latitude={46.559275} onClick={handleMarkerClick} />
      </Map>
    </div>
  );
}
