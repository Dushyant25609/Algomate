import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PendingRequests, UserFriends } from '@/interface/friend';

interface FriendState {
  requests: PendingRequests;
  friends: UserFriends;
  error: string | null;
}

const initialState: FriendState = {
  requests: {
    requests: [],
    avatars: [],
  },
  friends: {
    friends: [],
    avatars: [],
  },
  error: null,
};

export const FriendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    fetchUserPendingRequest: state => {
      state.error = null;
    },
    fetchUserPendingSuccess: (state, action: PayloadAction<PendingRequests>) => {
      state.requests = action.payload;
    },
    fetchUserPendingsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    fetchUserFriendRequest: state => {
      state.error = null;
    },
    fetchUserFriendSuccess: (state, action: PayloadAction<UserFriends>) => {
      state.friends = action.payload;
    },
    fetchUserFriendFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearFriend: () => {
      return initialState;
    },
  },
});

export const {
  fetchUserPendingRequest,
  fetchUserPendingSuccess,
  fetchUserPendingsFailure,
  fetchUserFriendFailure,
  fetchUserFriendRequest,
  fetchUserFriendSuccess,
  clearFriend,
} = FriendSlice.actions;

export default FriendSlice.reducer;
