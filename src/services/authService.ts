import { AxiosError } from 'axios';
import api from './api';

// Define interfaces for authentication responses

export interface AuthError {
  message: string;
  status: number;
}

// Auth service functions
const authService = {
  // GitHub OAuth authentication
  githubAuth: async (): Promise<void> => {
    try {
      window.location.href = `${api.defaults.baseURL}/auth/github`;
      return;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || 'GitHub authentication failed',
        status: axiosError.response?.status || 500,
      } as AuthError;
    }
  },

  // Google OAuth authentication
  googleAuth: async (): Promise<void> => {
    try {
      window.location.href = `${api.defaults.baseURL}/auth/google`;
      return;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || 'Google authentication failed',
        status: axiosError.response?.status || 500,
      } as AuthError;
    }
  },

  // Logout function
  logout: async () => {
    await api.get('/auth/logout');
    // The server will handle clearing the auth cookie
  },
};

export default authService;
