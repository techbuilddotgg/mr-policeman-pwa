import { GoogleProfile } from './passport.types';

export const createSessionUser = (
  accessToken: string,
  profile: GoogleProfile
) => {
  return {
    provider: profile.provider,
    displayName: profile.displayName,
    email: profile.email,
    accessToken,
  };
};
