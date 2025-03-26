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
  email: string;
  platforms: Platform;
  social: Social;
  friends: Friend;
}

export interface UserUpdate {
  name?: string;
  email?: string;
  platforms?: Platform;
  social?: Social;
}

export interface SearchUserResponse {
  username: string;
  name: string;
}

export interface SearchResponse {
  user: SearchUserResponse[];
  avatar: AvatarConfig2[] | AvatarConfig[];
}
