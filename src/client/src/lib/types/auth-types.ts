export interface TokenResponse {
  accessToken: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export enum Provider {
  GOOGLE = 'google',
  EMAIL = 'email',
}
export interface Profile {
  id: string;
  email: string;
  username: string;
  provider: Provider;
}

export interface UpdateProfile {
  username: string;
  password: string;
}
