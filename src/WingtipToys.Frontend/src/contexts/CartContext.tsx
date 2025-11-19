import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from '../types';
import { cartApi } from '../api/cart';

interface CartContextType {
  cartId: string;
  items: CartItem[];
  loading: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartId, setCartId] = useState<string>('');
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get or create cart ID
    let storedCartId = localStorage.getItem('cartId');
    if (!storedCartId) {
      storedCartId = `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cartId', storedCartId);
    }
    setCartId(storedCartId);
    loadCart(storedCartId);
  }, []);

  const loadCart = async (id: string) => {
    try {
      setLoading(true);
      const cartItems = await cartApi.getItems(id);
      setItems(cartItems);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshCart = async () => {
    if (cartId) {
      await loadCart(cartId);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      setLoading(true);
      await cartApi.addItem({
        cartId,
        productId,
        quantity,
      });
      await loadCart(cartId);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      const item = items.find((i) => i.itemId === itemId);
      if (item) {
        await cartApi.updateItem(itemId, { ...item, quantity });
        await loadCart(cartId);
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      setLoading(true);
      await cartApi.deleteItem(itemId);
      await loadCart(cartId);
    } catch (error) {
      console.error('Failed to remove item:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartApi.clearCart(cartId);
      setItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => {
      const price = item.product?.unitPrice || 0;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartId,
        items,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getCartTotal,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
