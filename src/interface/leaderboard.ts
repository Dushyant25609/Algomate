import { AvatarConfig, AvatarConfig2 } from './avatar';
import { LeetCodeUserData } from './leetcode';
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

/**
 * Interface for the complete leaderboard response
 */
export interface LeaderboardResponse {
  data: LeaderboardUserProfile[];
  avatars: AvatarConfig[] | AvatarConfig2[];
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
