import { Platform } from '@/interface/platform';
import { VerificationResponse } from '@/interface/verify';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlatformState {
  verification: {
    loading: boolean;
    error: string | null;
    verificationCode: string | null;
    message: string | null;
    instructions: string | null;
  };
}

const initialState: PlatformState = {
  verification: {
    loading: false,
    error: null,
    verificationCode: null,
    message: null,
    instructions: null,
  },
};

export const platformSlice = createSlice({
  name: 'platform',
  initialState,
  reducers: {
    generateVerificationRequest: state => {
      state.verification.loading = true;
      state.verification.error = null;
    },
    generateVerificationSuccess: (state, action: PayloadAction<VerificationResponse>) => {
      state.verification.loading = false;
      state.verification.verificationCode = action.payload.verificationCode;
      state.verification.message = action.payload.message;
      state.verification.instructions = action.payload.instructions;
    },
    generateVerificationFailure: (state, action: PayloadAction<string>) => {
      state.verification.loading = false;
      state.verification.message = action.payload;
    },
    saveVerificationRequest: state => {
      state.verification.loading = true;
      state.verification.error = null;
    },
    saveVerificationSuccess: state => {
      state.verification.loading = false;
      state.verification.verificationCode = null;
      state.verification.message = null;
      state.verification.instructions = null;
    },
    saveVerificationFailure: (state, action: PayloadAction<string>) => {
      state.verification.loading = false;
      state.verification.error = action.payload;
    },
    clearVerification: state => {
      state.verification = initialState.verification;
    },
  },
});

export const PlatformGenerateAction = (username?: string) => ({
  type: 'platform_generateVerificationRequest',
  payload: username,
});

export const PlatformVerifyAction = (username?: string) => ({
  type: 'platform_VerificationRequest',
  payload: username,
});

export const DeletePlatform = (platform?: Platform) => ({
  type: 'platform_delete',
  payload: platform,
});

export const {
  generateVerificationRequest,
  generateVerificationSuccess,
  generateVerificationFailure,
  saveVerificationRequest,
  saveVerificationSuccess,
  saveVerificationFailure,
  clearVerification,
} = platformSlice.actions;

export default platformSlice.reducer;
