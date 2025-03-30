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
  pagination: LeaderboardPagination;
}

/**
 * Interface for the leaderboard request parameters
 */
export interface LeaderboardRequest {
  sortBy?: 'questions' | 'rating' | 'ranking';
  page?: number;
  limit?: number;
}
