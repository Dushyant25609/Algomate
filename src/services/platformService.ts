import { VerificationResponse } from '@/interface/verify';
import api from './api';
import { Platform } from '@/interface/platform';

export interface PlatformServiceError {
  status: number;
  message: string;
  error?: string;
}

export const platformService = {
  generateVerificationCode: async (leetcodeUsername: string) => {
    try {
      const response = await api.post('/pvt/profile/verify/generate', { leetcodeUsername });
      return response.data as VerificationResponse;
    } catch (error) {
      // The API interceptor will format this error with status and message
      return error as PlatformServiceError;
    }
  },

  saveVerificationCode: async (leetcodeUsername: string) => {
    try {
      await api.post('/pvt/profile/verify/save', { leetcodeUsername: leetcodeUsername });
      return;
    } catch (error) {
      return error as PlatformServiceError;
    }
  },

  deleteUserPlatformData: async (platform: Platform) => {
    try {
      await api.post('/pvt/account/delete', { platform: platform });
      return;
    } catch (error) {
      return error as PlatformServiceError;
    }
  },
};
