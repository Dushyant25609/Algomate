import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
}

const initialState: LoadingState = {
  isLoading: false,
  loadingMessage: undefined,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (!action.payload) {
        state.loadingMessage = undefined;
      }
    },
    setLoadingMessage: (state, action: PayloadAction<string | undefined>) => {
      state.loadingMessage = action.payload;
    },
  },
});

export const { setLoading, setLoadingMessage } = loadingSlice.actions;
export default loadingSlice.reducer;
