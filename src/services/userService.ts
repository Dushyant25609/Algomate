import { PublicProfile, updateProfile } from '@/interface/profile';
import { SearchResponse, User, UserUpdate } from '../interface/user';
import api from './api';
import { PendingRequests, UserFriends } from '@/interface/friend';

// Define interface for user service errors
export interface UserServiceError {
  status: number;
  message: string;
  error?: string;
}

const userService = {
  // Get private user data
  getUserData: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/pvt/user');
      return response.data;
    } catch (error) {
      // The API interceptor will format this error with status and message
      throw error as UserServiceError;
    }
  },
  getUserProfile: async (): Promise<User> => {
    try {
      const response = await api.get<User>('/pvt/profile');
      return response.data;
    } catch (error) {
      // The API interceptor will format this error with status and message
      throw error as UserServiceError;
    }
  },
  getPublicUserProfile: async (username: string): Promise<PublicProfile | UserServiceError> => {
    try {
      const response = await api.get<PublicProfile>('/profile/' + username);
      return response.data;
    } catch (error) {
      // The API interceptor will format this error with status and message
      return error as UserServiceError;
    }
  },
  // Search for users by username
  searchUsers: async (query: string): Promise<SearchResponse> => {
    try {
      const response = await api.get<SearchResponse>(
        `/pvt/user/search?search=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      throw error as UserServiceError;
    }
  },
  // /update
  updateUser: async (user: UserUpdate): Promise<void> => {
    try {
      await api.put('/pvt/user/update', { ...user });
    } catch (error) {
      throw error as UserServiceError;
    }
  },
  // Send a friend request to a user
  sendFriendRequest: async (username: string): Promise<void> => {
    try {
      await api.post('/pvt/friend/add', { username });
    } catch (error) {
      throw error as UserServiceError;
    }
  },
  // Accept a friend request
  acceptFriendRequest: async (username: string): Promise<void> => {
    try {
      await api.post('/pvt/friend/handle-request', { username, action: 'accept' });
    } catch (error) {
      throw error as UserServiceError;
    }
  },
  // Reject a friend request
  rejectFriendRequest: async (username: string): Promise<void> => {
    try {
      await api.post('/pvt/friend/handle-request', { username, action: 'reject' });
    } catch (error) {
      throw error as UserServiceError;
    }
  },
  // Remove a friend
  removeFriend: async (username: string): Promise<void> => {
    try {
      await api.post(`/pvt/friend/remove`, { username });
    } catch (error) {
      throw error as UserServiceError;
    }
  },
  // Unsend a friend request
  unsendFriendRequest: async (username: string): Promise<void> => {
    try {
      await api.post(`/pvt/friend/unsend-request/`, { username });
    } catch (error) {
      throw error as UserServiceError;
    }
  },
  getPendingFriendRequests: async (): Promise<PendingRequests> => {
    try {
      const response = await api.get<PendingRequests>('/pvt/friend/pending');
      return response.data;
    } catch (error) {
      throw error as UserServiceError;
    }
  },
  getUserFriendRequests: async (): Promise<UserFriends> => {
    try {
      const response = await api.get<UserFriends>('/pvt/friend/all');
      return response.data;
    } catch (error) {
      throw error as UserServiceError;
    }
  },
  updateProfile: async (): Promise<updateProfile> => {
    try {
      const response = await api.post<updateProfile>('/pvt/profile/update');
      return response.data;
    } catch (error) {
      throw error as UserServiceError;
    }
  },
};

export default userService;
