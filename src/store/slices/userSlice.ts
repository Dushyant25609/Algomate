import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResponse, User, UserUpdate } from '../../interface/user';

// Define the interface for the user state
interface UserState extends Partial<User> {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  searchResults: SearchResponse;
  searchError: string | null;
}

// Define the initial state
const initialState: UserState = {
  isAuthenticated: false,
  name: '',
  username: '',
  email: '',
  platforms: {
    leetcode: '',
    codeforces: '',
    codechef: '',
    gfg: '',
    codeStudio: '',
  },
  social: {
    email: '',
    linkedIn: null,
    gitHub: null,
    x: null,
    portfolio: '',
  },
  friends: {
    pending: [],
    accepted: [],
  },
  loading: false,
  error: null,
  searchResults: {
    user: [],
    avatar: [],
  },
  college: '',
  country: '',
  branch: '',
  degree: '',
  graduation: '',
  bio: '',
  searchError: null,
};

// Create the slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to request login (will be handled by saga)
    setLoading: state => {
      state.loading = true;
    },
    searchSuccess: (state, action: PayloadAction<SearchResponse>) => {
      state.searchResults = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginRequest: state => {
      state.loading = true;
      state.error = null;
    },
    // Action when login is successful
    loginSuccess: (state, action: PayloadAction<User>) => {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    },
    // Action when login fails
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    // Action to logout
    logout: () => {
      return {
        ...initialState,
      };
    },
    updateUserSuccess: state => {
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const SearchAction = (username?: string) => ({
  type: 'search_users',
  payload: username,
});

export const UnsendRequestAction = (username?: string) => ({
  type: 'unsend_request',
  payload: username,
});

export const UpdateUserAction = (userData?: UserUpdate) => ({
  type: 'update_user',
  payload: userData,
});

export const AcceptRequestAction = (username?: string) => ({
  type: 'accept_request',
  payload: username,
});

export const RemoveFriendAction = (username?: string) => ({
  type: 'remove_friend',
  payload: username,
});

export const SendRequestAction = (username?: string) => ({
  type: 'send_request',
  payload: username,
});
// Export actions
export const {
  setLoading,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  searchSuccess,
  searchFailure,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
