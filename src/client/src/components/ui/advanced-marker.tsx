import React, { FC } from 'react';
import { Marker } from 'react-map-gl';

interface AdvancedMarkerProps {
  longitude: number;
  latitude: number;
  color: string;
  onClick?: () => void;
}

const AdvancedMarker: FC<AdvancedMarkerProps> = ({ longitude, latitude, color, onClick }) => {
  return (
    <Marker longitude={longitude} latitude={latitude} color={color} onClick={onClick}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ cursor: 'pointer', color: 'red' }}
      >
        <svg height="40" width="40" viewBox="0 0 24 24" style={{ fill: 'red', stroke: 'none' }}>
          <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 5.9 11 6.3 11.4.1.1.3.1.4 0C12.1 20 18 14.2 18 9c0-3.9-3.1-7-6-7zm0 9.5c-1.3 0-2.5-1.2-2.5-2.5S10.7 6.5 12 6.5s2.5 1.2 2.5 2.5-1.2 2.5-2.5 2.5z" />
        </svg>
      </div>
    </Marker>
  );
};

export default AdvancedMarker;
