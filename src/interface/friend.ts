import { AvatarConfig, AvatarConfig2 } from './avatar';

export interface Friend {
  pending: Request[];
  accepted: string[];
}

export interface Request {
  type: 'sent' | 'received';
  username: string;
}

export interface PendingRequests {
  requests: Request[];
  avatars: AvatarConfig[] | AvatarConfig2[];
}

export interface UserFriends {
  friends: string[];
  avatars: AvatarConfig[] | AvatarConfig2[];
}
