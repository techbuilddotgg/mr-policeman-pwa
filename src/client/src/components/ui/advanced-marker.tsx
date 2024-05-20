import React, { FC } from 'react';
import { Marker } from 'react-map-gl';

interface AdvancedMarkerProps {
  longitude: number;
  latitude: number;
  color: string;
}

const AdvancedMarker: FC<AdvancedMarkerProps> = ({ longitude, latitude, color }) => {
  return (
    <div>
      <Marker longitude={longitude} latitude={latitude} color={color} />
    </div>
  );
};

export default AdvancedMarker;
