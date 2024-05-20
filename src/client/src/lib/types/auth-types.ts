export interface TokenResponse {
  accessToken: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface SignUpData {
  username: string;
  email: string;
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
  password: string | null;
}
