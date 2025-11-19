export interface Product {
  productId: number;
  productName: string;
  description?: string;
  imagePath?: string;
  unitPrice?: number;
  categoryId?: number;
  category?: Category;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  description?: string;
  products?: Product[];
}

export interface CartItem {
  itemId: string;
  cartId: string;
  quantity: number;
  dateCreated: string;
  productId: number;
  product?: Product;
}

export interface Order {
  orderId: number;
  orderDate: string;
  username: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  email: string;
  total: number;
  paymentTransactionId?: string;
  hasBeenShipped: boolean;
  orderDetails?: OrderDetail[];
}

export interface OrderDetail {
  orderDetailId: number;
  orderId: number;
  username?: string;
  productId: number;
  quantity: number;
  unitPrice?: number;
  product?: Product;
}

export interface User {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
