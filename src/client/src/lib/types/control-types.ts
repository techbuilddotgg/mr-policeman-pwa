export interface Control {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  upVotes?: number;
  downVotes?: number;
  createdAt?: string;
}
