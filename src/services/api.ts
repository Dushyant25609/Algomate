import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Define interface for API error responses
export interface ApiErrorResponse {
  status: number;
  message: string;
  error?: string;
}

// Base API configuration
const API_BASE_URL = 'https://algomate-2vxa.onrender.com/api/v1';

// Create axios instance with default config
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds timeout
  withCredentials: true, // Enable sending cookies with cross-origin requests
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // No need to manually set Authorization header
    // Cookies will be automatically sent with requests
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest?.headers['X-Retry-Auth']) {
      // Mark this request as retried to prevent infinite loops
      if (originalRequest) {
        originalRequest.headers['X-Retry-Auth'] = 'true';
        try {
          // Attempt to refresh authentication by hitting the /auth/refresh endpoint
          await api.post('/auth/refresh');

          // Retry the original request
          return api(originalRequest);
        } catch (refreshError) {
          // If refresh fails, redirect to auth page
          return Promise.reject({
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Authentication refresh failed',
            error: refreshError,
          } as ApiErrorResponse);
        }
      }
    }

    // For other errors, format and reject with structured error object
    return Promise.reject({
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'An error occurred',
      error: error.message || 'Unknown error',
    } as ApiErrorResponse);
  }
);

export default api;
