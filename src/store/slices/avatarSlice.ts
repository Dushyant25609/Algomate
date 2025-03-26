import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AvatarConfig, AvatarConfig2 } from '@/interface/avatar';

// Define the interface for the avatar state
interface AvatarState {
  avatarConfig: AvatarConfig2 | AvatarConfig | null;
  loading: boolean;
  error: string | null;
  create: boolean;
}

// Define the initial state
const initialState: AvatarState = {
  avatarConfig: null,
  loading: false,
  error: null,
  create: false,
};

// Create the slice
export const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  reducers: {
    // Action to set loading state
    setLoading: state => {
      state.loading = true;
      state.error = null;
    },

    // Action to create avatar
    createAvatarRequest: state => {
      state.loading = true;
      state.error = null;
      state.create = true;
    },
    createAvatarSuccess: (state, action: PayloadAction<AvatarConfig>) => {
      state.avatarConfig = action.payload;
      state.loading = false;
      state.error = null;
      state.create = false;
    },
    createAvatarFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Action to get avatar
    getAvatarRequest: state => {
      state.loading = true;
      state.error = null;
    },
    getAvatarSuccess: (state, action: PayloadAction<AvatarConfig>) => {
      state.avatarConfig = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAvatarFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Action to update avatar
    updateAvatarRequest: state => {
      state.loading = true;
      state.error = null;
    },
    updateAvatarSuccess: (state, action: PayloadAction<AvatarConfig>) => {
      state.avatarConfig = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateAvatarFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Action to clear avatar state
    clearAvatar: () => {
      return initialState;
    },
  },
});

// Export actions
export const {
  setLoading,
  createAvatarRequest,
  createAvatarSuccess,
  createAvatarFailure,
  getAvatarRequest,
  getAvatarSuccess,
  getAvatarFailure,
  updateAvatarRequest,
  updateAvatarSuccess,
  updateAvatarFailure,
  clearAvatar,
} = avatarSlice.actions;

export const AvatarAction = (avatar?: AvatarConfig) => ({
  type: 'avatar_loading',
  payload: avatar,
});

// Export reducer
export default avatarSlice.reducer;
