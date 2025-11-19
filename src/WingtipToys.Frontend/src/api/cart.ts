import { apiClient } from './client';
import type { CartItem } from '../types';

export const cartApi = {
  getItems: async (cartId: string): Promise<CartItem[]> => {
    const response = await apiClient.get(`/cart/${cartId}`);
    return response.data;
  },

  addItem: async (item: Partial<CartItem>): Promise<CartItem> => {
    const response = await apiClient.post('/cart', item);
    return response.data;
  },

  updateItem: async (itemId: string, item: Partial<CartItem>): Promise<void> => {
    await apiClient.put(`/cart/${itemId}`, item);
  },

  deleteItem: async (itemId: string): Promise<void> => {
    await apiClient.delete(`/cart/${itemId}`);
  },

  clearCart: async (cartId: string): Promise<void> => {
    await apiClient.delete(`/cart/clear/${cartId}`);
  },
};
