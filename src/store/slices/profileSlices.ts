import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile, PublicProfile, updateProfile } from '@/interface/profile';
import { AvatarConfig, AvatarConfig2 } from '@/interface/avatar';
import { User } from '@/interface/user';
import { toast } from 'sonner';

// Define the interface for the user state
interface ProfileState extends Partial<Profile> {
  loading: boolean;
  error: string | null;
  avatar?: AvatarConfig | AvatarConfig2;
  user?: User;
  public?: boolean;
}

// Define the initial state
const initialState: ProfileState = {
  loading: false,
  error: null,
  code: {
    leetcode: {
      profile: {
        username: '',
        profile: {
          ranking: 0,
          realName: '',
          aboutMe: '',
          countryName: '',
        },
      },
      contest: {
        userContestRanking: {
          attendedContestsCount: 0,
          rating: 0,
          globalRanking: 0,
          totalParticipants: 0,
          topPercentage: 0,
          badge: null,
        },
        userContestRankingHistory: [],
      },
      questions: [],
      badges: {
        badges: [],
      },
      heatmap: {
        activeYears: [],
        streak: 0,
        totalActiveDays: 0,
        submissionCalendar: '',
      },
    },
    questions: {
      easy: 0,
      medium: 0,
      hard: 0,
      cp: 0,
      total: 0,
      prevTotal: 0,
    },
  },
  github: {
    name: '',
    profileUrl: '',
    bio: '',
    followers: 0,
    following: 0,
    avatar_url: '',
    repos: [],
  },
};

// Create the slice
export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Action to request login (will be handled by saga)
    setLoading: state => {
      state.loading = true;
    },
    profileRequest: state => {
      state.loading = true;
      state.error = null;
    },
    // Action when login is successful
    profileSuccess: (state, action: PayloadAction<Profile>) => {
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null,
      };
    },
    publicProfileSuccess: (state, action: PayloadAction<PublicProfile>) => {
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null,
        public: true,
      };
    },
    // Action when login fails
    profileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileRequest: state => {
      state.loading = false;
      toast.info('Updating profile...');
    },
    updateProfileSuccess: (state, action: PayloadAction<updateProfile>) => {
      if (state.code && action.payload.leetcode) {
        state.code.leetcode = action.payload.leetcode;
      }
    },
  },
});

export const GetPublicProfile = (username?: string) => ({
  type: 'get_public_profile',
  payload: username,
});

// Export actions
export const {
  setLoading,
  profileRequest,
  profileSuccess,
  profileFailure,
  publicProfileSuccess,
  updateProfileRequest,
  updateProfileSuccess,
} = profileSlice.actions;

// Export reducer
export default profileSlice.reducer;
