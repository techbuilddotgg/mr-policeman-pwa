'use client';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { useGeolocationPermission } from '@/lib/hooks/settings';

export default function SettingsForm() {
  const { setTheme, theme } = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const { data: locationPermission, isLoading } = useGeolocationPermission();
  const themeSwitchRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {});
  }, [locationPermission]);

  const getLocationPermissionStatus = () => {
    if (isLoading) return 'Nalaganje...';
    if (locationPermission?.state === 'granted') {
      return 'Dovoljen';
    } else if (locationPermission?.state === 'denied') {
      return 'Zavrnjen';
    } else {
      return 'Vedno vprašaj';
    }
  };

  useEffect(() => {
    setDarkMode(theme === 'dark');
  }, [theme]);
  return (
    <>
      <div className="mt-4 flex flex-col gap-5">
        <div className="flex items-center space-x-2">
          <Label htmlFor="dark-mode">Temna tema</Label>
          <Switch
            id="dark-mode"
            checked={darkMode}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
        </div>
        <div className="flex flex-col">
          <Label>Dostop do lokacije: {getLocationPermissionStatus()}</Label>
          <p className="text-sm text-muted-foreground">
            To nastavitev lahko urejate v nastavitvah brskalnika ali s klikom na ikono na desni
            strani v naslovni vrstici.
          </p>
        </div>
      </div>
    </>
  );
}
