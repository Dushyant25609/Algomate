import { AvatarConfig, AvatarConfig2 } from '@/interface/avatar';
import api from './api';

const AVATAR_ENDPOINT = 'pvt/avatar';

// Define interface for avatar service errors
export interface AvatarServiceError {
  status: number;
  message: string;
  error?: string;
}

export const avatarService = {
  createAvatar: async (avatarConfig: AvatarConfig | AvatarConfig2) => {
    try {
      const response = await api.post(AVATAR_ENDPOINT, avatarConfig);
      return response.data;
    } catch (error) {
      // The API interceptor will format this error with status and message
      return error;
    }
  },

  getAvatar: async () => {
    try {
      const response = await api.get(AVATAR_ENDPOINT);
      return response.data;
    } catch (error) {
      // The API interceptor will format this error with status and message
      return error;
    }
  },

  updateAvatar: async (avatarConfig: AvatarConfig | AvatarConfig2) => {
    try {
      const response = await api.put(AVATAR_ENDPOINT, avatarConfig);
      return response.data;
    } catch (error) {
      // The API interceptor will format this error with status and message
      return error;
    }
  },
};
