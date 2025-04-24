import { AvatarConfig, AvatarConfig2 } from './avatar';
import { LeetCodeUserData, userProfile } from './leetcode';
import { Questions } from './questions';

export interface LeaderboardUserProfile {
  id: string;
  username: string;
  questions?: Questions;
  leetcode?: LeetCodeUserData;
}

export interface LeaderboardPagination {
  page: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
}

export interface performer {
  type: string;
  profile: userProfile;
  avatar: AvatarConfig | AvatarConfig2; // or replace with actual avatar type if you have it
  score: number;
}

/**
 * Interface for the complete leaderboard response
 */
export interface LeaderboardResponse {
  data: LeaderboardUserProfile[];
  avatars: AvatarConfig[] | AvatarConfig2[];
  topPerformers: performer[];
  pagination: LeaderboardPagination;
}

/**
 * Interface for the leaderboard request parameters
 */
export type LeaderboardSortBy = 'questions' | 'rating' | 'ranking';

export interface LeaderboardRequest {
  sortBy?: LeaderboardSortBy;
  page?: number;
  limit?: number;
}
