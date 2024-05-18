export interface TokenResponse {
  accessToken: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface Profile {
  id: string;
  email: string;
  username: string;
}

export interface UpdateProfile {
  username: string;
  password: string;
}
