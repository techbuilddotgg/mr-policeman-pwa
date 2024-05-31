import { useEffect, useState } from 'react';

export function useUserGeoLocation() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = () => {
    setLocation(null);
    setError(null);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }

    function handleSuccess(position: GeolocationPosition) {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    }

    function handleError(error: any) {
      setError(error.message);
    }

    const watchId = navigator.geolocation.watchPosition(handleSuccess, handleError);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { location, error, refresh };
}
