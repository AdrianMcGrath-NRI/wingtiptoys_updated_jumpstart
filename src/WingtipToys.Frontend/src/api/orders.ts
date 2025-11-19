import { apiClient } from './client';
import type { Order } from '../types';

export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  getById: async (id: number): Promise<Order> => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  create: async (order: Partial<Order>): Promise<Order> => {
    const response = await apiClient.post('/orders', order);
    return response.data;
  },
};
