'use client';
import React, { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import AdvancedMarker from '@/components/ui/advanced-marker';
import Modal from '@/components/ui/modal';

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleMarkerClick = () => {
    console.log('marker clicked');
  };

  const handleMapClick = () => {
    console.log('map clicked');
    handleOpenModal();
  };

  return (
    <div className="w-full">
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        header="Modal Header"
        description="This is a description for the modal."
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
        onClick={handleMapClick}
      >
        <AdvancedMarker
          longitude={15.625555}
          latitude={46.559275}
          color={'blue'}
          onClick={handleMarkerClick}
        />
      </Map>
    </div>
  );
}
