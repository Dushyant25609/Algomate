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
    try {
      await api.get('/auth/logout');
      // The server will handle clearing the auth cookie
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Don't throw the error so the app can continue with local logout
      // This prevents the UI from freezing if the server is unreachable
    }
  },
};

export default authService;
