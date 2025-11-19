import { apiClient } from './client';
import type { Product } from '../types';

export const productsApi = {
  getAll: async (categoryId?: number): Promise<Product[]> => {
    const params = categoryId ? { categoryId } : {};
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  create: async (product: Partial<Product>): Promise<Product> => {
    const response = await apiClient.post('/products', product);
    return response.data;
  },

  update: async (id: number, product: Partial<Product>): Promise<void> => {
    await apiClient.put(`/products/${id}`, product);
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
