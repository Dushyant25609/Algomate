import {
  LeaderboardRequest,
  LeaderboardResponse,
  LeaderboardUserProfile,
} from '@/interface/leaderboard';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state interface with additional UI properties
interface LeaderboardState extends LeaderboardResponse {
  loading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: LeaderboardState = {
  data: [],
  avatars: [],
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  },
  loading: false,
  error: null,
};

// Create the slice
export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    // Request actions
    fetchLeaderboardRequest: state => {
      state.loading = true;
      state.error = null;
    },
    // Success actions
    fetchLeaderboardSuccess: (state, action: PayloadAction<LeaderboardResponse>) => {
      state.loading = false;
      state.data = action.payload.data;
      state.avatars = action.payload.avatars;
      state.pagination = action.payload.pagination;
    },
    // Failure actions
    fetchLeaderboardFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setLeaderboard: (state, action: PayloadAction<LeaderboardUserProfile[]>) => {
      state.data = action.payload;
    },
    clearLeaderboard: () => {
      return initialState;
    },
  },
});

export const fetchFilteredLeaderboardRequest = (params?: LeaderboardRequest) => ({
  type: 'leaderboard/fetchFilteredLeaderboardRequest',
  payload: params,
});

// Export actions
export const {
  fetchLeaderboardRequest,
  fetchLeaderboardSuccess,
  fetchLeaderboardFailure,
  setLeaderboard,
  clearLeaderboard,
} = leaderboardSlice.actions;

// Export reducer
export default leaderboardSlice.reducer;
