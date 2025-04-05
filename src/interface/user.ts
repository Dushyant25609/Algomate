import { Social } from './social';
import { Platform } from './platform';
import { Friend } from './friend';
import { AvatarConfig, AvatarConfig2 } from './avatar';

export interface User {
  googleId?: string; // For OAuth users
  githubToken?: string; // For OAuth users
  refreshToken?: string; // For OAuth users
  name: string;
  username: string;
  college?: string;
  country?: string;
  city?: string;
  company?: string;
  email: string;
  platforms: Platform;
  social: Social;
  friends: Friend;
  bio?: string;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  platforms?: Platform;
  social?: Social;
  college?: string;
  country?: string;
  city?: string;
  company?: string;
  bio?: string;
}

export interface SearchUserResponse {
  username: string;
  name: string;
}

export interface SearchResponse {
  user: SearchUserResponse[];
  avatar: AvatarConfig2[] | AvatarConfig[];
}
