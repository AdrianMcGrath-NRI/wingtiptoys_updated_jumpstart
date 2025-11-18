import { apiClient } from './client';
import type { LoginRequest, RegisterRequest, User } from '../types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<User> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<User> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },
};
