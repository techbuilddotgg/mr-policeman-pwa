import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Contribution } from '@/lib/types/contributions-types';
import { GeoLocation } from '@/lib/types/common';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export function deleteCookie(name: string) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/`;
}

export function isServer() {
  return typeof window === 'undefined';
}

export const getPermissionStatusLabel = (permission?: PermissionState) => {
  if (permission === 'granted') {
    return 'Dovoljen';
  }
  if (permission === 'denied') {
    return 'Zavrnjen';
  }
  if (permission === 'prompt') {
    return 'Vedno vprašaj';
  }
  return '/';
};

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
};

export const formatDateTime = (isoDateString: string) => {
  const datetime = new Date(isoDateString);
  const date = formatDate(isoDateString);

  const hours = datetime.getHours().toString().padStart(2, '0');
  const minutes = datetime.getMinutes().toString().padStart(2, '0');
  const seconds = datetime.getSeconds().toString().padStart(2, '0');

  return date + ' ' + hours + ':' + minutes + ':' + seconds;
};

export const getUserGeoLocation = async (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export function haversineDistanceBetweenPoints(location1: GeoLocation, location2: GeoLocation) {
  const R = 6371e3;
  const p1 = (location1.latitude * Math.PI) / 180;
  const p2 = (location2.latitude * Math.PI) / 180;
  const deltaLon = location2.longitude - location1.longitude;
  const deltaLambda = (deltaLon * Math.PI) / 180;
  const d =
    Math.acos(Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(deltaLambda)) *
    R;
  return d;
}

export const getContributionsTextOfToday = (contributions: Contribution[]): string => {
  const today = new Date().toISOString().split('T')[0];
  const contributionsString = contributions
    .filter((contribution) => contribution.createdAt.split('T')[0] === today)
    .map((contribution) => contribution.text)
    .join(' ');
  if (contributionsString.length === 0) return 'Danes še ni novih prispevkov.';

  return 'Novi prispevki na današnji dan so...' + contributionsString;
};
