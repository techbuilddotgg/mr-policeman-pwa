import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';

interface ReverseGeocodingProps {
  latitude: number;
  longitude: number;
}

const ReverseGeocoding: FC<ReverseGeocodingProps> = ({ latitude, longitude }) => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json`,
          {
            params: {
              access_token: MAPBOX_TOKEN,
            },
          },
        );

        const place = response.data.features[0];
        if (place) {
          setAddress(place.place_name);
        } else {
          setAddress('Address not found');
        }
      } catch (error) {
        console.error(error);
        setAddress('Could not find address');
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  return <>{address}</>;
};

export default ReverseGeocoding;
