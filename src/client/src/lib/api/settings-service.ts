export const getLocationPermission = async () => {
  return await navigator.permissions.query({ name: 'geolocation' });
};
