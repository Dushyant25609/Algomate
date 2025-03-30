import { LeaderboardRequest, LeaderboardResponse } from '../interface/leaderboard';
import api from './api';

// Define interface for leaderboard service errors
export interface LeaderboardServiceError {
  status: number;
  message: string;
  error?: string;
}

const leaderboardService = {
  // Get leaderboard data with default parameters
  getLeaderboard: async (): Promise<LeaderboardResponse> => {
    try {
      // Use default parameters
      const defaultParams: LeaderboardRequest = {
        sortBy: 'questions',
        page: 1,
        limit: 10,
      };

      const response = await api.post<LeaderboardResponse>('/pvt/leaderboard', defaultParams);
      return response.data;
    } catch (error) {
      // The API interceptor will format this error with status and message
      throw error as LeaderboardServiceError;
    }
  },

  // Get filtered leaderboard data with custom parameters
  getFilteredLeaderboard: async (
    params: Partial<LeaderboardRequest>
  ): Promise<LeaderboardResponse> => {
    try {
      // Set default values if not provided
      const requestBody: LeaderboardRequest = {
        sortBy: params.sortBy || 'questions',
        page: params.page || 1,
        limit: params.limit || 10,
      };

      const response = await api.post<LeaderboardResponse>('/leaderboard', requestBody);
      return response.data;
    } catch (error) {
      // The API interceptor will format this error with status and message
      throw error as LeaderboardServiceError;
    }
  },
};

export default leaderboardService;
