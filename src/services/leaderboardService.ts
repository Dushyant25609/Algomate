import { LeaderboardRequest, LeaderboardResponse } from '../interface/leaderboard';
import api from './api';

// Define interface for leaderboard service errors
export interface LeaderboardServiceError {
  status: number;
  message: string;
  error?: string;
}

const leaderboardService = {
  // Get leaderboard data
  getLeaderboard: async (): Promise<LeaderboardResponse> => {
    try {
      const response = await api.post<LeaderboardResponse>('/pvt/leaderboard');
      return response.data;
    } catch (error) {
      // The API interceptor will format this error with status and message
      throw error as LeaderboardServiceError;
    }
  },

  // Get filtered leaderboard data (optional parameters for future expansion)
  getFilteredLeaderboard: async (params?: LeaderboardRequest): Promise<LeaderboardResponse> => {
    try {
      const queryParams = new URLSearchParams();

      if (params?.limit) {
        queryParams.append('limit', params.limit.toString());
      }

      if (params?.page) {
        queryParams.append('page', params.page.toString());
      }

      if (params?.sortBy) {
        queryParams.append('sortBy', params.sortBy);
      }

      const queryString = queryParams.toString();
      const url = `/pvt/leaderboard${queryString ? `?${queryString}` : ''}`;

      const response = await api.post<LeaderboardResponse>(url);
      return response.data;
    } catch (error) {
      // The API interceptor will format this error with status and message
      throw error as LeaderboardServiceError;
    }
  },
};

export default leaderboardService;
