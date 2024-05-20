'use client';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useGeolocationPermission, useNotificationPermission } from '@/lib/hooks/settings';
import { Button } from '@/components/ui/button';
import { deleteCookie, getPermissionStatusLabel } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function SettingsForm() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const { data: locationPermission, isLoading } = useGeolocationPermission();
  const { data: notificationPermission } = useNotificationPermission();

  const onClickLogout = () => {
    deleteCookie('access_token');
    router.refresh();
  };

  useEffect(() => {
    setDarkMode(theme === 'dark');
  }, [theme]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(() => {});
    Notification.requestPermission();
  }, []);

  return (
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
        <Label>Obvestila: {getPermissionStatusLabel(notificationPermission?.state)}</Label>
        <p className="text-sm text-muted-foreground">
          To nastavitev lahko urejate v nastavitvah brskalnika ali s klikom na ikono za informacije
          na levi strani naslovne vrstice.
        </p>
      </div>
      <div className="flex flex-col">
        <Label>Dostop do lokacije: {getPermissionStatusLabel(locationPermission?.state)}</Label>
        <p className="text-sm text-muted-foreground">
          To nastavitev lahko urejate v nastavitvah brskalnika ali s klikom na ikono za informacije
          na levi strani naslovne vrstice.
        </p>
      </div>
      <Button className="flex-start w-fit" variant="destructive" onClick={onClickLogout}>
        Odjava
      </Button>
    </div>
  );
}
