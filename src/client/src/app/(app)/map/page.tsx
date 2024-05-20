'use client';
import React from 'react';
import Map from 'react-map-gl';
import AdvancedMarker from '@/components/ui/advanced-marker';

export default function Home() {
  return (
    <div className="w-full">
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
      >
        <AdvancedMarker longitude={15.63831} latitude={46.54199} color={'red'} />
      </Map>
    </div>
  );
}
