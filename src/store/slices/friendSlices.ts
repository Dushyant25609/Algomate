import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PendingRequests, UserFriends } from '@/interface/friend';

interface FriendState {
  sent: boolean;
  requests: PendingRequests;
  friends: UserFriends;
  error: string | null;
}

const initialState: FriendState = {
  sent: false,
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
      state.sent = true;
    },
    fetchUserPendingSuccess: (state, action: PayloadAction<PendingRequests>) => {
      if (action.payload.requests.length > 0) {
        state.requests = action.payload;
      } else {
        state.requests = { requests: [{ type: 'sent', username: 'null' }], avatars: [] };
      }
      state.sent = false;
    },
    fetchUserPendingsFailure: (state, action: PayloadAction<string>) => {
      state.sent = false;
      state.error = action.payload;
      state.requests = { requests: [{ type: 'sent', username: 'null' }], avatars: [] };
    },
    fetchUserFriendRequest: state => {
      state.sent = true;
      state.error = null;
    },
    fetchUserFriendSuccess: (state, action: PayloadAction<UserFriends>) => {
      state.sent = false;
      if (action.payload.friends.length > 0) {
        state.friends = action.payload;
      } else {
        state.friends = { friends: ['null'], avatars: [] };
      }
    },
    fetchUserFriendFailure: (state, action: PayloadAction<string>) => {
      state.sent = false;
      state.error = action.payload;
      state.friends = { friends: ['null'], avatars: [] };
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
